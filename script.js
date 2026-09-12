const menu=document.querySelector('.menu-btn');const links=document.querySelector('.nav-links');menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.textContent=open?'Close':'Menu'});document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu'}));document.getElementById('year').textContent=new Date().getFullYear();
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
