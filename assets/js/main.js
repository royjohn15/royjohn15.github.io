import * as THREE from './vendor/three.module.min.js';
import {RoundedBoxGeometry} from './vendor/RoundedBoxGeometry.js';
import {mergeVertices} from './vendor/BufferGeometryUtils.js';
import {CSS3DRenderer,CSS3DObject} from './vendor/CSS3DRenderer.js';

/* To add your resume: put the PDF in assets/ and set its path here, e.g. 'assets/Roy_John_Resume.pdf' */
const RESUME_PDF='';

window.__booted=true;document.getElementById('boot').remove();
const $=s=>document.querySelector(s);
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse=matchMedia('(pointer: coarse)').matches;
const errors=[];addEventListener('error',e=>errors.push(e.message||'load error'),true);addEventListener('unhandledrejection',e=>errors.push(String(e.reason)));

/* ---------- Apps on the computer (facts from the resume) ---------- */
const APPS={
 about:['About',`<h2>Hi, I’m Roy.</h2><p>I started out in pure maths and moved into machine learning. I’m now a PhD student at IIT Madras, and my work will probably centre on optimisation and machine learning. I also taught maths and statistics for six years, and it’s still one of my favourite things to talk about.</p>
   <h3>Right now</h3><p>PhD student at IIT Madras since July 2026, and Research Associate at the ADOPT Lab since 2022.</p>
   <h3>Where to start</h3><div class="cards"><button data-app="research"><b>Research</b><span>What I’ve worked on so far, and where I’m heading.</span></button><button data-app="projects"><b>Projects</b><span>My code, from machine learning to small everyday tools.</span></button></div>
   <div class="links"><a class="pill" href="https://github.com/royjohn15" target="_blank" rel="noopener">GitHub ↗</a><a class="pill" href="https://linkedin.com/in/roy-john-00a38b224" target="_blank" rel="noopener">LinkedIn ↗</a><button class="pill" data-app="contact">Say hello</button></div>`],
 research:['Research',`<h2>Research</h2><p>I’ve been a Research Associate at the ADOPT Lab, IIT Madras, since 2022, advised by Dr. Palaniappan Ramu and Dr. G Saravana Kumar.</p>
   <h3>Where I’m heading</h3><p>My PhD will probably centre on optimisation and machine learning.</p>
   <h3>Benford’s Law and its applications</h3><p>Finding anomalies in large collections of text, by combining an extended form of Benford’s Law with Symbolic Aggregate approXimation (SAX).</p>
   <h3>Researcher clustering</h3><p>Grouping researchers by the abstracts of their papers, using Fuzzy C-Means. The aim was to map scientific communities, spot new interdisciplinary trends and suggest possible collaborators.</p>
   <h3>Industrial process optimisation</h3><p>Predictive maintenance models built with Random Forest and Gradient Boosting for a major automotive client, working alongside other researchers and the client’s engineers.</p>
   <h3>What interests me</h3><p>Numerical techniques, optimisation, stochastic modelling, analytic and computational number theory, the mathematics of machine learning, anomaly and fraud detection, explainable AI, probabilistic graphical models and applications of deep learning.</p>`],
 teaching:['Teaching',`<h2>Teaching</h2>
   <h3>Private tutor, 2018 to 2024</h3><p>I taught high school and undergraduate students, one-on-one and in small groups. We covered calculus, linear algebra, differential equations, probability and statistical inference.</p>
   <h3>Freelance mentor, 2025</h3><p>I mentored students and reviewed their machine learning and NLP projects, through Brigeon Solutions in Calicut.</p>
   <h3>Monte Carlo teaching tool, 2020</h3><p>A visual tool for teaching Monte Carlo integration, which uses congruence equations to generate its random numbers. It was part of my KSCSTE-funded project at Mar Ivanios College.</p>`],
 projects:['Projects',`<h2>Projects</h2><input id="pf" type="search" placeholder="Search all 34 projects" aria-label="Search projects" autocomplete="off"><p id="pfn" role="status"></p><h3 class="sec" id="pfh">Featured</h3><ul class="repos"><li><a href="https://github.com/royjohn15/Axiom" target="_blank" rel="noopener">Axiom</a><small>Python</small><p>A TUI tool for my PhD journey.</p></li><li><a href="https://github.com/royjohn15/TeXt" target="_blank" rel="noopener">TeXt</a><small>Python</small><p>My own offline LaTeX editor and compiler.</p></li><li><a href="https://github.com/royjohn15/LLMs-From-Scratch" target="_blank" rel="noopener">LLMs-From-Scratch</a><small>Python</small><p>Learning LLMs from scratch.</p></li><li><a href="https://github.com/royjohn15/EchoAurora" target="_blank" rel="noopener">EchoAurora</a><small>HTML</small><p>An app that helps find the acoustic properties of a room.</p></li><li><a href="https://github.com/royjohn15/NoiseLens" target="_blank" rel="noopener">NoiseLens</a><small>HTML</small><p>An app that measures your daily noise quota.</p></li></ul><div id="pfc"><h3 class="sec">From my coursework and research</h3>
   <h3>Student dropout prediction</h3><p>I compared Logistic Regression, Decision Trees, Random Forest, k-NN and XGBoost on five years of anonymised university records, then used SHAP to see which academic and socio-economic factors best predicted dropout.</p>
   <h3>Consumer review analysis</h3><p>Exploratory and aspect-based sentiment analysis of over 10,000 face mask reviews. It pointed to a gap in the market that fed into the manufacturer’s product plans.</p>
   <h3>Flash card application</h3><p>Won the Best Project Award at IIT Madras in 2021. <a href="https://github.com/royjohn15/FlashCardApplication" target="_blank" rel="noopener">See the code</a></p>
   <h3>Computational number theory</h3><p>Python tools for analysing, visualising and solving linear and non-linear congruences, built at Mar Ivanios College in 2020 with KSCSTE funding.</p>
   <h3 class="sec">Everything on GitHub</h3><p>The other 29 of my 34 public repositories. <a href="https://github.com/royjohn15?tab=repositories" target="_blank" rel="noopener">Open my GitHub</a></p></div><details><summary>Machine learning and maths<span>7</span></summary><ul class="repos"><li><a href="https://github.com/royjohn15/FakeNewsDetection" target="_blank" rel="noopener">FakeNewsDetection</a><small>Python</small><p>Detects fake news using ML techniques coupled with the First Letter Law.</p></li><li><a href="https://github.com/royjohn15/TensorTonic-Solutions" target="_blank" rel="noopener">TensorTonic-Solutions</a><small>Python</small><p>My solutions to TensorTonic problems.</p></li><li><a href="https://github.com/royjohn15/StatisticalComputing" target="_blank" rel="noopener">StatisticalComputing</a><small>Jupyter Notebook</small><p>R notebooks for the Statistical Computing course.</p></li><li><a href="https://github.com/royjohn15/TicTacToeAI" target="_blank" rel="noopener">TicTacToeAI</a><small>Python</small><p>A Tic Tac Toe playing AI.</p></li><li><a href="https://github.com/royjohn15/HandGame" target="_blank" rel="noopener">HandGame</a><small>Python</small><p>A computer vision project.</p></li><li><a href="https://github.com/royjohn15/MLNoCodeApp" target="_blank" rel="noopener">MLNoCodeApp</a></li><li><a href="https://github.com/royjohn15/MLProject" target="_blank" rel="noopener">MLProject</a></li></ul></details><details><summary>Study and everyday tools<span>5</span></summary><ul class="repos"><li><a href="https://github.com/royjohn15/FlashCardApplication" target="_blank" rel="noopener">FlashCardApplication</a><small>Python</small><p>A flash card application for memory training.</p></li><li><a href="https://github.com/royjohn15/StudyBuddy" target="_blank" rel="noopener">StudyBuddy</a><small>JavaScript</small><p>Study tracker.</p></li><li><a href="https://github.com/royjohn15/StudyTracker_v2" target="_blank" rel="noopener">StudyTracker_v2</a><small>Python</small><p>Study tracker Streamlit application.</p></li><li><a href="https://github.com/royjohn15/StudyTracker" target="_blank" rel="noopener">StudyTracker</a><small>Python</small><p>Study tracker application.</p></li><li><a href="https://github.com/royjohn15/keysounds" target="_blank" rel="noopener">keysounds</a><small>Python</small><p>Custom keyboard sounds for Linux.</p></li></ul></details><details><summary>Tools for teaching and academic work<span>9</span></summary><ul class="repos"><li><a href="https://github.com/royjohn15/GraduatingCapacity" target="_blank" rel="noopener">GraduatingCapacity</a><small>HTML</small><p>Computing the graduating capacity of faculty members.</p></li><li><a href="https://github.com/royjohn15/BTPEvaluationForm" target="_blank" rel="noopener">BTPEvaluationForm</a><small>HTML</small><p>BTech project evaluation form.</p></li><li><a href="https://github.com/royjohn15/FacultyCoursePreferenceJanMay" target="_blank" rel="noopener">FacultyCoursePreferenceJanMay</a><small>HTML</small><p>Custom form for faculty course preference.</p></li><li><a href="https://github.com/royjohn15/FacultyCoursePreference" target="_blank" rel="noopener">FacultyCoursePreference</a><small>HTML</small><p>Course preference form.</p></li><li><a href="https://github.com/royjohn15/FacultyTAPreference" target="_blank" rel="noopener">FacultyTAPreference</a><small>HTML</small><p>Custom form for faculty TA preference.</p></li><li><a href="https://github.com/royjohn15/TAPreferences" target="_blank" rel="noopener">TAPreferences</a><small>HTML</small><p>TA course and lab preferences.</p></li><li><a href="https://github.com/royjohn15/CourseFormApp" target="_blank" rel="noopener">CourseFormApp</a><small>Python</small><p>Form application for selecting course preferences.</p></li><li><a href="https://github.com/royjohn15/RoomBooking" target="_blank" rel="noopener">RoomBooking</a><small>JavaScript</small><p>Room booking application.</p></li><li><a href="https://github.com/royjohn15/Project_RB" target="_blank" rel="noopener">Project_RB</a><small>Python</small><p>Room booking application.</p></li></ul></details><details><summary>More projects<span>8</span></summary><ul class="repos"><li><a href="https://github.com/royjohn15/ED5518" target="_blank" rel="noopener">ED5518</a><small>HTML</small></li><li><a href="https://github.com/royjohn15/PolygonInteractiveApp" target="_blank" rel="noopener">PolygonInteractiveApp</a><small>Python</small></li><li><a href="https://github.com/royjohn15/data-ocean-framework" target="_blank" rel="noopener">data-ocean-framework</a></li><li><a href="https://github.com/royjohn15/SoftwareEngineeringProject" target="_blank" rel="noopener">SoftwareEngineeringProject</a><p>The Software Engineering course project.</p></li><li><a href="https://github.com/royjohn15/portfolio" target="_blank" rel="noopener">portfolio</a><small>JavaScript</small><p>An earlier portfolio website.</p></li><li><a href="https://github.com/royjohn15/RestaurantWebsite" target="_blank" rel="noopener">RestaurantWebsite</a><small>JavaScript</small><p>A simple website for a local restaurant.</p></li><li><a href="https://github.com/royjohn15/SimpleWebsite" target="_blank" rel="noopener">SimpleWebsite</a><p>A simple website.</p></li><li><a href="https://github.com/royjohn15/github-slideshow" target="_blank" rel="noopener">github-slideshow</a><small>Ruby</small><p>A robot-powered training repository.</p></li></ul></details>`],
 journey:['Journey',`<h2>Journey</h2>
   <h3>2026 to now</h3><p>PhD, IIT Madras.</p><h3>2022 to now</h3><p>Research Associate, ADOPT Lab, IIT Madras.</p>
   <h3>2021 to 2024</h3><p>BS in Data Science and Applications, IIT Madras. CGPA 8.1.</p><h3>2018 to 2020</h3><p>MSc in Mathematics, University of Kerala. CGPA 9.0.</p><h3>2015 to 2018</h3><p>BSc in Mathematics, University of Kerala. CGPA 8.9.</p>
   <h3>Awards</h3><ul class="certs"><li>Best Project Award, IIT Madras, 2021, for my flash card application</li><li>Project funding grant, Kerala State Council for Science, Technology and Environment, 2020</li><li>First Prize, Arthur Cayley Paper Presentation Competition, 2019</li><li>First Prize, Inter-collegiate Mathematics Quiz, 2017</li></ul>
   <h3>Tools I use</h3><p>Python, SQL, JavaScript, R, PyTorch, Scikit-Learn, Pandas, NumPy, SciPy, Flask, PostgreSQL, SQLite, LaTeX, Linux and Git.</p>
   <h3>Certificates</h3><ul class="certs"><li><a href="https://www.kaggle.com/learn/certification/royjohn15/intro-to-programming" target="_blank" rel="noopener">Intro to Programming</a></li><li><a href="https://www.kaggle.com/learn/certification/royjohn15/intro-to-machine-learning" target="_blank" rel="noopener">Intro to Machine Learning</a></li><li><a href="https://www.kaggle.com/learn/certification/royjohn15/intermediate-machine-learning" target="_blank" rel="noopener">Intermediate Machine Learning</a></li><li>Supervised Machine Learning: Regression and Classification</li><li>Build a Data Science Web App with Streamlit and Python</li><li>Command Line in Linux</li><li>Data Mining</li><li>Modern JavaScript: ES6 Basics</li></ul>`],
 resume:['Resume',`<h2>Resume</h2><p>I’m a PhD student at IIT Madras, with degrees in mathematics and data science. I’ve worked in machine learning research since 2022 and started teaching in 2018.</p>
   ${RESUME_PDF?`<div class="links" style="margin-top:14px"><a class="pill go" href="${RESUME_PDF}" target="_blank" rel="noopener">Download my resume (PDF)</a></div>`:''}
   <h3>Or read it here</h3><div class="links"><button class="pill" data-app="research">Research</button><button class="pill" data-app="teaching">Teaching</button><button class="pill" data-app="projects">Projects</button><button class="pill" data-app="journey">Education and awards</button></div>`],
 contact:['Contact',`<h2>Say hello</h2><p>Write to me about research, collaboration, mentoring or work.</p><h3>Email</h3><div class="mail"><a href="mailto:royjohn@alumni.iitm.ac.in">royjohn@alumni.iitm.ac.in</a><button class="pill" data-act="copy">Copy</button></div><h3>GitHub</h3><p><a href="https://github.com/royjohn15" target="_blank" rel="noopener">github.com/royjohn15</a></p><h3>LinkedIn</h3><p><a href="https://linkedin.com/in/roy-john-00a38b224" target="_blank" rel="noopener">linkedin.com/in/roy-john-00a38b224</a></p>`]
};

