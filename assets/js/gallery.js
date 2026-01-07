/* Simple lightbox for gallery */
(function(){
  const lb = document.querySelector('[data-lightbox]');
  const lbImg = document.querySelector('[data-lightbox-img]');
  const lbClose = document.querySelector('[data-lightbox-close]');
  if(!lb || !lbImg) return;

  function open(src, alt){
    lbImg.src = src;
    lbImg.alt = alt || "Gallery image";
    lb.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
  function close(){
    lb.style.display = "none";
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll('[data-gallery] a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const img = a.querySelector('img');
      if(!img) return;
      open(img.getAttribute('src'), img.getAttribute('alt'));
    });
  });

  lbClose?.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if(e.target === lb) close(); });
  window.addEventListener('keydown', (e) => { if(e.key === "Escape") close(); });
})();
