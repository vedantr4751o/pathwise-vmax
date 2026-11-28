import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ArrowRight, ArrowUpRight, Bookmark, Check, ChevronDown, Compass, FolderKanban, GitCompareArrows, Layers, Search, SlidersHorizontal, X} from 'lucide-react';
import {domains, roles} from './data';
import {analyze} from './engine';
import {AtlasArt, DomainIcon, EmptyState, Modal, Progress, domainColors} from './ui';

const pageSize = 12;
const fields = domains.map((domain, order) => ({
  ...domain,
  order,
  count: roles.filter(role => role.domain === domain.id).length,
}));
const fieldById = new Map(fields.map(field => [field.id, field]));
const roleById = new Map(roles.map(role => [role.id, role]));
const searchable = roles.map(role => ({
  role,
  text: `${role.name} ${fieldById.get(role.domain).name} ${role.skills.map(skill => skill.name).join(' ')} ${role.aliases}`.toLowerCase(),
}));

function CareerCard({role, saved, selected, compareFull, ratings, onChoose, onSave, onCompare}) {
  const field = fieldById.get(role.domain);
  const {readiness} = analyze(role, ratings);
  return (
    <article className={`career-card ${selected ? 'comparing' : ''}`} style={{'--field-color': domainColors[role.domain]}}>
      <div className="career-card-top">
        <span className="field-icon"><DomainIcon domain={role.domain}/></span>
        <span className="field-name">{field.name}</span>
        <button className={`icon-button bookmark ${saved ? 'saved' : ''}`} aria-label={`${saved ? 'Unsave' : 'Save'} ${role.name}`} aria-pressed={saved} onClick={() => onSave(role.id)}>
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'}/>
        </button>
      </div>
      <h3><button onClick={() => onChoose(role.id)}>{role.name}</button></h3>
      <p className="career-description">{role.skills[3].name}. {role.skills[8].name}.</p>
      <div className="skill-tags">{role.skills.slice(0, 2).map(skill => <span key={skill.id}>{skill.name}</span>)}</div>
      <div className="career-meta">
        <span><Layers size={14}/>{role.skills.length} skills</span>
        <span><FolderKanban size={14}/>{role.projects.length} projects</span>
        {readiness > 0 && <span className="progress-label">{readiness}% proficiency</span>}
      </div>
      <div className="career-card-bottom">
        <button className="card-cta" onClick={() => onChoose(role.id)}>Explore path <ArrowUpRight size={16}/></button>
        <button disabled={!selected && compareFull} className={`compare-toggle ${selected ? 'selected' : ''}`} aria-pressed={selected} aria-label={`Compare ${role.name}`} onClick={() => onCompare(role.id)}>
          {selected ? <Check size={14}/> : <GitCompareArrows size={14}/>} Compare
        </button>
      </div>
    </article>
  );
}