/* ---------- Screen DOM ---------- */
const tpl=$('#tpl').content.cloneNode(true),screenEl=tpl.querySelector('#screen'),inner=screenEl.querySelector('#inner'),cover=screenEl.querySelector('#cover'),glare=screenEl.querySelector('#glare');
const wb=inner.querySelector('#wb'),wt=inner.querySelector('#wt');
const q=s=>inner.querySelector(s);
const tick=()=>{q('#clock').innerHTML='<span class="city">Chennai · </span>'+new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Kolkata'});};tick();setInterval(tick,20000);
let curApp='about',rendered=false;
const copyEmail=b=>{const v='royjohn@alumni.iitm.ac.in',done=()=>{b.textContent='Copied ✓';setTimeout(()=>{b.textContent='Copy';},1800);},fb=()=>{const t=document.createElement('textarea');t.value=v;t.style.cssText='position:fixed;opacity:0';document.body.append(t);t.select();let ok=false;try{ok=document.execCommand('copy');}catch{}t.remove();b.focus();if(ok)done();else b.textContent='Press Ctrl+C on the address';};(navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).then(done,fb);};
function filterProjects(v){const t=v.trim().toLowerCase();let n=0;const lis=[...wb.querySelectorAll('.repos li')];lis.forEach(li=>{const m=!t||li.textContent.toLowerCase().includes(t);li.hidden=!m;if(m)n++;});wb.querySelector('#pfc').hidden=!!t;wb.querySelector('#pfh').hidden=t&&!wb.querySelector('.repos').querySelector('li:not([hidden])');
  wb.querySelectorAll('details').forEach(d=>{const any=d.querySelector('li:not([hidden])');d.hidden=!any;d.open=!!t&&!!any;});wb.querySelector('#pfn').textContent=t?(n?n+' of '+lis.length+' projects':'Nothing matches that.'):'';}
inner.addEventListener('input',e=>{if(e.target.id==='pf')filterProjects(e.target.value);});
function openApp(id){curApp=id;rendered=true;const[t,h]=APPS[id];wt.textContent=t;wb.innerHTML=h;wb.scrollTop=0;wb.classList.remove('in');void wb.offsetWidth;wb.classList.add('in');[...wb.children].forEach((e,i)=>e.style.animationDelay=Math.min(i,6)*28+'ms');const ic=q('[data-app="'+id+'"]');if(flat&&ic){const box=ic.parentElement;box.scrollLeft=ic.offsetLeft-box.offsetLeft-(box.clientWidth-ic.offsetWidth)/2;}
  inner.querySelectorAll('[data-app]').forEach(b=>b.setAttribute('aria-current',b.dataset.app===id));
  document.querySelectorAll('nav [data-go]').forEach(b=>b.setAttribute('aria-current',b.dataset.go===id));
  document.title=(id==='about'?'':t+' · ')+'Roy John';
  }
inner.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.app)go(b.dataset.app);const a=b.dataset.act;if(a==='copy')copyEmail(b);});

