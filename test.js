const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
const context={window:{}};vm.createContext(context);
for(const file of ['content.js','lab-data.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),context,{filename:file});
const {CURRICULUM:worlds,ALL_LESSONS:lessons,LABS:labs}=context.window;
assert.equal(worlds.length,9,'Expected nine worlds');assert.equal(labs.length,8,'Expected eight labs');
assert.ok(lessons.length>=65,'Expected 65 or more authored lessons');
assert.equal(new Set(lessons.map(l=>l.id)).size,lessons.length,'Duplicate lesson IDs');
assert.equal(new Set(labs.map(l=>l.id)).size,labs.length,'Duplicate lab IDs');
assert.equal(worlds.find(w=>w.id==='owasp').lessons.length,10,'OWASP 2025 risk list must be complete');
for(const lesson of lessons){
 assert.ok(lesson.title&&lesson.concept&&lesson.analogy&&lesson.example&&lesson.trap&&lesson.defense&&lesson.why,`Incomplete educational content: ${lesson.id}`);
 assert.equal(lesson.flow.length,4,`Diagram missing flow steps: ${lesson.id}`);
 assert.equal(lesson.options.length,3,`Quiz missing options: ${lesson.id}`);
 assert.ok(Number.isInteger(lesson.correct)&&lesson.correct>=0&&lesson.correct<3,`Quiz answer invalid: ${lesson.id}`);
}
for(const lab of labs)for(const r of lab.rounds){assert.equal(r.options.length,3);assert.ok(r.correct>=0&&r.correct<3);assert.ok(r.log&&r.why)}
for(const file of ['index.html','style.css','network.js','diagrams.js','app.js','favicon.svg','.nojekyll'])assert.ok(fs.existsSync(__dirname+'/'+file));
console.log(`PASS — ${worlds.length} worlds, ${lessons.length} lessons, ${lessons.length} diagrams and quizzes, ${labs.length} simulations.`);