export default function Explorer({state, onChoose, onSave, savedOnly = false, onGoExplore}) {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState('all');
  const [sort, setSort] = useState('default');
  const [limit, setLimit] = useState(pageSize);
  const [compare, setCompare] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const searchRef = useRef(null);
  const currentRole = roleById.get(state.roleId);
  const currentRatings = state.assessments[state.roleId];
  const assessedCount = Object.keys(currentRatings ?? {}).length;
  const selectedRoles = compare.map(id => roleById.get(id));
  const validHours = Number.isInteger(+state.hours) && +state.hours >= 1 && +state.hours <= 80;
  const term = query.trim();

  useEffect(() => {
    function focusSearch(event) {
      const isEditing = event.target instanceof HTMLElement && (event.target.closest('input, textarea, select') || event.target.isContentEditable);
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey || event.defaultPrevented || isEditing || document.querySelector('dialog[open]')) return;
      event.preventDefault();
      searchRef.current?.focus();
    }
    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  const filtered = useMemo(() => {
    const words = term.toLowerCase().split(/\s+/).filter(Boolean);
    const matches = searchable.filter(({role, text}) => (
      (!savedOnly || state.favorites.includes(role.id)) &&
      (domain === 'all' || role.domain === domain) &&
      words.every(word => text.includes(word))
    )).map(entry => entry.role);
    if (sort === 'name') return matches.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'progress') {
      return matches.map(role => ({role, score: analyze(role, state.assessments[role.id]).readiness}))
        .sort((a, b) => b.score - a.score).map(entry => entry.role);
    }
    return matches.sort((a, b) => fieldById.get(a.domain).order - fieldById.get(b.domain).order);
  }, [term, domain, sort, savedOnly, state.favorites, state.assessments]);

  function updateQuery(value) {
    setQuery(value);
    setLimit(pageSize);
  }

  function clearFilters() {
    updateQuery('');
    setDomain('all');
    searchRef.current?.focus();
  }

  function toggleCompare(id) {
    setCompare(previous => {
      if (previous.includes(id)) return previous.filter(item => item !== id);
      return previous.length < 3 ? [...previous, id] : previous;
    });
  }

  return (
    <>
      {savedOnly ? (
        <section className="saved-hero entrance">
          <h1>Your saved paths</h1>
          <p>Keep promising roles together and compare what each one takes.</p>
        </section>
      ) : (
        <section className="hero entrance">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot"/> CSE + IT CAREER ATLAS</div>
            <h1>Find your thing.<br/><em>Build your future.</em></h1>
            <p>Explore technology careers, find the skills you need, and build a learning plan at your own pace.</p>
            <div className="hero-actions">
              <a className="button primary" href="#career-library" onClick={() => searchRef.current?.focus({preventScroll: true})}>Explore careers <ArrowUpRight size={17}/></a>
              <button className="text-button" onClick={() => onChoose(state.roleId)}>Continue my path <ArrowRight size={16}/></button>
            </div>
            <div className="hero-proof">
              <span><strong>{roles.length}</strong> career paths</span><i/>
              <span><strong>{domains.length}</strong> fields</span><i/>
              <span><strong>{roles.reduce((sum, role) => sum + role.projects.length, 0)}</strong> projects</span>
            </div>
          </div>
          <AtlasArt/>
        </section>
      )}

      {!savedOnly && (assessedCount > 0 || state.completedProjects[state.roleId]?.length > 0) && (
        <section className="resume-card" aria-label="Current learning path">
          <span className="field-icon"><DomainIcon domain={currentRole.domain}/></span>
          <div className="resume-role"><small>YOUR CURRENT PATH</small><h2>{currentRole.name}</h2></div>
          <div className="resume-progress">
            <span>{assessedCount} of {currentRole.skills.length} skills assessed</span>
            <Progress value={Math.round(assessedCount / currentRole.skills.length * 100)} label="Skills assessed"/>
          </div>
          <button className="button secondary" onClick={() => onChoose(currentRole.id)}>Resume <ArrowRight size={16}/></button>
        </section>
      )}

      <section id="career-library" className="library" aria-label={savedOnly ? 'Saved path results' : 'Career library'}>
        {!savedOnly && <div className="section-heading library-heading"><h2>Career library</h2></div>}
        <div className="filter-panel">
          <div className="search-toolbar">
            <div className="search-box">
              <Search size={19}/>
              <label className="sr-only" htmlFor="role-search">Search careers, skills, or tools</label>
              <input ref={searchRef} id="role-search" value={query} onChange={event => updateQuery(event.target.value)} placeholder="Search roles, skills, or tools"/>
              {query ? <button aria-label="Clear search" className="icon-button" onClick={() => { updateQuery(''); searchRef.current?.focus(); }}><X size={17}/></button> : <kbd aria-hidden="true">/</kbd>}
            </div>
            <div className="sort-field">
              <SlidersHorizontal size={16}/><label className="sr-only" htmlFor="sort">Sort careers</label>
              <select id="sort" value={sort} onChange={event => { setSort(event.target.value); setLimit(pageSize); }}>
                <option value="default">By field</option><option value="name">A to Z</option><option value="progress">My proficiency</option>
              </select>
            </div>
          </div>
          <div className="field-filters" role="group" aria-label="Filter career fields">
            <button aria-pressed={domain === 'all'} className={domain === 'all' ? 'selected' : ''} onClick={() => { setDomain('all'); setLimit(pageSize); }}>All fields</button>
            {fields.map(field => (
              <button key={field.id} aria-pressed={domain === field.id} className={domain === field.id ? 'selected' : ''} onClick={() => { setDomain(field.id); setLimit(pageSize); }}>
                <DomainIcon domain={field.id} size={15}/>
                {field.name.replace(' Engineering', '').replace(' & Specialized', '')} {' '}
                <span>{savedOnly ? state.favorites.filter(id => roleById.get(id)?.domain === field.id).length : field.count}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="results-line">
          <span aria-live="polite">{filtered.length} {filtered.length === 1 ? 'path' : 'paths'}{term ? ` matching “${term}”` : domain !== 'all' ? ` in ${fieldById.get(domain).name}` : ''}</span>
          {filtered.length > 0 && (term || domain !== 'all') && <button className="text-button" onClick={clearFilters}>Clear filters <X size={14}/></button>}
        </div>
        {filtered.length === 0 ? (
          <EmptyState icon={savedOnly ? Bookmark : Search} title={savedOnly && !state.favorites.length ? 'No saved paths yet' : 'No paths found. Yet.'} action={
            <button className="button secondary" onClick={savedOnly && !state.favorites.length ? onGoExplore : clearFilters}>
              {savedOnly && !state.favorites.length ? 'Explore career paths' : 'Clear filters'} <ArrowRight size={16}/>
            </button>
          }>{savedOnly && !state.favorites.length ? 'Save a career with the bookmark button to find it here.' : 'Try a broader skill, a different title, or another field.'}</EmptyState>
        ) : (
          <div className="career-grid">
            {filtered.slice(0, limit).map(role => <CareerCard key={role.id} role={role} saved={state.favorites.includes(role.id)} selected={compare.includes(role.id)} compareFull={compare.length === 3} ratings={state.assessments[role.id]} onChoose={onChoose} onSave={onSave} onCompare={toggleCompare}/>)}
          </div>
        )}
        {filtered.length > limit && <div className="load-more"><button className="button secondary" onClick={() => setLimit(count => count + pageSize)}>Explore more paths <ChevronDown size={16}/></button><small>Showing {limit} of {filtered.length}</small></div>}
      </section>

      {compare.length > 0 && (
        <aside className="compare-tray" aria-label="Selected career paths">
          <div className="compare-selection">
            <span aria-live="polite"><GitCompareArrows size={16}/> {compare.length} of 3 selected</span>
            <div className="compare-chips">{selectedRoles.map(role => (
              <button key={role.id} onClick={() => toggleCompare(role.id)} aria-label={`Remove ${role.name} from comparison`} title={role.name}><span>{role.name}</span><X size={14}/></button>
            ))}</div>
          </div>
          <div className="compare-actions">
            <button className="button primary" disabled={compare.length < 2} onClick={() => setShowCompare(true)}>Compare paths <ArrowRight size={16}/></button>
            <button className="icon-button" aria-label="Clear comparison" onClick={() => setCompare([])}><X size={18}/></button>
          </div>
        </aside>
      )}

      {showCompare && (
        <Modal title="Different paths. Your choice." wide onClose={() => setShowCompare(false)}>
          <p className="modal-description">Compare the skills, estimated effort, and capstone project for each role.</p>
          <div className="comparison-grid" style={{'--columns': compare.length}}>
            {selectedRoles.map(role => {
              const analysis = analyze(role, state.assessments[role.id], state.completedProjects[role.id]);
              return <article key={role.id}>
                <span className="field-icon" style={{'--field-color': domainColors[role.domain]}}><DomainIcon domain={role.domain}/></span>
                <h3>{role.name}</h3>
                <dl>
                  <dt>Self-rated proficiency</dt><dd>{analysis.readiness}%</dd>
                  <dt>Remaining estimated effort</dt><dd>{analysis.totalHours} hours</dd>
                  <dt>{validHours ? `At ${state.hours} hours per week` : 'Weekly pace'}</dt><dd>{validHours ? `${Math.ceil(analysis.totalHours / +state.hours)} weeks` : 'Set 1–80 whole hours in My path'}</dd>
                </dl>
                <h4>Core skills</h4><ul>{role.skills.slice(3, 6).map(skill => <li key={skill.id}>{skill.name}</li>)}</ul>
                <h4>Capstone project</h4><p>{role.projects[3].name}</p>
                <button className="button primary" onClick={() => { setShowCompare(false); onChoose(role.id); }}>Choose this path <ArrowRight size={16}/></button>
              </article>;
            })}
          </div>
        </Modal>
      )}
    </>
  );
}