/* ---------- Page state and URLs: #research links work, and so does Back ---------- */
let opened=false,state='intro',flat=false,glOK=(()=>{try{const c=document.createElement('canvas');return !!(c.getContext('webgl2')||c.getContext('webgl'));}catch{return false;}})();
const wantFlat=()=>!glOK||Math.min(innerWidth*.9,innerHeight*.78*900/680)<560;
const hintText=()=>coarse?'Tap the computer':'Click the computer';
function placeInner(){const f=state==='screen'&&wantFlat();if(f!==flat){const y=wb.scrollTop,a=document.activeElement===wb;flat=f;(f?$('#flat'):screenEl).append(inner);$('#flat').classList.toggle('on',f);document.body.classList.toggle('isflat',f);wb.scrollTop=y;if(a)wb.focus({preventScroll:true});}}
function enter(id){const same=state==='screen'&&curApp===id&&rendered;if(state==='intro')finishIntro();state='screen';opened=true;placeInner();if(!same)openApp(id);cover.classList.add('gone');glare.style.opacity=0;inner.inert=false;document.body.classList.add('focus');$('#hint').style.opacity=0;$('#nudge').style.opacity=0;$('#back').style.display=glOK?'block':'none';$('#tip').style.display='none';if(!same){wb.classList.add('quiet');wb.focus({preventScroll:true});}}
function leave(){state='table';cover.classList.remove('gone');glare.style.opacity=1;inner.inert=true;document.body.classList.remove('focus');placeInner();$('#back').style.display='none';$('#hint').style.opacity=0;
  document.querySelectorAll('nav [data-go]').forEach(b=>b.removeAttribute('aria-current'));document.title='Roy John';cover.focus({preventScroll:true});}
