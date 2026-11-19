import {roles} from './data.js';

export const STORAGE_KEY = 'pathwise-assessments-v1';
const isRecord = value => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const has = (record, key) => Object.prototype.hasOwnProperty.call(record, key);

// Only known catalog keys are copied from backups and local storage.
export function sanitizeState(raw) {
  const input = isRecord(raw) ? raw : {};
  const knownRoles = new Set(roles.map(role => role.id));
  const assessments = {}, completedProjects = {}, notes = {};
  for (const role of roles) {
    const source = isRecord(input.assessments) && has(input.assessments, role.id) && isRecord(input.assessments[role.id]) ? input.assessments[role.id] : {};
    const ratings = {};
    for (const skill of role.skills) {
      if (has(source, skill.id) && [0, 1, 2, 3].includes(source[skill.id])) ratings[skill.id] = source[skill.id];
    }
    if (Object.keys(ratings).length) assessments[role.id] = ratings;
    const sourceProjects = isRecord(input.completedProjects) && has(input.completedProjects, role.id) ? input.completedProjects[role.id] : [];
    const projectIds = new Set(role.projects.map(project => project.id));
    const selected = Array.isArray(sourceProjects) ? [...new Set(sourceProjects.filter(id => projectIds.has(id)))] : [];
    if (selected.length) completedProjects[role.id] = selected;
    const note = isRecord(input.notes) && has(input.notes, role.id) ? input.notes[role.id] : '';
    if (typeof note === 'string' && note) notes[role.id] = note.slice(0, 4000);
  }
  const wholeNumber = (value, maximum, fallback) => {
    if (typeof value !== 'number' && typeof value !== 'string') return fallback;
    const number = Number(value);
    return Number.isInteger(number) && number >= 1 && number <= maximum ? String(number) : fallback;
  };
  return {
    roleId: knownRoles.has(input.roleId) ? input.roleId : (knownRoles.has('frontend') ? 'frontend' : roles[0]?.id || ''),
    assessments,
    hours: wholeNumber(input.hours, 80, '10'),
    duration: wholeNumber(input.duration, 104, '12'),
    favorites: Array.isArray(input.favorites) ? [...new Set(input.favorites.filter(id => knownRoles.has(id)))] : [],
    completedProjects,
    notes,
  };
}

export function loadState(storage) {
  try {
    const store = storage === undefined ? globalThis.localStorage : storage;
    return sanitizeState(JSON.parse(store?.getItem(STORAGE_KEY) || 'null'));
  } catch {
    return sanitizeState(null);
  }
}
