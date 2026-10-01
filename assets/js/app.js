
const KEY='secr1013-m7-progress';
function updateProgress(){
 const checks=[...document.querySelectorAll('.lessonCheck')];
 const done=checks.filter(x=>x.checked).length;
 const pct=checks.length?Math.round(done/checks.length*100):0;
 document.querySelectorAll('.bar').forEach(x=>x.style.width=pct+'%');
 document.querySelectorAll('.pct').forEach(x=>x.textContent=pct+'%');
 localStorage.setItem(KEY,JSON.stringify(checks.map(x=>x.checked)));
}
document.addEventListener('DOMContentLoaded',()=>{
 const checks=[...document.querySelectorAll('.lessonCheck')];
 const saved=JSON.parse(localStorage.getItem(KEY)||'[]');
 checks.forEach((x,i)=>{x.checked=!!saved[i];x.addEventListener('change',updateProgress)});updateProgress();
});
function jkCalc(){
 const j=+document.getElementById('j').value,k=+document.getElementById('k').value,q=+document.getElementById('q').value;
 let n=q,op='Hold'; if(j===0&&k===1){n=0;op='Reset'}else if(j===1&&k===0){n=1;op='Set'}else if(j===1&&k===1){n=1-q;op='Toggle'}
 document.getElementById('jkResult').innerHTML=`Q(next) = <b>${n}</b> — ${op}`;
}
function dCalc(){const d=+document.getElementById('d').value;document.getElementById('dResult').innerHTML=`At the active clock edge: Q(next) = <b>${d}</b>`}
function tCalc(){const t=+document.getElementById('t').value,q=+document.getElementById('tq').value,n=t?1-q:q;document.getElementById('tResult').innerHTML=`Q(next) = <b>${n}</b> — ${t?'Toggle':'Hold'}`}
const cards=[
 ['Latch vs Flip-Flop','Latch is level-sensitive. Flip-flop is edge-triggered and synchronized to a clock transition.'],
 ['Gated S-R','EN=0 → no change. EN=1: 00 Hold, 01 Reset, 10 Set, 11 Invalid.'],
 ['Gated D Latch','When EN=1, Q=D. When EN=0, no change.'],
 ['J-K Flip-Flop','00 Hold, 01 Reset, 10 Set, 11 Toggle. J-K has no S-R invalid state.'],
 ['D Flip-Flop','Q follows D at the active/triggering clock edge.'],
 ['T Flip-Flop','T=0 Hold; T=1 Toggle. Frequently used in counters.'],
 ['PRE / CLR','Asynchronous inputs have higher priority than clock and synchronous inputs.'],
 ['Master-Slave JK','Master receives external JK; slave receives master outputs and an inverted clock pulse.']
];let ci=0,front=true;
function renderCard(){document.getElementById('flash').textContent=front?cards[ci][0]:cards[ci][1]}
function flipCard(){front=!front;renderCard()}function nextCard(){ci=(ci+1)%cards.length;front=true;renderCard()}
const answers={q1:'b',q2:'c',q3:'d',q4:'a',q5:'b'};
function gradeQuiz(){let s=0;for(const [q,a] of Object.entries(answers)){const x=document.querySelector(`input[name="${q}"]:checked`);if(x&&x.value===a)s++}const e=document.getElementById('score');e.className='feedback '+(s>=4?'good':'bad');e.textContent=`Score: ${s}/5 (${s*20}%)`;localStorage.setItem('secr1013-m7-quiz',s)}
