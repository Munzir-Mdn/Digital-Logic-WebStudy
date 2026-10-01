
const PK='secr1013-m8b-progress'; let value=0, direction=1;
const bits=(n,w)=>n.toString(2).padStart(w,'0');
function updateProgress(){let c=[...document.querySelectorAll('.lessonCheck')],d=c.filter(x=>x.checked).length,p=c.length?Math.round(d/c.length*100):0;document.querySelector('.bar').style.width=p+'%';document.querySelector('.pct').textContent=p+'%';localStorage.setItem(PK,JSON.stringify(c.map(x=>x.checked)))}
function syncDraw(){let n=+document.getElementById('sb').value,max=2**n;value=(value+max)%max;document.getElementById('syncCounter').textContent=bits(value,n);document.getElementById('syncDec').textContent='Decimal: '+value;document.querySelectorAll('.state').forEach(x=>x.classList.toggle('active',+x.dataset.v===value))}
function clk(){let n=+document.getElementById('sb').value,max=2**n;value=(value+direction+max)%max;syncDraw()}function rst(){value=0;syncDraw()}function dir(v){direction=v;document.getElementById('dir').textContent=v>0?'UP':'DOWN'}
function excite(){
 let type=document.getElementById('ff').value,q=+document.getElementById('qp').value,n=+document.getElementById('qn').value,out='';
 if(type==='D') out='D = '+n;
 if(type==='T') out='T = '+(q^n);
 if(type==='JK'){let a={'00':'J=0, K=X','01':'J=1, K=X','10':'J=X, K=1','11':'J=X, K=0'};out=a[''+q+n]}
 document.getElementById('exResult').textContent=out;
}
function cascade(){
 let mods=document.getElementById('mods').value.split(/[,x×\s]+/).map(Number).filter(x=>x>0),f=+document.getElementById('freq').value,u=document.getElementById('unit').value,total=mods.reduce((a,b)=>a*b,1),rows='',cur=f;
 mods.forEach((m,i)=>{cur/=m;rows+=`Stage ${i+1}: ÷${m} → ${cur.toFixed(6)} ${u}<br>`});
 document.getElementById('casResult').innerHTML=`Total MOD = <b>${total}</b><br>${rows}Final output = <b>${cur.toFixed(6)} ${u}</b>`;
}
let bcd=0;function bcdClk(){bcd=(bcd+1)%10;document.getElementById('bcd').textContent=bits(bcd,4);document.getElementById('bcdDec').textContent='BCD decimal state: '+bcd}
const cards=[
['6 synchronous-counter design steps','1 Basic parts/I-O → 2 State diagram → 3 Next-state table → 4 FF transition table → 5 K-maps/logic equations → 6 Implement circuit.'],
['JK excitation: 0→0','J=0, K=X'],['JK excitation: 0→1','J=1, K=X'],['JK excitation: 1→0','J=X, K=1'],['JK excitation: 1→1','J=X, K=0'],
['D excitation rule','D equals the required next state.'],['T excitation rule','T=0 for no change; T=1 to toggle.'],
['3-bit synchronous UP JK','J0=K0=1; J1=K1=Q0; J2=K2=Q1Q0.'],
['BCD decade counter','Counts 0–9 and recycles to 0; 4 flip-flops; states 10–15 are don’t-care terms in the module.'],
['Cascaded modulus','Multiply stage moduli. Example: MOD-4 × MOD-8 = MOD-32.']
];let ci=0,front=true;function fc(){document.getElementById('flash').textContent=front?cards[ci][0]:cards[ci][1]}function flipCard(){front=!front;fc()}function nextCard(){ci=(ci+1)%cards.length;front=true;fc()}
const A={q1:'b',q2:'c',q3:'a',q4:'c',q5:'b',q6:'a',q7:'c',q8:'b'};
function grade(){let s=0;Object.entries(A).forEach(([q,a])=>{let x=document.querySelector(`input[name="${q}"]:checked`);if(x&&x.value===a)s++});let e=document.getElementById('score');e.textContent=`Score: ${s}/8 (${Math.round(s/8*100)}%)`;e.className='feedback '+(s>=6?'good':'bad')}
document.addEventListener('DOMContentLoaded',()=>{let c=[...document.querySelectorAll('.lessonCheck')],s=JSON.parse(localStorage.getItem(PK)||'[]');c.forEach((x,i)=>{x.checked=!!s[i];x.onchange=updateProgress});updateProgress();syncDraw()});
