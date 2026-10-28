/* Animated perspective-projected 3D network. No WebGL, trackers or external runtime. */
(()=>{
let dispose=()=>{};
window.stopNetwork=()=>dispose();
window.startNetwork=(canvas,details)=>{
  dispose(); if(!canvas)return;
  const ctx=canvas.getContext('2d');if(!ctx)return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nodes=[
    {id:0,label:'EDGE',type:'PUBLIC GATEWAY',xyz:[0,0,0],size:19,tone:'#ff9c76',desc:'Untrusted traffic crosses this boundary.'},
    {id:1,label:'CLIENT',type:'WORKSTATION',xyz:[-155,-76,22],size:13,tone:'#a2d9c1',desc:'Identity and device posture begin here.'},
    {id:2,label:'API',type:'APPLICATION',xyz:[120,-92,120],size:15,tone:'#e6bc8b',desc:'Validate input and authorize each request.'},
    {id:3,label:'DATA',type:'DATABASE',xyz:[170,62,-70],size:13,tone:'#a9b7e2',desc:'Private data requires access control and backups.'},
    {id:4,label:'SOC',type:'DETECTION',xyz:[-85,112,106],size:13,tone:'#a8d2ae',desc:'Telemetry helps responders understand abnormal behavior.'},
    {id:5,label:'CLOUD',type:'WORKLOAD',xyz:[-145,52,-117],size:12,tone:'#c9b8df',desc:'IAM and segmentation protect shared infrastructure.'},
    {id:6,label:'VAULT',type:'BACKUP',xyz:[55,-148,-110],size:11,tone:'#a9c7cf',desc:'Recovery controls limit operational impact.'}
  ];
  const edges=[[0,1],[0,2],[2,3],[2,4],[0,5],[5,4],[3,6],[0,4],[5,3]];
  let w=1,h=1,dpr=1,rot=.18,pitch=-.22,t=0,last=0,raf=0,active=true,pointer=null,dragging=false,zoom=1,selected=0;
  let projected=[];
  const resize=()=>{let r=canvas.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)};
  const ro=new ResizeObserver(resize);ro.observe(canvas);resize();
  function project(v){
    const [x,y,z]=v;const co=Math.cos(rot),si=Math.sin(rot),cp=Math.cos(pitch),sp=Math.sin(pitch);
    const xx=x*co+z*si,zz=-x*si+z*co,yy=y*cp-zz*sp,d=y*sp+zz*cp;
    const perspective=500/(500-d);const scale=Math.min(w/490,h/430)*zoom;
    return {x:w*.5+xx*perspective*scale,y:h*.51+yy*perspective*scale,z:d,scale:perspective*scale};
  }
  function line(a,b,alpha=.28,width=1){ctx.strokeStyle=`rgba(153,198,194,${alpha})`;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
  function frame(time){if(!active)return;let dt=Math.min(65,time-last||16);last=time;if(!reduce){t+=dt*.001;if(!dragging)rot+=dt*.00013;}ctx.clearRect(0,0,w,h);
    const cx=w/2,cy=h/2;ctx.save();ctx.translate(cx,cy);ctx.scale(1,.31);for(let ring=0;ring<4;ring++){ctx.strokeStyle=`rgba(105,153,153,${.07+ring*.012})`;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,0,(72+ring*45)*Math.min(w/460,1), (72+ring*45)*Math.min(w/460,1), 0,0,Math.PI*2);ctx.stroke()}ctx.restore();
    projected=nodes.map(n=>({...project(n.xyz),n}));
    edges.forEach(([a,b],i)=>{const p=projected[a],q=projected[b];line(p,q,.22,1.15);if(i%3===0){ctx.setLineDash([3,8]);line(p,q,.28,1);ctx.setLineDash([])}
      const f=((t*.17+i*.18)%1);const px=p.x+(q.x-p.x)*f,py=p.y+(q.y-p.y)*f;ctx.beginPath();ctx.fillStyle=i%2?'#ffb187':'#b2ddcb';ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=10;ctx.arc(px,py,2.4,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
    });
    projected.slice().sort((a,b)=>a.z-b.z).forEach(p=>{
      const r=p.n.size*p.scale*.88;const sel=p.n.id===selected;
      ctx.strokeStyle=sel?'rgba(255,156,118,.38)':'rgba(161,195,191,.16)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(p.x,p.y,r+11+(sel?Math.sin(t*2)*3:0),0,Math.PI*2);ctx.stroke();
      const grad=ctx.createRadialGradient(p.x-r*.4,p.y-r*.4,1,p.x,p.y,r);grad.addColorStop(0,'#f3f5e9');grad.addColorStop(.15,p.n.tone);grad.addColorStop(1,'#1e3439');ctx.beginPath();ctx.fillStyle=grad;ctx.shadowColor=p.n.tone;ctx.shadowBlur=sel?25:11;ctx.arc(p.x,p.y,Math.max(4,r),0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
      const font=Math.max(9,Math.min(12,p.scale*11));ctx.font=`500 ${font}px monospace`;ctx.textAlign='center';ctx.fillStyle=sel?'#fff2e2':'#aebdc0';ctx.fillText(p.n.label,p.x,p.y+r+22);
    });
    raf=requestAnimationFrame(frame);
  }
  const down=e=>{pointer={x:e.clientX,y:e.clientY,rot,pitch};dragging=true;canvas.setPointerCapture(e.pointerId)};
  const move=e=>{if(!pointer)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;rot=pointer.rot+dx*.007;pitch=Math.max(-1.1,Math.min(1.1,pointer.pitch+dy*.007))};
  const up=e=>{if(pointer&&Math.abs(e.clientX-pointer.x)<5&&Math.abs(e.clientY-pointer.y)<5){const rect=canvas.getBoundingClientRect();const mx=e.clientX-rect.left,my=e.clientY-rect.top;let hit=projected.slice().reverse().find(p=>Math.hypot(p.x-mx,p.y-my)<p.n.size*p.scale+16);if(hit){selected=hit.n.id;if(details)details.innerHTML=`<b>${hit.n.label} / ${hit.n.type}</b>${hit.n.desc}`}}
    pointer=null;dragging=false;
  };
  const wheel=e=>{e.preventDefault();zoom=Math.max(.65,Math.min(1.55,zoom-e.deltaY*.0005))};
  canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);canvas.addEventListener('wheel',wheel,{passive:false});raf=requestAnimationFrame(frame);
  dispose=()=>{active=false;cancelAnimationFrame(raf);ro.disconnect();canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up);canvas.removeEventListener('wheel',wheel)};
};
})();
