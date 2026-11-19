import React from 'react';
import {describe, it, expect, vi} from 'vitest';
import {render, screen, within, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {STORAGE_KEY} from '../src/storage';
import {roles} from '../src/data';

// Import the real App without mounting its browser entry point into a missing
// #root. Testing Library still uses the real React root for every test.
vi.mock('react-dom/client', async importOriginal => {
  const actual = await importOriginal();
  return {...actual, createRoot: (container, options) => container === null ? {render() {}} : actual.createRoot(container, options)};
});
import {App} from '../src/main';

const front = roles.find(r => r.id === 'frontend');
const back = roles.find(r => r.id === 'backend');
const getSearch = () => screen.getByRole('textbox', {name:'Search careers, skills, or tools'});
const getMetric = label => screen.getByText(label, {exact:true}).parentElement.querySelector('strong').textContent;
async function openPath(user) { await user.click(screen.getByRole('button', {name:'My path', exact:true})); }
async function chooseRole(user, name) {
  await user.click(screen.getByRole('button', {name:'Explore', exact:true}));
  fireEvent.change(getSearch(),{target:{value:name}});
  await user.click(screen.getByRole('button', {name, exact:true}));
}
function backupFile(raw) {
  const file = new File([JSON.stringify(raw)], 'backup.json', {type:'application/json'});
  Object.defineProperty(file, 'text', {value:async () => JSON.stringify(raw)});
  return file;
}

describe('career atlas user flows', () => {
  it('searches actual skills and roles, filters fields, and recovers from no results', async () => {
    const user=userEvent.setup({delay:null}); render(<App/>);
    fireEvent.change(getSearch(),{target:{value:'blockchain'}});
    expect(screen.getByRole('button',{name:'Blockchain / Smart Contract Developer',exact:true})).toBeTruthy();
    expect(screen.queryByRole('button',{name:'Frontend Engineer',exact:true})).toBeNull();
    fireEvent.change(getSearch(),{target:{value:'TypeScript'}});
    expect(screen.getByRole('button',{name:'Frontend Engineer',exact:true})).toBeTruthy();
    fireEvent.change(getSearch(),{target:{value:''}});
    await user.click(screen.getByRole('button',{name:/^Cybersecurity \d+$/}));
    expect(screen.getByRole('button',{name:/^Cybersecurity \d+$/}).getAttribute('aria-pressed')).toBe('true');
    expect(screen.queryByRole('button',{name:'Frontend Engineer',exact:true})).toBeNull();
    fireEvent.change(getSearch(),{target:{value:'nonexistent-specialization-xyz'}});
    expect(screen.getByRole('heading',{name:'No paths found. Yet.'})).toBeTruthy();
    await user.click(screen.getByRole('button',{name:'Clear filters',exact:true}));
    expect(screen.getByRole('button',{name:'Frontend Engineer',exact:true})).toBeTruthy();
  });

  it('saves a path, compares two real roles, and chooses from a named dialog', async () => {
    const user=userEvent.setup({delay:null}); render(<App/>);
    fireEvent.change(getSearch(),{target:{value:front.name}});
    await user.click(screen.getByRole('button',{name:`Save ${front.name}`,exact:true}));
    await user.click(screen.getByRole('button',{name:`Compare ${front.name}`,exact:true}));
    fireEvent.change(getSearch(),{target:{value:back.name}});
    await user.click(screen.getByRole('button',{name:`Compare ${back.name}`,exact:true}));
    await user.click(screen.getByRole('button',{name:'Compare paths',exact:true}));
    const dialog=screen.getByRole('dialog',{name:'Different paths. Your choice.'});
    expect(within(dialog).getByRole('heading',{name:front.name,exact:true})).toBeTruthy();
    expect(within(dialog).getByRole('heading',{name:back.name,exact:true})).toBeTruthy();
    await user.click(within(dialog).getAllByRole('button',{name:'Choose this path',exact:true})[0]);
    expect(screen.getByRole('heading',{level:1,name:front.name})).toBeTruthy();
    await user.click(screen.getByRole('button',{name:/^Saved\s*1$/}));
    expect(screen.getByRole('button',{name:front.name,exact:true})).toBeTruthy();
    expect(screen.queryByRole('button',{name:back.name,exact:true})).toBeNull();
  });

  it('updates skill proficiency, orders the remaining roadmap, and supports undo', async () => {
    const user=userEvent.setup({delay:null});render(<App/>);await openPath(user);
    await user.click(screen.getByRole('button',{name:`${front.skills[0].name}: 3 Proficient`,exact:true}));
    expect(getMetric('Self-rated proficiency')).toBe('11%');
    expect(getMetric('Skills to strengthen')).toBe('8 / 9');
    await user.click(screen.getByRole('tab',{name:/^Roadmap/}));
    expect(screen.queryByRole('heading',{name:front.skills[0].name,exact:true})).toBeNull();
    expect(screen.getAllByRole('heading',{level:3})[0].textContent).toBe(front.skills[1].name);
    await user.click(screen.getAllByRole('button',{name:'I can do this independently',exact:true})[0]);
    expect(getMetric('Skills to strengthen')).toBe('7 / 9');
    await user.click(screen.getByRole('button',{name:'Undo',exact:true}));
    expect(getMetric('Skills to strengthen')).toBe('8 / 9');
  });

  it('removes finished project hours from the plan and can reopen the project', async () => {
    const user=userEvent.setup({delay:null});render(<App/>);await openPath(user);
    const before=Number.parseInt(getMetric('Learning + unfinished projects'),10);
    await user.click(screen.getByRole('tab',{name:/^Projects/}));
    const project=screen.getByRole('heading',{name:front.projects[0].name}).closest('article');
    await user.click(within(project).getByRole('button',{name:'Mark project complete'}));
    expect(getMetric('Learning + unfinished projects')).toBe(`${before-8} hrs`);
    expect(getMetric('Portfolio projects complete')).toBe('1 / 4');
    await user.click(within(project).getByRole('button',{name:'Completed · undo'}));
    expect(getMetric('Learning + unfinished projects')).toBe(`${before} hrs`);
    expect(getMetric('Portfolio projects complete')).toBe('0 / 4');
  });

  it('blocks invalid pacing and makes an achievable timetable without dropping work', async () => {
    const user=userEvent.setup({delay:null});render(<App/>);await openPath(user);
    await user.click(screen.getByRole('tab',{name:/^Weekly plan/}));
    const hours=screen.getByRole('spinbutton',{name:'Available hours / week'});
    fireEvent.change(hours,{target:{value:'0'}});
    expect(screen.getByRole('button',{name:'Export plan'}).disabled).toBe(true);
    expect(screen.getAllByRole('alert').some(x=>x.textContent.includes('1–80'))).toBe(true);
    fireEvent.change(hours,{target:{value:'10'}});
    expect(screen.getByText('Let’s give this a little more room.')).toBeTruthy();
    await user.click(screen.getByRole('button',{name:/^Use \d+ weeks$/}));
    expect(screen.queryByText('Let’s give this a little more room.')).toBeNull();
    expect(screen.getByText(/A pace you can keep/)).toBeTruthy();
    const downloadButton=screen.getByRole('button',{name:'Export plan'});
    expect(downloadButton.disabled).toBe(false);
  });

  it('keeps notes and ratings isolated by path and restores them after remount', async () => {
    const user=userEvent.setup({delay:null});const mounted=render(<App/>);await openPath(user);
    fireEvent.change(screen.getByRole('textbox',{name:`Personal notes for ${front.name}`}),{target:{value:'Build an accessible portfolio.'}});
    await user.click(screen.getByRole('button',{name:`${front.skills[0].name}: 2 Intermediate`,exact:true}));
    await chooseRole(user,back.name);
    expect(screen.getByRole('textbox',{name:`Personal notes for ${back.name}`}).value).toBe('');
    fireEvent.change(screen.getByRole('textbox',{name:`Personal notes for ${back.name}`}),{target:{value:'Practice transactions.'}});
    mounted.unmount();render(<App/>);await openPath(user);
    expect(screen.getByRole('textbox',{name:`Personal notes for ${back.name}`}).value).toBe('Practice transactions.');
    await chooseRole(user,front.name);
    expect(screen.getByRole('textbox',{name:`Personal notes for ${front.name}`}).value).toBe('Build an accessible portfolio.');
    expect(screen.getByRole('button',{name:`${front.skills[0].name}: 2 Intermediate`,exact:true}).getAttribute('aria-pressed')).toBe('true');
  });

  it('rejects invalid backups, previews valid restores, and can undo replacement', async () => {
    const user=userEvent.setup({delay:null});const {container}=render(<App/>);
    const input=container.querySelector('input[type=file]');
    fireEvent.change(input,{target:{files:[backupFile({unexpected:'not a backup'})]}});
    await screen.findByText('We couldn’t read that backup. Choose a valid Pathwise JSON file.');
    expect(screen.queryByRole('dialog')).toBeNull();
    const restored={roleId:'backend',assessments:{backend:{[back.skills[0].id]:3}},hours:'15',duration:'30',favorites:['backend'],notes:{backend:'Restored note'},completedProjects:{backend:[back.projects[0].id]}};
    fireEvent.change(input,{target:{files:[backupFile(restored)]}});
    const dialog=await screen.findByRole('dialog',{name:'Bring your learning space back.'});
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).roleId).toBe('frontend');
    await user.click(within(dialog).getByRole('button',{name:'Restore this backup'}));
    await waitFor(()=>expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).roleId).toBe('backend'));
    await user.click(screen.getByRole('button',{name:'Undo',exact:true}));
    await waitFor(()=>expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).roleId).toBe('frontend'));
  });
});
