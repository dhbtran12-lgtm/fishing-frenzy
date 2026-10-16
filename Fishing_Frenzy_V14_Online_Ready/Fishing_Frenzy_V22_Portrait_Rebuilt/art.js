(function(){'use strict';const C={sky:'#8cdcf1',sea:'#238bb6'};function pixel(ctx,x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}function poly(ctx,pts,c){ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(...pts[0]);for(let i=1;i<pts.length;i++)ctx.lineTo(...pts[i]);ctx.closePath();ctx.fill()}function cloud(c,x,y){for(let [dx,dy,w,h] of [[0,8,52,12],[9,0,24,18],[25,4,27,17],[41,10,20,10]])pixel(c,x+dx,y+dy,w,h,'#f3fcf0')}
function sailor(c,x,y,i,t,scale=1){c.save();c.translate(Math.round(x),Math.round(y+Math.sin(t*3+i)*2));c.scale(scale,scale);let shirts=['#d55e80','#4c8ac5','#e7a843','#7d6ac4','#53a86f','#d67d52'];pixel(c,-7,0,14,4,'#3b3344');pixel(c,-6,-14,12,15,shirts[i%shirts.length]);pixel(c,-9,-10,3,9,'#efb887');pixel(c,6,-10,3,9,'#efb887');pixel(c,-5,-25,10,12,['#f5c28f','#c88862','#f0b88c'][i%3]);pixel(c,-6,-27,12,5,i%2?'#392c45':'#674233');pixel(c,-3,-19,2,2,'#34313a');pixel(c,2,-19,2,2,'#34313a');pixel(c,-5,0,4,6,'#40364c');pixel(c,1,0,4,6,'#40364c');c.restore()}
function creature(c,x,y,type,scale,flip,t){c.save();c.translate(x,y+Math.sin(t*2+x*.03)*3);c.scale(scale*(flip?-1:1),scale);const clr=['#ff963b','#6c9bba','#ed9add','#9a76d8'][type],dark=['#d45d3e','#42718e','#ba66a4','#624fa1'][type];if(type===0){poly(c,[[-13,0],[-23,-9],[-23,9]],dark);pixel(c,-15,-10,29,20,clr);pixel(c,-8,-10,5,20,'#fff5de');pixel(c,3,-10,5,20,'#fff5de');pixel(c,8,-3,3,3,'#20273a');poly(c,[[-2,-10],[5,-17],[10,-10]],dark)}if(type===1){poly(c,[[-18,0],[-28,-12],[-27,11]],dark);poly(c,[[-18,-6],[-5,-18],[19,-10],[24,0],[16,10],[-12,10]],clr);poly(c,[[-2,-13],[5,-24],[10,-12]],dark);pixel(c,13,-5,3,3,'#20273a');pixel(c,13,4,8,3,'#f8f6e9')}if(type===2){pixel(c,-13,-9,26,15,clr);pixel(c,-17,-5,34,11,clr);pixel(c,-12,6,3,13,dark);pixel(c,-4,6,3,16,dark);pixel(c,4,6,3,14,dark);pixel(c,12,6,3,11,dark);pixel(c,-7,-1,3,3,'#332944');pixel(c,5,-1,3,3,'#332944')}if(type===3){pixel(c,-13,-12,26,23,clr);poly(c,[[-13,-12],[0,-24],[13,-12]],dark);for(let i=-10;i<=10;i+=5)pixel(c,i,10,3,10+Math.sin(t*3+i)*3,dark);pixel(c,-7,-4,4,4,'#332944');pixel(c,5,-4,4,4,'#332944')}pixel(c,-6,-4,12,11,'#25304e');pixel(c,-5,-3,10,9,'#f6ead2');c.fillStyle='#172c4b';c.font='bold 9px monospace';c.textAlign='center';c.fillText('ABCD'[type],0,5);c.restore()}
function draw(canvas,players,phase,time,choice,onFish){const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;let W=400;let fish=[];function frame(ms){if(!canvas.isConnected)return;const rect=canvas.getBoundingClientRect();const dpr=Math.min(window.devicePixelRatio||1,2);const width=Math.max(1,Math.round(rect.width*dpr));const height=Math.max(1,Math.round(rect.height*dpr));const mobile=window.matchMedia("(max-width:700px) and (orientation:portrait)").matches;const H=mobile?Math.max(430,Math.min(1050,400*height/width)):300;const scale=mobile?width/W:Math.min(width/W,height/H);const ox=mobile?0:(width-W*scale)/2,oy=mobile?0:(height-H*scale)/2;if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,width,height);ctx.setTransform(scale,0,0,scale,ox,oy);ctx.imageSmoothingEnabled=false;let t=ms/1000;pixel(ctx,0,0,W,H,C.sky);for(let i=0;i<3;i++){poly(ctx,[[i*165-80,142],[i*165+55,46],[i*165+180,142]],['#85b8d0','#79a5c5','#a0c7d9'][i]);poly(ctx,[[i*165+20,91],[i*165+55,46],[i*165+86,92]],'#d9e9de')}cloud(ctx,25+(t*5)%410-60,26);cloud(ctx,220+(t*3)%410-60,45);pixel(ctx,0,mobile?105:132,W,H-(mobile?105:132),'#318fb4');for(let j=0;j<6;j++){for(let i=0;i<15;i++){let xx=(i*32+j*13+t*(j%2?11:-8))%450-20,yy=(mobile?115:144)+j*(mobile?27:27);pixel(ctx,xx,yy,16,3,j%2?'#81d9d3':'#57b6c5')}}let rocking=Math.sin(t*1.8)*2;
// V22: portrait scene is composed in independent native coordinates.
// The boat is intentionally small, and the water begins at y=105.
ctx.save();
if(mobile){ctx.translate(116,8+rocking*.25);ctx.scale(.52,.52)}
else{ctx.translate(0,rocking)}
poly(ctx,[[48,121],[317,121],[292,173],[89,173]],'#674332');
poly(ctx,[[55,128],[308,128],[289,163],[93,163]],'#95603c');
for(let j=0;j<4;j++)pixel(ctx,92,137+j*7,198,2,'#6f4731');
pixel(ctx,73,114,224,10,'#704632');pixel(ctx,168,38,7,88,'#5e392c');
poly(ctx,[[179,44],[179,116],[291,116]],'#f7e2a4');
poly(ctx,[[161,52],[161,114],[90,114]],'#fff0bc');
pixel(ctx,65,107,244,5,'#bb8450');
let ps=players||[];
ps.slice(0,mobile?4:20).forEach((p,i)=>{
 let px=mobile?93+i*53:95+(i%10)*21+Math.sin(t*1.3+i)*4;
 let py=111-Math.floor(i/10)*21;
 sailor(ctx,px,py,i,t,.76);
 ctx.font='bold 9px monospace';ctx.textAlign='center';
 let label=(p.name||'').slice(0,mobile?7:10);
 ctx.fillStyle='#1b243b';ctx.fillRect(px-26,py-39,52,14);
 ctx.fillStyle='#fffbe2';ctx.fillText(label,px,py-29)
});ctx.restore();
if(phase==='play'||phase==='reveal'){
 // The sea occupies most of the portrait game. Fish are in 4 spaced columns
 // and 8 rows, with gentle movement rather than crowded random collisions.
 const seaTop=mobile?105:186;
 pixel(ctx,0,seaTop,W,H-seaTop,'#16779f');
 for(let j=0;j<6;j++)for(let i=0;i<15;i++){
  let xx=(i*32+j*13+t*(j%2?11:-8))%450-20;
  let yy=seaTop+12+j*Math.max(19,(H-seaTop-18)/7);
  if(yy<H-8)pixel(ctx,xx,yy,16,3,j%2?'#81d9d3':'#57b6c5');
 }
 fish=[];
 const count=mobile?32:52;
 for(let i=0;i<count;i++){
  let ty=i%4,row=Math.floor(i/4),col=i%4;
  let yy,xx,sc;
  if(mobile){
   const rows=8,top=seaTop+39,bottom=H-30;
   yy=top+row*(bottom-top)/(rows-1)+Math.sin(t*.75+i)*3;
   xx=48+col*100+Math.sin(t*(.55+(i%5)*.08)+row*.7)*9;
   sc=.76;
  }else{
   yy=195+(i%9)*11.2;
   xx=((i*73+(i%2?1:-1)*t*(26+i%7*5))%480+480)%480-40;
   sc=i%3===0?.53:.66;
  }
  creature(ctx,xx,yy,ty,sc,i%2===0,t);
  fish.push({x:xx,y:yy,type:ty,r:mobile?19:13});
 }
 ctx.strokeStyle='#2d2e35';ctx.lineWidth=2;
 const hookX=mobile?210:195,hookStart=mobile?88:153;
 ctx.beginPath();ctx.moveTo(hookX,hookStart);
 ctx.lineTo(hookX,(mobile?seaTop+28:209)+Math.sin(t*3)*4);ctx.stroke();
 ctx.beginPath();ctx.arc(hookX,(mobile?seaTop+33:214)+Math.sin(t*3)*4,5,0,Math.PI);ctx.stroke();
 let selected=typeof choice==='function'?choice():choice;
 if(selected!==null&&selected!==undefined){
  ctx.fillStyle='#fff0b6';ctx.font='bold 12px monospace';
  ctx.textAlign='left';ctx.fillText('HOOKED: '+'ABCD'[selected],8,H-12);
 }
}
requestAnimationFrame(frame)}requestAnimationFrame(frame);if(onFish){canvas.addEventListener('pointerdown',e=>{let r=canvas.getBoundingClientRect(),mobile=window.matchMedia('(max-width:700px) and (orientation:portrait)').matches,H=mobile?Math.max(430,Math.min(1050,400*canvas.height/canvas.width)):300,sc=mobile?canvas.width/W:Math.min(canvas.width/W,canvas.height/H),x=((e.clientX-r.left)*canvas.width/r.width-(mobile?0:(canvas.width-W*sc)/2))/sc,y=((e.clientY-r.top)*canvas.height/r.height-(mobile?0:(canvas.height-H*sc)/2))/sc;let hit=fish.filter(f=>Math.hypot(f.x-x,f.y-y)<f.r+9).sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y))[0];if(hit)onFish(hit.type)})}}window.FFArt={draw}})();
