import {roles,domains} from '../src/data.js';
console.log(JSON.stringify({domains:domains.length,roles:roles.length,skills:roles.reduce((n,r)=>n+r.skills.length,0),projects:roles.reduce((n,r)=>n+r.projects.length,0),fields:domains.map(d=>({name:d.name,count:roles.filter(r=>r.domain===d.id).length}))},null,2));
