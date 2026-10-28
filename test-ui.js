const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=__dirname+'/';let handlers={},elem={};function element(id){return elem[id]??=( {textContent:'',style:{},classList:{add(){},remove(){},toggle(){}},addEventListener(ev,cb){handlers[id+':'+ev]=cb},getAttribute(){},offsetWidth:0,scrollIntoView(){},focus(){},click(){},innerHTML:'',dataset:{}})};
const window={scrollTo(){},stopNetwork(){},startNetwork(){},matchMedia(){return {matches:true}},addEventListener(ev,cb){handlers['window:'+ev]=cb}};
const doc={querySelector(sel){return element(sel)},querySelectorAll(sel){return []},activeElement:{tagName:'BODY'},createElement(){return {click(){},set href(x){},set download(x){}}}};
const loc={hash:'#home'};const context={window,document:doc,location:loc,localStorage:{getItem(){return null},setItem(){}},Date,Math,JSON,Number,String,Array,RegExp,Set,Map,Blob:function(){},URL:{createObjectURL(){return 'blob:x'},revokeObjectURL(){}},setTimeout(){return 1},clearTimeout(){},confirm(){return true},console};vm.createContext(context);
for(const name of ['content.js','lab-data.js','diagrams.js','app.js'])vm.runInContext(fs.readFileSync(root+name,'utf8'),context,{filename:name});
assert(element('#app').innerHTML.includes('BREAK IT'));
for(const r of ['#worlds','#world/networking','#lesson/networking-1','#labs','#lab/soc','#lab/query','#lab/subnet','#review','#sources']){loc.hash=r;handlers['window:hashchange']();assert(element('#app').innerHTML.length>100,`Empty ${r}`);console.log('rendered',r,element('#app').innerHTML.length)}
console.log('UI route smoke test passed');
