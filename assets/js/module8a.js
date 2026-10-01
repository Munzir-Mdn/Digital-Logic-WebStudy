
const PKEY='secr1013-m8a-progress';let count=0,dir=1;
function bits(n,w){return n.toString(2).padStart(w,'0')}
function cfg(){return {n:+document.getElementById('bits').value,mod:+document.getElementById('mod').value}}
function redraw(){
 const c=cfg(), max=Math.min(c.mod,2**c.n); count=((count%max)+max)%max;
 document.getElementById('counter').textContent=bits(count,c.n);
 document.getElementById('decimal').textContent=`Decimal state: ${count} | MOD-${max}`;
}
function clock(){count+=dir;redraw()} function resetCounter(){count=0;redraw()} function setDir(v){dir=v;document.getElementById('direction').textContent=v>0?'UP':'DOWN'}
function modCalc(){
 const m=+document.getElementById('targetMod').value;if(m<2)return;
 const n=Math.ceil(Math.log2(m)), decode=bits(m,n);
 document.getElementById('modResult').innerHTML=`Minimum flip-flops: <b>${n}</b><br>Normal capacity: 2<sup>${n}</sup> = ${2**n}<br>For the slide's asynchronous truncated-counter method, decode <b>${m}<sub>10</sub> = ${decode}<sub>2</sub></b> to force recycle.`;
}
function fcalc(){
 const N=+document.getElementById('N').value,tpd=+document.getElementById('tpd').value;
 if(N>0&&tpd>0){const f=1/(N*tpd*1e-9);document.getElementById('fResult').innerHTML=`f<sub>max</sub> = 1/(N·t<sub>pd</sub>) = <b>${(f/1e6).toFixed(3)} MHz</b>`}
}
function updateProgress(){const c=[...document.querySelectorAll('.lessonCheck')],d=c.filter(x=>x.checked).length,p=c.length?Math.round(100*d/c.length):0;document.querySelector('.bar').style.width=p+'%';document.querySelector('.pct').textContent=p+'%';localStorage.setItem(PKEY,JSON.stringify(c.map(x=>x.checked)))}
const cards=[
['What is a counter?','A sequential circuit that goes through a prescribed sequence of states when input pulses are applied.'],
['Asynchronous counter','Flip-flops do not change at exactly the same time because they do not share a common clock pulse. External clock is connected only to the LSB flip-flop.'],
['n-bit count range','0 to 2ⁿ − 1.'],
['MOD','Number of states the counter can have.'],
['3-bit UP sequence','000 → 001 → 010 → 011 → 100 → 101 → 110 → 111 → 000'],
['Decade counter','A truncated MOD-10 counter. In the slide example, decode 1010₂ and clear the flip-flops.'],
['Ripple-counter disadvantage','Propagation delay accumulates from stage to stage.'],
['Maximum frequency','fmax = 1/(N × tpd), using the formula presented in the module.']
];let ci=0,front=true;
function renderCard(){document.getElementById('flash').textContent=front?cards[ci][0]:cards[ci][1]}function flipCard(){front=!front;renderCard()}function nextCard(){ci=(ci+1)%cards.length;front=true;renderCard()}
const ans={q1:'b',q2:'c',q3:'b',q4:'a',q5:'c',q6:'b'};
function gradeQuiz(){let s=0;Object.entries(ans).forEach(([q,a])=>{let x=document.querySelector(`input[name="${q}"]:checked`);if(x&&x.value===a)s++});let e=document.getElementById('score');e.textContent=`Score: ${s}/6 (${Math.round(s/6*100)}%)`;e.className='feedback '+(s>=5?'good':'bad');localStorage.setItem('secr1013-m8a-quiz',s)}
document.addEventListener('DOMContentLoaded',()=>{const c=[...document.querySelectorAll('.lessonCheck')],s=JSON.parse(localStorage.getItem(PKEY)||'[]');c.forEach((x,i)=>{x.checked=!!s[i];x.onchange=updateProgress});updateProgress();redraw()});
