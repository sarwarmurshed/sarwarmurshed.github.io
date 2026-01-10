/* News: sort (newest/oldest) + load more
   Updated to include all news items from your homepage.
*/
(function(){
  const mount = document.querySelector('[data-news]');
  if(!mount) return;

  const sortNewestBtn = document.querySelector('[data-sort="newest"]');
  const sortOldestBtn = document.querySelector('[data-sort="oldest"]');
  const loadMoreBtn   = document.querySelector('[data-load-more]');

  const NEWS = [
    // ---------------- 2025 ----------------
    {
      date: "2025-12-14",
      label: "Dec 2025",
      title: "Paper accepted: Conditional Synthetic Live and Spoof Fingerprint Generation",
      desc: "Accepted in IET Biometrics.",
	  links: [
        {label:"DOI", url:"https://doi.org/10.1049/bme2/7736489"},
        {label:"arXiv", url:"https://arxiv.org/abs/2510.17035"}
      ]
    },
    {
      date: "2025-07-30",
      label: "Aug 2025",
      title: "Paper accepted: Deep Learning-Based Approaches for Contactless Fingerprints Segmentation and Extraction",
      desc: "Accepted at BIOSIG 2025, Darmstadt, Germany.",
      links: [{label:"arXiv", url:"https://arxiv.org/abs/2311.15163"}]
    },
    {
      date: "2025-07-08",
      label: "Jul 2025",
      title: "Paper accepted: Explainable Face Recognition via Improved Localization",
      desc: "Published in Electronics 14(14):2745.",
      links: [{label:"DOI", url:"https://doi.org/10.3390/electronics14142745"}]
    },

    // ---------------- 2024 ----------------
    {
      date: "2024-10-15",
      label: "Oct 2024",
      title: "Paper accepted: Deep Age-Invariant Fingerprint Segmentation System",
      desc: "Published in IEEE T-BIOM.",
      links: [
        {label:"DOI", url:"https://doi.org/10.1109/TBIOM.2024.3506926"},
        {label:"arXiv", url:"https://arxiv.org/abs/2303.03341"}
      ]
    },
	{
      date: "2024-05-30",
      label: "May 2024",
      title: "Grant awarded: AI-powered Pavement Distress Detection (PI)",
      desc: "Funding: WiSys.",
      links: []
    },
	{
	  date: "2024-04-01",
	  label: "2024",
	  title: "Invited talk: Challenges and Opportunities of Generative AI in Higher Education – Practical Experience",
	  desc: "Presented at the AI in Higher Education Conference (Lakeshore Technical College).",
	  links: []
	},
	{
      date: "2024-03-01",
      label: "2024",
      title: "Webinar: Contactless fingerprint segmentation (CITeR)",
      desc: "Presented on contactless fingerprint segmentation in a webinar hosted by CITeR.",
      links: [{label:"CITeR", url:"https://citer.clarkson.edu/"}]
    },
    {
      date: "2024-01-01",
      label: "2024",
      title: "Technology transfer: Contactless fingerprint segmentation system shared with the Canadian government",
      desc: "",
      links: []
    },

    // ---------------- 2023 ----------------
    {
      date: "2023-12-01",
      label: "2023",
      title: "Paper accepted: The Utility of Feature Reuse: Transfer Learning in Data-Starved Regimes",
      desc: "Accepted at the IEEE International Conference on Computational Science and Computational Intelligence (CSci 2023).",
      links: [
        {label:"IEEE", url:"https://ieeexplore.ieee.org/document/10590472"},
        {label:"PDF", url:"https://arxiv.org/pdf/2003.04117v2.pdf"}
      ]
    },
    {
      date: "2023-11-01",
      label: "2023",
      title: "Collaboration: Shared and improved slap fingerprint segmentation system with U.S. Department of Homeland Security (DHS)",
      desc: "",
      links: []
    },
    {
      date: "2023-10-01",
      label: "2023",
      title: "Presented final report: Robust Contactless Fingerprint Processing Tool (CITeR Conference)",
      desc: "Martigny, Switzerland.",
      links: []
    },
    {
      date: "2023-10-01",
      label: "2023",
      title: "Attended EAB & CITeR Biometrics Workshop (Idiap)",
      desc: "Topics included synthetic fingerprints, contactless fingerprints, template security, and explainable AI.",
      links: []
    },
    {
      date: "2023-10-01",
      label: "2023",
      title: "Showcased work: Detection of over-rotated biometric images and incorrect labeling of fingerprints (EAB & CITeR Biometrics Workshop)",
      desc: "Martigny, Switzerland.",
      links: []
    },
    {
      date: "2023-10-01",
      label: "2023",
      title: "Showcased progress: Explainable face and fingerprint matching via improved localization (CITeR Biometrics Workshop)",
      desc: "Martigny, Switzerland.",
      links: []
    },
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
      links: [{label:"ProQuest", url:"https://www.proquest.com/openview/8ab807d3f9a5f7dd9507accb1e9ed783/1?cbl=18750&diss=y&pq-origsite=gscholar"}]
    },
    {
      date: "2023-01-01",
      label: "2023",
      title: "Webinar: Fingerprint segmentation (CITeR)",
      desc: "Presented fingerprint segmentation work in a webinar hosted by CITeR.",
      links: [{label:"CITeR", url:"https://citer.clarkson.edu/"}]
    },
    {
      date: "2023-01-01",
      label: "2023",
      title: "Collaboration: Fingerprint segmentation system shared with UK government biometric security department",
      desc: "",
      links: []
    },

    // ---------------- 2022 ----------------
    {
      date: "2022-01-01",
      label: "2022",
      title: "Book chapter published: Efficient Deployment of Deep Learning Models on Autonomous Robots in the ROS Environment",
      desc: "Published in Deep Learning Applications, Vol. 3 (Springer Singapore).",
      links: [{label:"Springer", url:"https://link.springer.com/chapter/10.1007/978-981-16-3357-7_9"}]
    },
    {
      date: "2022-01-01",
      label: "2022",
      title: "Grant awarded (CITeR): Explainable Face and Fingerprint Matching via Improved Localization",
      desc: "",
      links: [{label:"CITeR", url:"https://citer.clarkson.edu/"}]
    },
    {
      date: "2022-01-01",
      label: "2022",
      title: "Grant awarded (CITeR): Robust Contactless Fingerprint Processing Tool",
      desc: "",
      links: [{label:"CITeR", url:"https://citer.clarkson.edu/"}]
    },
    {
      date: "2022-01-01",
      label: "2022",
      title: "CITeR conference talk: Age-invariant contact-based fingerprint segmentation and over-rotated object detection",
      desc: "Hosted by Michigan State University.",
      links: []
    },
    {
      date: "2022-01-01",
      label: "2022",
      title: "CITeR progress showcase: Robust Contactless Fingerprint Processing Tool",
      desc: "Hosted by Michigan State University.",
      links: []
    },
    {
      date: "2022-01-01",
      label: "2022",
      title: "CITeR conference talk: Age-invariant contact-based fingerprint segmentation and over-rotated object detection",
      desc: "Hosted by the University at Buffalo.",
      links: []
    },

    // ---------------- 2021 ----------------
    {
      date: "2021-01-01",
      label: "2021",
      title: "Paper accepted: Deep Slap Fingerprint Segmentation for Juveniles and Adults",
      desc: "Accepted at IEEE ICCE-Asia 2021.",
      links: [
        {label:"DOI", url:"https://doi.org/10.1109/ICCE-Asia53811.2021.9641980"},
        {label:"arXiv", url:"https://arxiv.org/abs/2110.04067"}
      ]
    },
    {
      date: "2021-01-01",
      label: "2021",
      title: "Paper accepted: Machine Learning at the Network Edge: A Survey",
      desc: "Accepted in ACM Computing Surveys (CSUR).",
      links: [
        {label:"ACM", url:"https://dl.acm.org/doi/10.1145/3469029"},
        {label:"arXiv", url:"https://arxiv.org/abs/1908.00080"}
      ]
    },

    // ---------------- 2020 ----------------
    {
      date: "2020-01-01",
      label: "2020",
      title: "Poster accepted: Hazard Detection in Supermarkets using Deep Learning on the Edge",
      desc: "Accepted at USENIX HotEdge 2020 (poster).",
      links: [
        {label:"Poster", url:"https://www.usenix.org/system/files/hotedge20_poster_murshed_0.pdf"},
        {label:"arXiv", url:"https://arxiv.org/abs/2003.04116"}
      ]
    },
    {
      date: "2020-01-01",
      label: "2020",
      title: "Paper accepted: Fast Resilient-Aware Data Layout Organization for Resistive Computing Systems",
      desc: "Accepted at IEEE ISVLSI 2020.",
      links: [{label:"IEEE", url:"https://xplorestaging.ieee.org/document/9154977/"}]
    },
    {
      date: "2020-01-01",
      label: "2020",
      title: "Paper published: Recent advances in deep learning for object detection",
      desc: "Published in Neurocomputing.",
      links: [{label:"Article", url:"https://www.sciencedirect.com/science/article/pii/S0925231220301430"}]
    },
    {
      date: "2020-01-01",
      label: "2020",
      title: "Paper accepted: FlexServe: Deployment of PyTorch Models as Flexible REST Endpoints",
      desc: "Accepted at USENIX OpML 2020.",
      links: [
        {label:"Paper", url:"https://www.usenix.org/system/files/opml20_paper_verenich.pdf"},
        {label:"arXiv", url:"https://arxiv.org/abs/2003.01538"}
      ]
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
