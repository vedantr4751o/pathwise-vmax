// Pure planning functions. Project completion never silently changes ratings.
export function orderedSkills(role) {
  if (!role || !Array.isArray(role.skills)) throw new Error('A role must contain a skill list.');
  const nodes = new Map();
  for (const skill of role.skills) {
    if (!skill || typeof skill.id !== 'string' || !skill.id || !Array.isArray(skill.prerequisites)) throw new Error('Every skill needs an ID and a prerequisite list.');
    if (nodes.has(skill.id)) throw new Error(`Duplicate skill: ${skill.id}`);
    nodes.set(skill.id, skill);
  }
  const active = new Set(), done = new Set(), result = [];
  function visit(id) {
    if (done.has(id)) return;
    if (active.has(id)) throw new Error(`Cyclic prerequisite: ${id}`);
    const skill = nodes.get(id);
    if (!skill) throw new Error(`Unknown prerequisite: ${id}`);
    active.add(id); skill.prerequisites.forEach(visit); active.delete(id); done.add(id); result.push(skill);
  }
  role.skills.forEach(skill => visit(skill.id));
  return result;
}
export function analyze(role, ratings = {}, completedProjects = []) {
  const ordered = orderedSkills(role);
  const values = ratings && typeof ratings === 'object' ? ratings : {};
  const rating = skill => [0, 1, 2, 3].includes(values[skill.id]) ? values[skill.id] : 0;
  const skillIds = new Set(ordered.map(skill => skill.id));
  for (const skill of ordered) if (!Number.isSafeInteger(skill.hours) || skill.hours < 1) throw new Error(`Invalid skill hours: ${skill.id}`);
  if (!Array.isArray(role.projects)) throw new Error('A role must contain a project list.');
  const projectIds = new Set();
  for (const project of role.projects) {
    if (!project || typeof project.id !== 'string' || !project.id || projectIds.has(project.id) || skillIds.has(project.id)) throw new Error('Project IDs must be unique.');
    if (!Number.isSafeInteger(project.hours) || project.hours < 1) throw new Error(`Invalid project hours: ${project.id}`);
    if (!Array.isArray(project.prerequisites) || !project.prerequisites.every(id => skillIds.has(id))) throw new Error(`Unknown project prerequisite: ${project.id}`);
    projectIds.add(project.id);
  }
  const completed = new Set((Array.isArray(completedProjects) ? completedProjects : []).filter(id => projectIds.has(id)));
  const roadmap = ordered.filter(skill => rating(skill) < 3).map(skill => ({...skill, rating: rating(skill), remainingHours: Math.ceil(skill.hours * [1, .7, .4, 0][rating(skill)])}));
  const tasks = [], ready = new Set(ordered.filter(skill => rating(skill) === 3).map(skill => skill.id));
  const pending = role.projects.filter(project => !completed.has(project.id));
  const releaseProjects = () => {
    while (pending.length && pending[0].prerequisites.every(id => ready.has(id))) {
      const project = pending.shift(); tasks.push({...project, type: 'project', remainingHours: project.hours});
    }
  };
  releaseProjects();
  for (const skill of roadmap) { tasks.push({...skill, type: 'skill'}); ready.add(skill.id); releaseProjects(); }
  if (pending.length) throw new Error('Unresolved project prerequisites');
  const learningHours = roadmap.reduce((sum, skill) => sum + skill.remainingHours, 0);
  const totalProjectHours = role.projects.reduce((sum, project) => sum + project.hours, 0);
  const projectHours = role.projects.filter(project => !completed.has(project.id)).reduce((sum, project) => sum + project.hours, 0);
  return {roadmap, tasks, learningHours, projectHours, totalProjectHours, completedProjects: completed.size, totalHours: learningHours + projectHours,
    readiness: ordered.length ? Math.round(ordered.reduce((sum, skill) => sum + rating(skill), 0) / (ordered.length * 3) * 100) : 0,
    proficient: ordered.filter(skill => rating(skill) === 3).length};
}
export function schedule(tasks, hoursPerWeek, targetWeeks) {
  if (!Number.isInteger(hoursPerWeek) || hoursPerWeek < 1 || hoursPerWeek > 80 || !Number.isInteger(targetWeeks) || targetWeeks < 1 || targetWeeks > 104) throw new Error('Use whole numbers: 1–80 hours and 1–104 weeks.');
  if (!Array.isArray(tasks)) throw new Error('Tasks must be a list.');
  const ids = new Set(); let total = 0;
  for (const task of tasks) {
    if (!task || typeof task.id !== 'string' || !task.id || ids.has(task.id)) throw new Error('Task IDs must be unique.');
    if (!Number.isSafeInteger(task.remainingHours) || task.remainingHours < 0) throw new Error(`Invalid task hours: ${task.id}`);
    ids.add(task.id); total += task.remainingHours;
    if (!Number.isSafeInteger(total) || total > 100000) throw new Error('The plan exceeds the supported scheduling limit.');
  }
  const requiredWeeks = Math.ceil(total / hoursPerWeek), weeks = [];
  for (const task of tasks) {
    let remaining = task.remainingHours;
    while (remaining > 0) {
      let week = weeks.at(-1);
      if (!week || week.hours === hoursPerWeek) { week = {number: weeks.length + 1, hours: 0, items: []}; weeks.push(week); }
      const hours = Math.min(remaining, hoursPerWeek - week.hours);
      week.items.push({id: task.id, name: task.name, type: task.type, hours, continuation: remaining !== task.remainingHours});
      week.hours += hours; remaining -= hours;
    }
  }
  return {weeks, requiredWeeks, tooShort: requiredWeeks > targetWeeks, extraHours: Math.max(0, total - hoursPerWeek * targetWeeks), suggestedHours: Math.ceil(total / targetWeeks), bufferWeeks: Math.max(0, targetWeeks - requiredWeeks)};
}
