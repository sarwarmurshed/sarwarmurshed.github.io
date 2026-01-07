/* News: sort (newest/oldest) + load more */
(function(){
  const mount = document.querySelector('[data-news]');
  if(!mount) return;

  const sortNewestBtn = document.querySelector('[data-sort="newest"]');
  const sortOldestBtn = document.querySelector('[data-sort="oldest"]');
  const loadMoreBtn   = document.querySelector('[data-load-more]');

  const NEWS = [
    // 2025
    {
      date: "2025-12-01",
      label: "Dec 2025",
      title: "Paper accepted: Conditional Synthetic Live and Spoof Fingerprint Generation",
      desc: "Accepted in IET Biometrics.",
      links: [{label:"arXiv", url:"https://arxiv.org/abs/2510.17035"}]
    },
    {
      date: "2025-08-01",
      label: "Aug 2025",
      title: "Paper accepted: Deep Learning-Based Approaches for Contactless Fingerprints Segmentation and Extraction",
      desc: "Accepted at BIOSIG 2025, Darmstadt, Germany.",
      links: [{label:"arXiv", url:"https://arxiv.org/abs/2311.15163"}]
    },
    {
      date: "2025-07-01",
      label: "Jul 2025",
      title: "Paper accepted: Explainable Face Recognition via Improved Localization",
      desc: "Published in Electronics 14(14):2745.",
      links: [{label:"DOI", url:"https://doi.org/10.3390/electronics14142745"}]
    },
    // 2024
    {
      date: "2024-10-01",
      label: "Oct 2024",
      title: "Paper accepted: Deep Age-Invariant Fingerprint Segmentation System",
      desc: "Published in IEEE T-BIOM.",
      links: [{label:"DOI", url:"https://doi.org/10.1109/TBIOM.2024.3506926"}, {label:"arXiv", url:"https://arxiv.org/abs/2303.03341"}]
    },
    {
      date: "2024-05-30",
      label: "May 2024",
      title: "Grant awarded: AI-powered Pavement Distress Detection (PI)",
      desc: "Funding: WiSys.",
      links: []
    },
    // 2023
    {
      date: "2023-08-01",
      label: "Aug 2023",
      title: "Started as Assistant Professor (Computer Science), UW–Green Bay",
      desc: "Tenure-track appointment.",
      links: [{label:"UWGB", url:"https://www.uwgb.edu/"}]
    },
    {
      date: "2023-06-01",
      label: "Jun 2023",
      title: "PhD completed: Efficient and Resource-Aware Deep Learning for Improved Object Detection",
      desc: "Clarkson University, ECE.",
      links: []
    }
  ];

  let sortMode = "newest";
  let visibleCount = Number(mount.getAttribute('data-initial')) || 6;

  function parseDate(d){ return new Date(d + "T00:00:00"); }

  function getSorted(){
    const copy = [...NEWS];
    copy.sort((a,b) => parseDate(b.date) - parseDate(a.date));
    if(sortMode === "oldest") copy.reverse();
    return copy;
  }

  function render(){
    const items = getSorted().slice(0, visibleCount);
    mount.innerHTML = items.map(n => {
      const links = (n.links || []).map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join(" ");
      return `
        <div class="list-item">
          <div class="date">${n.label} • ${n.date}</div>
          <div class="title">${n.title}</div>
          <div class="desc">${n.desc || ""}</div>
          ${links ? `<div class="inline-links">${links}</div>` : ``}
        </div>
      `;
    }).join("");

    const total = NEWS.length;
    if(loadMoreBtn){
      loadMoreBtn.style.display = visibleCount >= total ? "none" : "inline-flex";
    }
  }

  function setSort(mode){
    sortMode = mode;
    sortNewestBtn?.classList.toggle('primary-btn', mode === "newest");
    sortNewestBtn?.classList.toggle('secondary-btn', mode !== "newest");
    sortOldestBtn?.classList.toggle('primary-btn', mode === "oldest");
    sortOldestBtn?.classList.toggle('secondary-btn', mode !== "oldest");
    render();
  }

  sortNewestBtn?.addEventListener('click', () => setSort("newest"));
  sortOldestBtn?.addEventListener('click', () => setSort("oldest"));
  loadMoreBtn?.addEventListener('click', () => { visibleCount += 6; render(); });

  // init
  setSort(sortMode);
})();
