import test from 'node:test';
import assert from 'node:assert/strict';
import {roles,domains} from '../src/data.js';
import {analyze,orderedSkills,schedule} from '../src/engine.js';
import {sanitizeState,loadState,STORAGE_KEY} from '../src/storage.js';

test('Every catalog track contains complete projects and valid prerequisite graphs',()=>{
 assert.ok(roles.length>=110);assert.equal(new Set(roles.map(r=>r.id)).size,roles.length);
 assert.ok(domains.length>=15);
 assert.equal(new Set(domains.map(d=>d.id)).size,domains.length);
 for(const role of roles){
  assert.ok(domains.some(d=>d.id===role.domain),role.id);assert.equal(role.skills.length,9,role.id);assert.equal(role.projects.length,4,role.id);
  const ids=new Set();for(const s of orderedSkills(role)){assert.ok(s.name.trim().length>3);assert.ok(s.prerequisites.every(id=>ids.has(id)),role.id);ids.add(s.id);}
  for(const p of role.projects){assert.ok(p.name.trim().length>3);assert.equal(p.requirements.length,3,p.id);assert.ok(p.requirements.every(r=>r.trim().length>10),p.id);assert.ok(p.prerequisites.every(id=>ids.has(id)),p.id);}
 }
});
test('Every role preserves every hour and prerequisite at all pacing extremes',()=>{
 for(const role of roles)for(const level of [0,1,2,3]){
  const ratings=Object.fromEntries(role.skills.map((s,i)=>[s.id,(level+i)%4]));const a=analyze(role,ratings),ready=new Set(role.skills.filter(s=>ratings[s.id]===3).map(s=>s.id));
  for(const task of a.tasks){assert.ok(task.prerequisites.every(id=>ready.has(id)),task.id);ready.add(task.id);}
  for(const capacity of [1,7,10,80]){const p=schedule(a.tasks,capacity,12);assert.equal(p.weeks.reduce((n,w)=>n+w.hours,0),a.totalHours);assert.ok(p.weeks.every(w=>w.hours>0&&w.hours<=capacity));const flattened=p.weeks.flatMap(w=>w.items);for(const task of a.tasks)assert.equal(flattened.filter(i=>i.id===task.id).reduce((n,i)=>n+i.hours,0),task.remainingHours);assert.deepEqual([...new Set(flattened.map(i=>i.id))],a.tasks.map(t=>t.id));assert.equal(p.requiredWeeks,Math.ceil(a.totalHours/capacity));}
 }
});
test('Completed projects are excluded without changing self-assessed proficiency',()=>{
 for(const role of roles){const before=analyze(role),completed=[role.projects[0].id,role.projects[2].id],after=analyze(role,{},[...completed,completed[0],'unknown']);assert.equal(after.completedProjects,2);assert.equal(after.totalProjectHours,before.projectHours);assert.equal(after.projectHours,before.projectHours-role.projects[0].hours-role.projects[2].hours);assert.equal(after.learningHours,before.learningHours);assert.equal(after.readiness,0);assert.ok(after.tasks.every(t=>!completed.includes(t.id)));}
});
test('Proficient learners retain projects until complete, then receive an empty schedule',()=>{
 const r=roles[0],ratings=Object.fromEntries(r.skills.map(s=>[s.id,3])),a=analyze(r,ratings);assert.equal(a.roadmap.length,0);assert.equal(a.readiness,100);assert.equal(a.totalHours,88);assert.equal(a.tasks.length,4);
 const complete=analyze(r,ratings,r.projects.map(p=>p.id));assert.equal(complete.totalHours,0);const p=schedule(complete.tasks,10,12);assert.deepEqual(p.weeks,[]);assert.equal(p.requiredWeeks,0);assert.equal(p.bufferWeeks,12);
});
test('Unrated skills, reduced estimates, overflow and buffer are handled',()=>{
 const r=roles[0],a=analyze(r);assert.equal(a.readiness,0);assert.equal(a.roadmap.length,9);assert.equal(analyze(r,{[r.skills[0].id]:2}).roadmap[0].remainingHours,5);assert.equal(schedule(a.tasks,1,1).tooShort,true);assert.ok(schedule(a.tasks,80,104).bufferWeeks>0);assert.equal(analyze(r,{[r.skills[0].id]:'3'}).readiness,0);
});
test('Invalid pace, task hours and malformed dependency graphs fail explicitly',()=>{
 for(const [h,w] of [[0,12],[-2,4],[1.5,12],[10,0],[81,12],[10,105],[NaN,12]])assert.throws(()=>schedule([],h,w));
 for(const h of [Infinity,NaN,-1,.5,'10',100001])assert.throws(()=>schedule([{id:'a',remainingHours:h}],10,12));
 assert.throws(()=>schedule([{id:'a',remainingHours:1},{id:'a',remainingHours:2}],10,12));assert.throws(()=>orderedSkills({skills:[{id:'a',prerequisites:['b']}]}));assert.throws(()=>orderedSkills({skills:[{id:'a',prerequisites:['a']}]}));assert.throws(()=>orderedSkills({skills:[{id:'a',prerequisites:[]},{id:'a',prerequisites:[]}]}));assert.throws(()=>analyze({...roles[0],projects:[{id:'p',hours:8,prerequisites:['missing']}]}));
});
test('State sanitization preserves valid progress and drops corrupt or unknown values',()=>{
 const r=roles[0],s=r.skills[0],p=r.projects[0];const clean=sanitizeState({roleId:r.id,hours:'20',duration:16,assessments:{[r.id]:{[s.id]:2,[r.skills[1].id]:8,unknown:3},missing:{}},favorites:[r.id,r.id,'missing'],completedProjects:{[r.id]:[p.id,p.id,'missing']},notes:{[r.id]:'Keep building.'}});
 assert.equal(clean.roleId,r.id);assert.equal(clean.hours,'20');assert.equal(clean.duration,'16');assert.deepEqual(clean.assessments,{[r.id]:{[s.id]:2}});assert.deepEqual(clean.favorites,[r.id]);assert.deepEqual(clean.completedProjects,{[r.id]:[p.id]});assert.equal(clean.notes[r.id],'Keep building.');
 for(const v of [null,false,'text',[],12])assert.deepEqual(sanitizeState(v),sanitizeState({}));
 const corrupt=sanitizeState({roleId:'missing',hours:[],duration:Infinity,assessments:null,favorites:{},completedProjects:[],notes:{[r.id]:'x'.repeat(5000)}});assert.equal(corrupt.hours,'10');assert.equal(corrupt.duration,'12');assert.equal(corrupt.notes[r.id].length,4000);
 const polluted=sanitizeState(JSON.parse('{"assessments":{"__proto__":{"polluted":true}}}'));assert.equal({}.polluted,undefined);assert.deepEqual(polluted.assessments,{});
});
test('Storage failure, malformed JSON and legacy state recover safely',()=>{
 assert.deepEqual(loadState({getItem(){throw new Error('Unavailable');}}),sanitizeState(null));assert.deepEqual(loadState({getItem(){return '{';}}),sanitizeState(null));
 const legacy={roleId:'frontend',assessments:{frontend:{'frontend-0':1}},hours:15,duration:20};const result=loadState({getItem(key){assert.equal(key,STORAGE_KEY);return JSON.stringify(legacy);}});assert.equal(result.assessments.frontend['frontend-0'],1);assert.equal(result.hours,'15');assert.deepEqual(result.favorites,[]);assert.deepEqual(result.completedProjects,{});
});
