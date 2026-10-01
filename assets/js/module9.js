
const PK='secr1013-m9-progress'; let reg=[0,0,0,0], out=[], piso=[1,0,1,0], ring=[1,0,0,0], john=[0,0,0,0];
function updateProgress(){let c=[...document.querySelectorAll('.lessonCheck')],d=c.filter(x=>x.checked).length,p=c.length?Math.round(d/c.length*100):0;document.querySelector('.bar').style.width=p+'%';document.querySelector('.pct').textContent=p+'%';localStorage.setItem(PK,JSON.stringify(c.map(x=>x.checked)))}
function drawReg(id,a){document.getElementById(id).innerHTML=a.map((v,i)=>`<div class="ff"><small>FF${i}</small>${v}</div>${i<a.length-1?'<div class="arrow">→</div>':''}`).join('')}
function initSerial(){let n=+document.getElementById('n').value;reg=Array(n).fill(+document.getElementById('initial').value);out=[];drawReg('serialReg',reg);document.getElementById('serialOut').textContent='Serial out: —'}
function serialClock(){let bit=+document.getElementById('din').value;let lost=reg[reg.length-1];reg=[bit,...reg.slice(0,-1)];out.push(lost);drawReg('serialReg',reg);document.getElementById('serialOut').textContent='Shifted out: '+out.join(' ')}
function loadPISO(){piso=document.getElementById('pdata').value.replace(/[^01]/g,'').split('').map(Number);if(!piso.length)piso=[0,0,0,0];drawReg('pisoReg',piso);document.getElementById('pisoOut').textContent='Q(n−1) / serial out: '+piso[piso.length-1]}
function shiftPISO(){let lost=piso[piso.length-1];piso=[0,...piso.slice(0,-1)];drawReg('pisoReg',piso);document.getElementById('pisoOut').textContent='Serial bit shifted out: '+lost}
function initRing(){let n=+document.getElementById('rn').value;ring=Array(n).fill(0);ring[0]=1;drawReg('ringReg',ring);document.getElementById('ringInfo').textContent=`${n}-bit ring counter = MOD-${n}`}
function ringClock(){let last=ring[ring.length-1];ring=[last,...ring.slice(0,-1)];drawReg('ringReg',ring)}
function initJohn(){let n=+document.getElementById('jn').value;john=Array(n).fill(0);drawReg('johnReg',john);document.getElementById('johnInfo').textContent=`${n}-bit Johnson counter = MOD-${2*n}`}
function johnClock(){let fb=john[john.length-1]?0:1;john=[fb,...john.slice(0,-1)];drawReg('johnReg',john)}
const cards=[
['What is a shift register?','A register made from flip-flops that stores binary data and can shift it left or right when a signal is applied.'],
['SISO','Serial In / Serial Out: input and output are one bit at a time.'],
['SIPO','Serial In / Parallel Out: serial input; all output bits become available simultaneously after n clock cycles for an n-bit register.'],
['PISO','Parallel In / Serial Out: inputs load simultaneously, then bits shift out one at a time.'],
['PIPO','Parallel In / Parallel Out: input and output are both parallel; output appears at the triggering clock edge.'],
['Ring counter','SISO-style register with final output fed back to first input. n-bit ring counter = MOD-n.'],
['Johnson counter','Last complemented output is fed back to the first FF. n-bit Johnson counter = MOD-2n.'],
['Exercise 9.4','6-bit PISO, D0…D5 = 100110, output through Q5, initially all zeros.']
];let ci=0,front=true;function fc(){document.getElementById('flash').textContent=front?cards[ci][0]:cards[ci][1]}function flipCard(){front=!front;fc()}function nextCard(){ci=(ci+1)%cards.length;front=true;fc()}
const A={q1:'b',q2:'c',q3:'a',q4:'b',q5:'c',q6:'a',q7:'b',q8:'c'};
function grade(){let s=0;Object.entries(A).forEach(([q,a])=>{let x=document.querySelector(`input[name="${q}"]:checked`);if(x&&x.value===a)s++});let e=document.getElementById('score');e.textContent=`Score: ${s}/8 (${Math.round(s/8*100)}%)`;e.className='feedback '+(s>=6?'good':'bad')}
document.addEventListener('DOMContentLoaded',()=>{let c=[...document.querySelectorAll('.lessonCheck')],s=JSON.parse(localStorage.getItem(PK)||'[]');c.forEach((x,i)=>{x.checked=!!s[i];x.onchange=updateProgress});updateProgress();initSerial();loadPISO();initRing();initJohn()});