function route(){const h=location.hash.slice(1);if(APPS[h])enter(h);else if(state==='screen'){if(glOK)leave();else enter('about');}}
function go(id){if(location.hash.slice(1)===id)enter(id);else location.hash=id;}
function goTable(){if(state!=='screen'||!glOK)return;history.pushState(null,'',location.pathname+location.search);route();}
function finishIntro(){if(state!=='intro')return;state='table';time=Math.max(time,INTRO);document.body.classList.remove('intro');$('#skip').style.display='none';$('#title').style.display='none';screenEl.classList.add('on');$('#hint').textContent=hintText();$('#hint').style.opacity=opened?0:1;}
addEventListener('hashchange',route);addEventListener('popstate',route);
document.querySelectorAll('nav [data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
$('#skip').onclick=()=>{finishIntro();cover.focus({preventScroll:true});};$('#back').onclick=goTable;$('#home').onclick=()=>{finishIntro();goTable();};
cover.addEventListener('click',()=>{if(state==='intro')finishIntro();else go(curApp);});
addEventListener('keydown',e=>{if(e.key==='Tab')wb.classList.remove('quiet');if(e.key==='Escape'&&e.target.id==='pf'&&e.target.value){e.target.value='';filterProjects('');return;}if(e.key==='Escape'){if(state==='screen')goTable();else finishIntro();}});
/* Tabbing into 3D content must not scroll the layers underneath out of place */
addEventListener('scroll',e=>{const t=e.target;if(t===wb||(t.closest&&t.closest('#wb')))return;if(t===document){scrollTo(0,0);return;}if(t.contains&&t.contains(screenEl)){t.scrollTop=0;t.scrollLeft=0;}},true);
inner.inert=true;

const INTRO=4.4;let time=0;
function fallback(){glOK=false;$('#gl').style.display='none';$('#css3d').style.display='none';$('#skip').style.display='none';$('#hint').style.display='none';$('#back').style.display='none';state='intro';finishIntro();enter(APPS[location.hash.slice(1)]?location.hash.slice(1):'about');}

/* ---------- 3D ---------- */
if(!glOK){$('#hint').style.display='none';fallback();}
else{
const renderer=new THREE.WebGLRenderer({canvas:$('#gl'),antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.setClearColor(0x000000,0);
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const cv=renderer.domElement;
cv.addEventListener('webglcontextlost',e=>{e.preventDefault();fallback();});
const css=new CSS3DRenderer();css.domElement.style.pointerEvents='none';$('#css3d').append(css.domElement);
const scene=new THREE.Scene(),cssScene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(35,1,.1,500);

scene.add(new THREE.HemisphereLight(0xffffff,0xe6dff2,1.62));
const sun=new THREE.DirectionalLight(0xfff6e6,1.3);sun.position.set(-7,20,12);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.bias=-.0006;sun.shadow.normalBias=.03;
Object.assign(sun.shadow.camera,{left:-14,right:14,top:14,bottom:-14,near:1,far:50});scene.add(sun);

const ramp=new THREE.DataTexture(new Uint8Array([192,192,192,255,226,226,226,255,255,255,255,255]),3,1,THREE.RGBAFormat);ramp.minFilter=ramp.magFilter=THREE.NearestFilter;ramp.needsUpdate=true;
const toon=c=>new THREE.MeshToonMaterial({color:c,gradientMap:ramp});
const hullM=w=>{const m=new THREE.MeshBasicMaterial({color:0x2a2638,side:THREE.BackSide});m.onBeforeCompile=s=>{s.vertexShader=s.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>\n transformed += normalize(normal)*${w};`);};return m;};
const HULL=hullM('0.036'),HULLT=hullM('0.015');
/* Outlines use smoothed normals so corners stay closed */
const hullCache=new WeakMap();
function hullGeo(g){if(hullCache.has(g))return hullCache.get(g);const c=g.clone();c.deleteAttribute('uv');c.deleteAttribute('normal');const m=mergeVertices(c,1e-3);m.clearGroups();m.computeVertexNormals();hullCache.set(g,m);return m;}
function mesh(geo,color,parent,p=[0,0,0],r=[0,0,0],hull=HULL){const m=new THREE.Mesh(geo,typeof color==='number'?toon(color):color);m.position.set(...p);m.rotation.set(...r);m.castShadow=true;m.receiveShadow=true;
  if(hull){const o=new THREE.Mesh(hullGeo(geo),hull);o.raycast=()=>{};m.add(o);}parent.add(m);return m;}
const rb=(w,h,d,r=.15)=>new RoundedBoxGeometry(w,h,d,4,Math.min(r,w/2-.001,h/2-.001,d/2-.001));
const labels=[];
function label(text,w,h,p,parent,{bg='#fff8ea',fg='#2a2638',font='600 62px Fraunces,serif',cw=512,ch=128}={}){const c=document.createElement('canvas');c.width=cw;c.height=ch;const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;
  const lines=[].concat(text),draw=()=>{const g=c.getContext('2d');g.clearRect(0,0,cw,ch);if(bg){g.fillStyle=bg;g.fillRect(0,0,cw,ch);}g.fillStyle=fg;g.font=font;g.textAlign='center';g.textBaseline='middle';lines.forEach((l,i)=>g.fillText(l,cw/2,ch/2+4+(i-(lines.length-1)/2)*ch/(lines.length+.3)));t.needsUpdate=true;};draw();labels.push(draw);
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,transparent:!bg}));m.position.set(...p);m.raycast=()=>{};parent.add(m);return m;}
if(document.fonts&&document.fonts.load)Promise.all([document.fonts.load('600 62px Fraunces'),document.fonts.load('700 62px Fraunces')]).then(()=>labels.forEach(d=>d()));
function radial(inner,outer){const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d'),r=g.createRadialGradient(128,128,0,128,128,128);r.addColorStop(0,inner);r.addColorStop(.55,inner.replace(/[\d.]+\)$/,m=>parseFloat(m)*.55+')'));r.addColorStop(1,outer);g.fillStyle=r;g.fillRect(0,0,256,256);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
function decal(tex,w,d,x,y,z,opacity=1,ry=0){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,opacity,dithering:true}));m.position.set(x,y,z);m.rotation.y=ry;m.raycast=()=>{};scene.add(m);return m;}

const T=6,COL={wood:0xe9c79a,woodD:0xc99a6b,woodL:0xf2d9b5,cream:0xf8efe0,creamD:0xe9dcc6,coral:0xdc7a60,teal:0x7fb0a2,sun:0xf2cf7e,lilac:0xc9bfe6,ink:0x2a2638,white:0xffffff,mint:0xe3ebdf,page:0xfff9ec};

/* Soft shadows on the white floor */
const blob=radial('rgba(84,72,120,.3)','rgba(84,72,120,0)');
decal(blob,23,13,.8,.01,.4,.42);
[[-6.7,3.3],[6.7,3.3],[-6.7,-2.5],[6.7,-2.5]].forEach(([x,z])=>decal(blob,1.9,1.3,x+(x>0?.3:-.2),.02,z+(z>0?.2:-.2),.8));

/* Pale symbols drifting in the void, for depth */
const glyphs=[['∑',-19,11,-8,1.9],['π',19,12,-10,1.7],['∇',-23,3,-14,1.4],['∫',23,2,-12,1.9]].map(([t,x,y,z,sz],i)=>{const c=document.createElement('canvas');c.width=c.height=128;const tx=new THREE.CanvasTexture(c),dr=()=>{const g=c.getContext('2d');g.clearRect(0,0,128,128);g.fillStyle='#b9aed6';g.font='500 96px Fraunces,Georgia,serif';g.textAlign='center';g.textBaseline='middle';g.fillText(t,64,68);tx.needsUpdate=true;};dr();labels.push(dr);tx.colorSpace=THREE.SRGBColorSpace;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,transparent:true,depthWrite:false,opacity:.34}));sp.scale.setScalar(sz);sp.position.set(x,y,z);sp.userData.y=y;sp.userData.p=i*1.7;sp.raycast=()=>{};scene.add(sp);return sp;});

/* Table */
const table=new THREE.Group();scene.add(table);
mesh(rb(16,.46,9.4,.2),COL.wood,table,[0,T-.23,.4]);
mesh(rb(14.6,.42,8,.08),COL.woodD,table,[0,T-.66,.4]);
mesh(rb(4,.28,.08,.04),COL.wood,table,[0,T-.66,4.42],[0,0,0],HULLT);
mesh(new THREE.SphereGeometry(.08,14,10),COL.coral,table,[0,T-.66,4.5],[0,0,0],HULLT);
[[-6.7,3.3],[6.7,3.3],[-6.7,-2.5],[6.7,-2.5]].forEach(([x,z])=>{const l=mesh(new THREE.CylinderGeometry(.34,.17,T-.8,22),COL.woodD,table,[x,(T-.8)/2,z],[z>0?-.08:.08,0,x>0?.08:-.08]);l.receiveShadow=false;});
{/* Hand-drawn wood grain */
  const c=document.createElement('canvas');c.width=1024;c.height=600;const g=c.getContext('2d');g.lineCap='round';g.strokeStyle='rgba(150,104,62,.2)';
  [[60,70,500],[620,48,340],[180,150,420],[700,165,270],[30,265,300],[440,300,520],[110,395,460],[660,430,330],[260,505,420],[790,540,190]].forEach(([x,y,w])=>{g.lineWidth=4;g.beginPath();g.moveTo(x,y);g.bezierCurveTo(x+w*.3,y-10,x+w*.65,y+11,x+w,y-2);g.stroke();});
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;decal(t,15.2,8.9,0,T+.006,.4);}

/* Clickable things grow out of the table as the camera arrives */
const things=[];
function thing(id,tip,x,z,delay,action,anchor=[0,.5,0]){const g=new THREE.Group();g.position.set(x,T,z);g.userData={id,tip,delay,action,bounce:-1,anchor:new THREE.Vector3(...anchor)};scene.add(g);things.push(g);return g;}
const zoomTo=id=>go(id);const openPc=()=>go(curApp);

/* Computer */
const pc=thing('pc','Open the computer',0,-.8,0,openPc,[0,1.3,1.8]);
mesh(rb(3.3,.3,2.5,.12),COL.cream,pc,[0,.15,.1]);
mesh(new THREE.CylinderGeometry(.6,.85,.7,22),COL.creamD,pc,[0,.62,0]);
mesh(rb(6.1,5.1,3.7,.5),COL.cream,pc,[0,3.35,-.2]);
mesh(rb(4.1,3.2,1.4,.5),COL.creamD,pc,[0,3.35,-2.4]);
mesh(rb(5.05,3.85,.1,.28),COL.ink,pc,[0,3.6,1.65],[0,0,0],null);
const SCREEN_W=4.7,SCREEN_H=SCREEN_W*680/900;
label('ROY-1',.82,.2,[-2.05,1.29,1.665],pc,{bg:'#f8efe0',font:'700 86px Fraunces,serif'});
mesh(rb(1.15,.13,.08,.03),COL.ink,pc,[.55,1.29,1.64],[0,0,0],null);
[1.62,2.02].forEach(x=>mesh(new THREE.CylinderGeometry(.13,.13,.1,18).rotateX(Math.PI/2),COL.coral,pc,[x,1.29,1.68],[0,0,0],HULLT));
const led=mesh(new THREE.SphereGeometry(.075,12,10),new THREE.MeshBasicMaterial({color:0x3fd06f}),pc,[2.42,1.29,1.67],[0,0,0],null);
for(let i=0;i<5;i++)mesh(rb(1.5,.03,.1,.012),COL.ink,pc,[0,5.9,-1.1+i*.28],[0,0,0],null);
/* Sticky note */
{const c=mesh(rb(1.2,1.2,.03,.012),COL.sun,pc,[3.06,4.95,1.7],[0,0,-.09],HULLT);label(['∑ 1/n²','= π²/6'],1.05,.8,[0,0,.02],c,{bg:null,font:'italic 600 88px Georgia,serif',cw:400,ch:300});}
/* Cable from the mouse, behind the keyboard */
{const cur=new THREE.CatmullRomCurve3([[3.6,.14,3.7],[3.45,.08,2.6],[2.9,.05,1.8],[1.7,.05,1.45],[1.2,.05,.85]].map(a=>new THREE.Vector3(a[0],T+a[1],a[2])));const m=new THREE.Mesh(new THREE.TubeGeometry(cur,48,.055,8),new THREE.MeshBasicMaterial({color:0x2a2638}));m.raycast=()=>{};scene.add(m);m.userData.isCable=true;pc.userData.cable=m;}

/* Keyboard and mouse */
const kb=thing('kb','Open the computer',.1,3.3,.15,openPc,[0,.3,0]);
mesh(rb(5.5,.32,1.95,.14),COL.cream,kb,[0,.16,0]);
const keyRows=[[...Array(10).keys()].map(i=>[-2.25+i*.5,.42]),[...Array(10).keys()].map(i=>[-2.25+i*.5,.42]),[[-2.25,.42],[-1.75,.42],[0,2.5],[1.75,.42],[2.25,.42]]];
keyRows.forEach((row,r)=>row.forEach(([x,w],c)=>mesh(rb(w,.16,.42,.06),(r===0&&c<2)?COL.coral:(r===2&&w>1)?COL.white:COL.mint,kb,[x,.39,-.55+r*.55],[0,0,0],HULLT)));
const mouse=thing('mouse','Open the computer',3.6,4.1,.25,openPc,[0,.2,0]);
{const g=new THREE.SphereGeometry(.42,22,16);g.scale(.8,.5,1.15);mesh(g,COL.cream,mouse,[0,.2,0]);}

/* Galton board: Research */
const gal=thing('research','Research',-5.7,-1.5,.35,()=>zoomTo('research'),[0,3,.2]);
mesh(rb(3.7,5.15,.16,.16),COL.wood,gal,[0,2.65,-.08]);
mesh(rb(3.25,4.65,.16,.1),COL.lilac,gal,[0,2.68,.03],[0,0,0],HULLT);
mesh(rb(4.1,.3,1.1,.12),COL.woodD,gal,[0,.15,.03]);
const ROWS=6,SP=.4,PY=r=>3.95-r*.33,M=new THREE.Matrix4(),pegPts=[];for(let r=0;r<ROWS;r++)for(let i=0;i<=r;i++)pegPts.push([(i-r/2)*SP,PY(r)]);
const pegs=new THREE.InstancedMesh(new THREE.SphereGeometry(.058,10,8),toon(COL.ink),pegPts.length);pegPts.forEach((p,i)=>{M.makeTranslation(p[0],p[1],.17);pegs.setMatrixAt(i,M);});gal.add(pegs);
[-1,1].forEach(s=>mesh(rb(.7,.09,.18,.03),COL.woodD,gal,[s*.5,4.72,.17],[0,0,s*-.55],HULLT));
for(let i=0;i<=ROWS+1;i++)mesh(rb(.055,1.65,.16,.025),COL.woodD,gal,[(i-(ROWS+1)/2)*SP,1.1,.17],[0,0,0],null);
const BMAX=80,BINH=9,balls=new THREE.InstancedMesh(new THREE.SphereGeometry(.085,12,10),toon(COL.coral),BMAX);balls.count=0;balls.frustumCulled=false;gal.add(balls);
const live=[],bins=Array(ROWS+1).fill(0);let nb=0,spawnT=0,drain=-1;
const Z0=new THREE.Matrix4().makeScale(0,0,0),fl=b=>.4+b*.165;
function spawnBall(){let k=0;const idx=[0];for(let r=0;r<ROWS;r++){k+=Math.random()<.5?0:1;idx.push(k);}live.push({i:nb++,idx,t:-1,bin:k,done:0,x:0,y:5});}
function galTick(dt){
  if(drain>=0){drain+=dt;live.forEach(b=>{b.y-=dt*(2+drain*9);M.makeTranslation(b.x,b.y,.2);balls.setMatrixAt(b.i,b.y<.28?Z0:M);});balls.instanceMatrix.needsUpdate=true;if(drain>.75){drain=-1;nb=0;live.length=0;bins.fill(0);balls.count=0;}return;}
  spawnT-=dt;if(spawnT<=0&&nb<BMAX){spawnT=.26;spawnBall();}
  live.forEach(b=>{if(b.done)return;b.t+=dt*4.6;let x,y;const X=r=>(b.idx[r]-r/2)*SP,Y=r=>PY(r)+.145;
    if(b.t<0){x=0;y=Y(0)+(-b.t)*.5;}
    else if(b.t<ROWS){const s=Math.floor(b.t),f=b.t-s,x1=X(s),x2=X(s+1),y2=s+1<ROWS?Y(s+1):2.0;x=x1+(x2-x1)*Math.sin(f*Math.PI/2);y=Y(s)+(y2-Y(s))*f+Math.sin(f*Math.PI)*.13;}
    else{x=X(ROWS);const tf=(b.t-ROWS)/4.6;y=2-.5*9.8*tf*tf*2;const floor=fl(bins[b.bin]);if(y<=floor){y=floor;bins[b.bin]++;b.done=1;if(bins[b.bin]>=BINH)drain=0;}}
    b.x=x;b.y=y;M.makeTranslation(x,y,.2);balls.setMatrixAt(b.i,M);});
  balls.count=nb;balls.instanceMatrix.needsUpdate=true;}
if(reduce){[1,3,6,9,6,3,1].forEach((n,bi)=>{for(let j=0;j<n;j++){M.makeTranslation((bi-ROWS/2)*SP,fl(j),.2);balls.setMatrixAt(nb++,M);}});balls.count=nb;balls.instanceMatrix.needsUpdate=true;}

/* Books: Journey. The teacher's apple rides on top */
const bk=thing('journey','Journey',5.35,1.9,.5,()=>zoomTo('journey'),[0,.8,1.1]);
[['Real Analysis',COL.coral,'#dc7a60',-.05],['Number Theory',COL.teal,'#7fb0a2',.09],['Deep Learning',COL.sun,'#f2cf7e',-.12]].forEach((b,i)=>{const g=new THREE.Group();g.position.y=.27+i*.54;g.rotation.y=b[3];bk.add(g);
  mesh(rb(3.1,.09,2.15,.03),b[1],g,[0,.21,0],[0,0,0],HULLT);mesh(rb(3.1,.09,2.15,.03),b[1],g,[0,-.21,0],[0,0,0],HULLT);mesh(rb(2.92,.36,1.95,.02),COL.page,g,[0,0,-.04],[0,0,0],null);mesh(rb(3.1,.5,.16,.06),b[1],g,[0,0,1],[0,0,0],HULLT);
  label(b[0],2.5,.38,[0,0,1.085],g,{bg:b[2],font:'600 72px Fraunces,serif',cw:640,ch:96});});
const ap=thing('teaching','Teaching',0,0,.8,()=>zoomTo('teaching'),[0,.6,.5]);bk.add(ap);ap.position.set(.15,1.62,-.1);
{const g=new THREE.SphereGeometry(.62,26,20);g.scale(1,.93,1);mesh(g,COL.coral,ap,[0,.56,0]);mesh(new THREE.CylinderGeometry(.04,.065,.34,8),0x6a3f22,ap,[0,1.2,0],[0,0,.15],HULLT);const lf=new THREE.SphereGeometry(.26,14,10);lf.scale(1,.2,.55);mesh(lf,COL.teal,ap,[.28,1.26,0],[0,0,.45],HULLT);
  const sh=new THREE.SphereGeometry(.13,12,8);sh.scale(1,.55,.4);mesh(sh,new THREE.MeshBasicMaterial({color:0xffffff}),ap,[-.3,.85,.42],[0,-.5,.5],null).castShadow=false;}

/* Mug */
const mug=thing('mug','A very necessary mug',-3.75,3.75,.6,()=>bounce(mug),[0,.5,.3]);
mesh(new THREE.CylinderGeometry(.5,.44,.98,24),COL.teal,mug,[0,.5,0]);mesh(new THREE.TorusGeometry(.27,.085,10,20),COL.teal,mug,[.5,.52,0]);mesh(new THREE.CylinderGeometry(.43,.43,.02,22),0x6a3f22,mug,[0,.97,0],[0,0,0],null);
const puff=radial('rgba(120,116,130,.5)','rgba(120,116,130,0)'),steam=[0,1,2].map(i=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:puff,transparent:true,depthWrite:false}));s.userData.o=i/3;mug.add(s);s.raycast=()=>{};return s;});

/* Flash cards: Projects */
const cards=thing('projects','Projects',-6,2.4,.7,()=>zoomTo('projects'),[0,.3,0]);
[[0,-.1,.05],[.14,.12,-.06],[.28,-.04,.1]].forEach((c,i)=>{const m=mesh(rb(2.3,.09,1.5,.04),i===2?COL.white:(i?COL.sun:COL.mint),cards,[c[1],.08+c[0],c[1]*.3],[0,c[2],0],HULLT);if(i===2){const l=label('∫ eˣ dx = ?',1.9,.86,[0,.052,0],m,{bg:'#ffffff',font:'600 88px Georgia,serif',cw:512,ch:230});l.rotation.x=-Math.PI/2;}});

/* Lamp: on and off */
const lamp=thing('lamp','Click the lamp',6.5,-2.4,.9,()=>{bounce(lamp);setLamp(!lampOn);},[0,2.5,0]);
mesh(new THREE.CylinderGeometry(.9,1,.25,26),COL.teal,lamp,[0,.13,0]);mesh(new THREE.CylinderGeometry(.09,.09,4.2,12),COL.ink,lamp,[0,2.2,0],[0,0,0],null);
{const sm=toon(COL.sun);sm.side=THREE.DoubleSide;mesh(new THREE.ConeGeometry(1.15,1.35,28,1,true).rotateZ(-.55),sm,lamp,[-.42,4.55,0]);}
const bulb=mesh(new THREE.SphereGeometry(.36,16,12),new THREE.MeshBasicMaterial({color:0xfff0a8}),lamp,[-.7,4.15,0],[0,0,0],null);bulb.castShadow=false;
{const hp=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,5.4,10));hp.position.y=2.7;hp.material.visible=false;hp.castShadow=false;lamp.add(hp);}
const lampL=new THREE.PointLight(0xffd690,3,12,1.6);lampL.position.set(-1.1,3.6,.3);lamp.add(lampL);
const pool=decal(radial('rgba(255,236,160,.8)','rgba(255,236,160,0)'),9,6.5,3.6,T+.012,-1,.8);
let lampOn=true;function setLamp(v){lampOn=v;bulb.material.color.set(v?0xfff0a8:0x8f8a7a);lampL.intensity=v?3:0;pool.visible=v;}

/* Real HTML on the monitor */
const cssObj=new CSS3DObject(screenEl);cssObj.scale.setScalar(SCREEN_W/900);cssObj.position.set(0,T+3.6,.91);cssScene.add(cssObj);
const SC=new THREE.Vector3(0,T+3.6,.91);

/* Camera */
const LOOK=new THREE.Vector3(0,T-.1,0),lookFrom=new THREE.Vector3(0,3.5,0);
const path=new THREE.CatmullRomCurve3([new THREE.Vector3(-74,40,122),new THREE.Vector3(-36,25,76),new THREE.Vector3(-9,14,42),new THREE.Vector3(0,T+6,32)]);
let az=0,azT=0,el=0,elT=0,drag=null,mx=0,my=0;
const ease=t=>t<.5?4*t*t*t:1-(-2*t+2)**3/2;
const elastic=t=>t<=0?.0001:t>=1?1:2**(-10*t)*Math.sin((t*10-.75)*2.094)+1;
const curP=new THREE.Vector3().copy(path.getPoint(0)),curL=new THREE.Vector3().copy(lookFrom),vP=new THREE.Vector3(),vL=new THREE.Vector3(),A=new THREE.Vector3();
const spring=(x,v,t,w,dt)=>{A.copy(t).sub(x).multiplyScalar(w*w).addScaledVector(v,-2*w);v.addScaledVector(A,dt);x.addScaledVector(v,dt);};
const narrow=()=>Math.max(1,1.05/camera.aspect)*(innerHeight<520?1.18:1);
const Y=new THREE.Vector3(0,1,0);
function heroPos(){const d=new THREE.Vector3(0,5.6,31).multiplyScalar(narrow());d.applyAxisAngle(Y,az+(coarse?0:mx*.05));d.y+=el*6+(coarse?0:my*.5);return LOOK.clone().add(d);}
function screenDist(){const t=Math.tan(camera.fov*Math.PI/360);return Math.max((SCREEN_H/2)/(t*.78),(SCREEN_W/2)/(t*camera.aspect*.9));}
function bounce(g){if(!reduce)g.userData.bounce=0;}

/* Pointer */
const ray=new THREE.Raycaster(),nd=new THREE.Vector2();
function hit(e){nd.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);ray.setFromCamera(nd,camera);const r=ray.intersectObjects(things,true)[0];if(!r)return null;let o=r.object;while(o&&!(o.userData&&o.userData.id))o=o.parent;return o;}
let hover=null,lowQ=false,lastAct=0,now=0,nudgeI=0,nudgeG=null,nudgeT=0;const tipEl=$('#tip'),nudgeEl=$('#nudge');const NUDGE=['research','journey','teaching','projects','lamp'];
const hideTip=()=>{hover=null;tipEl.style.display='none';};
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1;if(drag&&e.buttons===0&&e.pointerType==='mouse'){drag=null;cv.style.cursor='';}
  if(drag&&state==='table'){if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>6)hideTip();azT=clamp(drag.az-(e.clientX-drag.x)*.0035,-.3,.3);elT=clamp(drag.el+(e.clientY-drag.y)*.003,-.2,.5);cv.style.cursor='grabbing';return;}
  if(e.target!==cv||state!=='table'||e.pointerType==='touch'){if(hover){hideTip();cv.style.cursor='';}return;}
  const h=hit(e);if(h)lastAct=now,$('#nudge').style.opacity=0;if(h!==hover){hover=h;if(h&&!['pc','kb','mouse'].includes(h.userData.id))bounce(h);}
  cv.style.cursor=h?'pointer':'grab';
  if(h){tipEl.textContent=h.userData.tip;tipEl.style.display='block';const w=tipEl.offsetWidth,hh=tipEl.offsetHeight;tipEl.style.transform=`translate(${Math.min(e.clientX+14,innerWidth-w-8)}px,${Math.min(e.clientY+16,innerHeight-hh-8)}px)`;}else tipEl.style.display='none';});
document.documentElement.addEventListener('pointerleave',hideTip);addEventListener('blur',()=>{hideTip();drag=null;});
cv.addEventListener('pointerdown',e=>{if(e.button!==0)return;if(state==='intro'){finishIntro();return;}lastAct=now;drag={x:e.clientX,y:e.clientY,az:azT,el:elT};try{cv.setPointerCapture(e.pointerId);}catch{}});
addEventListener('pointerup',e=>{if(!drag)return;const far=Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>6;drag=null;cv.style.cursor='';if(far||state!=='table')return;const under=document.elementFromPoint(e.clientX,e.clientY);if(under!==cv)return;const h=hit(e);if(h)h.userData.action();});
addEventListener('pointercancel',()=>{drag=null;hideTip();});
function resize(){renderer.setPixelRatio(lowQ?1:Math.min(devicePixelRatio||1,2));renderer.setSize(innerWidth,innerHeight,false);css.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();placeInner();}
addEventListener('resize',resize);resize();

const nudgeV=new THREE.Vector3();let renderedOnce=0;
function draw(dt){
  if(flat||!glOK)return;
  time+=dt;now+=dt;
  const idle=state==='screen'&&vP.length()<.01&&curP.distanceTo(SC)<40&&renderedOnce>2;if(!idle&&!reduce)galTick(dt);
  const e1=1-Math.exp(-6*dt);az+=(azT-az)*e1;el+=(elT-el)*e1;
  if(state==='intro'){const pg=clamp(time/INTRO),p=ease(pg);curP.copy(path.getPoint(p)).lerp(heroPos(),p*p);curL.copy(lookFrom).lerp(LOOK,p);if(pg>=.8)screenEl.classList.add('on');$('#title').style.opacity=clamp(1-(pg-.32)/.2);if(pg>=1)finishIntro();}
  else{let tp,tl;if(state==='screen'){tl=SC.clone();tl.y+=.2;tp=SC.clone();tp.z+=screenDist();tp.y+=.2;}else{tp=heroPos();tl=LOOK;}
    if(reduce){curP.copy(tp);curL.copy(tl);}else{spring(curP,vP,tp,4.3,dt);spring(curL,vL,tl,4.3,dt);}}
  camera.position.copy(curP);camera.lookAt(curL);
  const appear=time-INTRO*.5;
  things.forEach(g=>{const d=g.userData;let s=g===pc||reduce?1:elastic(clamp((appear-d.delay*1.25)/.9)),sx=s,sy=s;
    if(d.bounce>=0){d.bounce+=dt*2.4;if(d.bounce>=1)d.bounce=-1;else{const a=Math.sin(d.bounce*Math.PI*3)*(1-d.bounce)*.16;sy*=1+a;sx*=1-a*.7;}}
    g.scale.set(sx,sy,sx);});
  pc.userData.cable.visible=mouse.scale.x>.5;
  steam.forEach(s=>{const t=reduce?.3:(time*.32+s.userData.o)%1;s.position.set(Math.sin(t*9+s.userData.o*6)*.09,1.05+t*1.3,0);const z=.28+t*.55;s.scale.set(z,z,1);s.material.opacity=(1-t)*Math.min(1,t*5)*.85;});
  if(!reduce)led.material.color.set(Math.sin(time*2.2)>-.7?0x3fd06f:0x1e8a44);
  if(!reduce)glyphs.forEach(g=>{g.position.y=g.userData.y+Math.sin(time*.35+g.userData.p)*.5;});
  /* Gentle hints that the objects are alive: most useful on touch, where nothing hovers */
  if(!reduce&&state==='table'&&!drag&&time>INTRO+2.5&&now-lastAct>5.5){const nid=NUDGE[nudgeI++%NUDGE.length];nudgeG=things.find(t=>t.userData.id===nid);bounce(nudgeG);nudgeEl.textContent=nudgeG.userData.tip.replace('Click',coarse?'Tap':'Click');nudgeT=now;lastAct=now;}
  if(nudgeG){if(state!=='table'||now-nudgeT>2.2){nudgeEl.style.opacity=0;if(now-nudgeT>2.6||state!=='table')nudgeG=null;}else{const v=nudgeV.copy(nudgeG.userData.anchor);nudgeG.localToWorld(v);v.y+=.2;v.project(camera);const w=nudgeEl.offsetWidth;nudgeEl.style.transform=`translate(${clamp((v.x+1)/2*innerWidth-w/2,8,innerWidth-w-8)}px,${(1-v.y)/2*innerHeight-46}px)`;nudgeEl.style.opacity=1;}}
  if(!idle){renderer.render(scene,camera);renderedOnce++;}else if(state!=='screen')renderedOnce=0;
  if(state!=='screen')renderedOnce=0;
  css.render(cssScene,camera);
}
if(reduce)finishIntro();
if(APPS[location.hash.slice(1)]){const id=location.hash.slice(1);finishIntro();curP.copy(heroPos());curL.copy(LOOK);enter(id);}
let crashes=0,last=performance.now(),frames=0,fT=0,fps=0;
let slow=0;
function loop(t){const raw=(t-last)/1000;last=t;frames++;fT+=raw;if(fT>=1){fps=frames/fT;frames=0;fT=0;if(state==='table'&&!lowQ&&!document.hidden){slow=fps<24?slow+1:0;if(slow>=3){lowQ=true;sun.shadow.autoUpdate=false;resize();}}}try{draw(Math.min(raw,.05));}catch(err){errors.push(String(err));if(++crashes>4){fallback();return;}}requestAnimationFrame(loop);}
draw(1/60);requestAnimationFrame(loop);
}
