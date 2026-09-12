const menu=document.querySelector('.menu-btn');const links=document.querySelector('.nav-links');menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.textContent=open?'Close':'Menu'});document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu'}));document.getElementById('year').textContent=new Date().getFullYear();const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const projectPhotos=[...document.querySelectorAll('.photo-gallery img')];
let activePhoto=0;
const lightbox=document.createElement('div');
lightbox.className='lightbox';
lightbox.setAttribute('role','dialog');
lightbox.setAttribute('aria-modal','true');
lightbox.setAttribute('aria-label','Full project image');
lightbox.innerHTML='<button class="lightbox-close" type="button" aria-label="Close full image">×</button><button class="lightbox-prev" type="button" aria-label="Previous image">‹</button><img class="lightbox-image" alt=""><button class="lightbox-next" type="button" aria-label="Next image">›</button><p class="lightbox-caption"></p>';
document.body.appendChild(lightbox);
const fullImage=lightbox.querySelector('.lightbox-image');
const caption=lightbox.querySelector('.lightbox-caption');
const showPhoto=index=>{
  activePhoto=(index+projectPhotos.length)%projectPhotos.length;
  const selected=projectPhotos[activePhoto];
  fullImage.src=selected.src;
  fullImage.alt=selected.alt;
  caption.textContent=selected.alt;
};
const openLightbox=index=>{
  showPhoto(index);
  lightbox.classList.add('open');
  document.body.classList.add('lightbox-active');
  lightbox.querySelector('.lightbox-close').focus();
};
const closeLightbox=()=>{
  lightbox.classList.remove('open');
  document.body.classList.remove('lightbox-active');
  fullImage.src='';
};
projectPhotos.forEach((photo,index)=>{
  photo.setAttribute('tabindex','0');
  photo.setAttribute('draggable','false');
  photo.setAttribute('role','button');
  photo.setAttribute('aria-label','Open full image: '+photo.alt);
  photo.addEventListener('click',()=>openLightbox(index));
  photo.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openLightbox(index);}});
});
lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>showPhoto(activePhoto-1));
lightbox.querySelector('.lightbox-next').addEventListener('click',()=>showPhoto(activePhoto+1));
lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeLightbox();});
document.addEventListener('keydown',event=>{
  if(!lightbox.classList.contains('open'))return;
  if(event.key==='Escape')closeLightbox();
  if(event.key==='ArrowLeft')showPhoto(activePhoto-1);
  if(event.key==='ArrowRight')showPhoto(activePhoto+1);
});


// Professional section motion and scroll progress
const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionTargets=[
  ...document.querySelectorAll('.section-label,.heading-row,.metric-grid > div,.project-card,.project,.more-work,.skill,.role,.education > div,.contact-box')
];
motionTargets.forEach((element,index)=>{
  element.classList.add('motion-reveal');
  const group=element.parentElement;
  const siblings=[...group.children].filter(child=>motionTargets.includes(child));
  element.style.setProperty('--motion-delay',Math.min(siblings.indexOf(element)*90,270)+'ms');
});
if(prefersReducedMotion){
  motionTargets.forEach(element=>element.classList.add('motion-visible'));
}else{
  const motionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('motion-visible');
        motionObserver.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  motionTargets.forEach(element=>motionObserver.observe(element));
  const progress=document.createElement('div');
  progress.className='scroll-progress';
  progress.setAttribute('aria-hidden','true');
  document.body.appendChild(progress);
  let ticking=false;
  const updateProgress=()=>{
    const scrollable=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.transform='scaleX('+(scrollable>0?Math.min(window.scrollY/scrollable,1):0)+')';
    ticking=false;
  };
  window.addEventListener('scroll',()=>{
    if(!ticking){requestAnimationFrame(updateProgress);ticking=true;}
  },{passive:true});
  updateProgress();
}
