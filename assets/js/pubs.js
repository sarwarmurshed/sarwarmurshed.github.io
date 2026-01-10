/* Publications: year grouping + type filter + search */
(function(){
  const mount = document.querySelector('[data-pubs]');
  if(!mount) return;

  const yearSelect = document.querySelector('[data-year]');
  const typeSelect = document.querySelector('[data-type]');
  const searchBox  = document.querySelector('[data-search]');

  const PUBS = [
    // 2025
    {year: 2025, type:"Journal", 
	title:"Conditional Synthetic Live and Spoof Fingerprint Generation", 
	authors:"Syed Konain Abbas, Sandip Purnapatra, M. G. Sarwar Murshed, Conor Miller-Lynch, Lambert Igene, Soumyabrata Dey, Stephanie Schuckers, Faraz Hussain", 
	venue:"IET Biometrics", 
	links: [
        {label:"DOI", url:"https://doi.org/10.1049/bme2/7736489"},
        {label:"arXiv", url:"https://arxiv.org/abs/2510.17035"}
      ]
	},
    {year: 2025, type:"Conference", title:"Deep Learning-Based Approaches for Contactless Fingerprints Segmentation and Extraction", 
	authors:"M. G. Sarwar Murshed, Syed Konain Abbas, Sandip Purnapatra, Daqing Hou, Faraz Hussain", 
	venue:"BIOSIG 2025", 
	links:[{label:"arXiv", url:"https://arxiv.org/abs/2311.15163"}]
	},
    {year: 2025, type:"Journal", title:"Explainable Face Recognition via Improved Localization", authors:"Rashik Shadman, Daqing Hou, Faraz Hussain, M. G. Sarwar Murshed", venue:"Electronics 14(14):2745", links:[{label:"DOI", url:"https://doi.org/10.3390/electronics14142745"}]},
    // 2024
    {year: 2024, type:"Journal", title:"Deep Age-Invariant Fingerprint Segmentation System", authors:"M. G. Sarwar Murshed, Keivan Bahmani, Stephanie Schuckers, Faraz Hussain", venue:"IEEE Transactions on Biometrics, Behavior, and Identity Science (T-BIOM)", links:[{label:"DOI", url:"https://doi.org/10.1109/TBIOM.2024.3506926"},{label:"arXiv", url:"https://arxiv.org/abs/2303.03341"}]},
    // 2023
    {year: 2023, type:"Conference", title:"The Utility of Feature Reuse: Transfer Learning in Data-Starved Regimes", authors:"Rashik Shadman, M. G. Sarwar Murshed, Edward Verenich, Alvaro Velasquez, Faraz Hussain", venue:"CSCI 2023", links:[{label:"DOI", url:"https://doi.org/10.1109/CSCI62032.2023.00013"}]},
    {year: 2023, type:"Conference", title:"A vision-based system for road crack detection using hybrid deep learning architectures", authors:"M. G. Sarwar Murshed, S. M. Safayet Hossain, Aksel Seitllari, Kibria K. Roman", venue:"ASCE ICTD 2023", links:[]},
    // 2021
    {year: 2021, type:"Conference", title:"Deep Slap Fingerprint Segmentation for Juveniles and Adults", authors:"M. G. Sarwar Murshed, R. Kline, K. Bahmani, F. Hussain, S. Schuckers", venue:"IEEE ICCE-Asia 2021", links:[{label:"DOI", url:"https://doi.org/10.1109/ICCE-Asia53811.2021.9641980"},{label:"arXiv", url:"https://arxiv.org/abs/2110.04067"}]},
    {year: 2021, type:"Journal", title:"Machine Learning at the Network Edge: A Survey", authors:"M. G. Sarwar Murshed, C. Murphy, Daqing Hou, Nazar Khan, Ganesh Ananthanarayanan, Faraz Hussain", venue:"ACM Computing Surveys 54(8):170", links:[{label:"DOI", url:"https://doi.org/10.1145/3469029"},{label:"arXiv", url:"https://arxiv.org/abs/1908.00080"}]},
    // 2021 book chapter
    {year: 2021, type:"Book Chapter", title:"Efficient deployment of deep learning models on autonomous robots in the ROS environment", authors:"M. G. Sarwar Murshed, James J. Carroll, Nazar Khan, Faraz Hussain", venue:"Springer (AISC)", links:[{label:"DOI", url:"https://doi.org/10.1007/978-981-16-3357-7_9"}]},
    {year: 2021, type:"Book Chapter", title:"Mitigating the Class Overlap Problem in Discriminative Localization: COVID-19 and Pneumonia Case Study", authors:"Edward Verenich, M. G. Sarwar Murshed, Nazar Khan, Alvaro Velasquez, Faraz Hussain", venue:"Springer (XAI DTCS)", links:[{label:"DOI", url:"https://doi.org/10.1007/978-3-030-76409-8_7"}]},
    // 2020
    {year: 2020, type:"Conference", title:"Resource-aware On-device Deep Learning for Supermarket Hazard Detection", authors:"M. G. Sarwar Murshed, James J. Carroll, Nazar Khan, Faraz Hussain", venue:"IEEE ICMLA 2020", links:[{label:"DOI", url:"https://doi.org/10.1109/ICMLA51294.2020.00142"}]},
    {year: 2020, type:"Conference", title:"Fast Resilient-Aware Data Layout Organization for Resistive Computing Systems", authors:"Baogang Zhang, M. G. Sarwar Murshed, Faraz Hussain, Rickard Ewetz", venue:"IEEE ISVLSI 2020", links:[{label:"DOI", url:"https://ieeexplore.ieee.org/document/9154977"}]},
    {year: 2020, type:"Conference", title:"FlexServe: Deployment of PyTorch Models as Flexible REST Endpoints", authors:"Edward Verenich, Alvaro Velasquez, M. G. Sarwar Murshed, Faraz Hussain", venue:"USENIX OpML 2020", links:[{label:"USENIX OpML", url:"https://www.usenix.org/conference/opml20/presentation/verenich"}]},
    {year: 2020, type:"Poster", title:"Hazard Detection in Supermarkets using Deep Learning on the Edge", authors:"M. G. Sarwar Murshed, Edward Verenich, Conrad Gende, James J. Carroll, Nazar Khan, Faraz Hussain", venue:"USENIX HotEdge 2020", links:[{label:"USENIX HotEdge", url:"https://www.usenix.org/conference/hotedge20/presentation/murshed"}]}
  ];

  function uniq(arr){ return [...new Set(arr)]; }

  // Populate year/type controls
  const years = uniq(PUBS.map(p=>p.year)).sort((a,b)=>b-a);
  const types = ["All", ...uniq(PUBS.map(p=>p.type))];

  if(yearSelect){
    yearSelect.innerHTML = `<option value="all">All years</option>` + years.map(y => `<option value="${y}">${y}</option>`).join("");
  }
  if(typeSelect){
    typeSelect.innerHTML = types.map(t => `<option value="${t}">${t}</option>`).join("");
  }

  function matches(p, q){
    if(!q) return true;
    const hay = `${p.title} ${p.authors} ${p.venue}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  }

  function filtered(){
    const year = yearSelect?.value || "all";
    const type = typeSelect?.value || "All";
    const q = searchBox?.value || "";
    return PUBS.filter(p => {
      if(year !== "all" && String(p.year) !== year) return false;
      if(type !== "All" && p.type !== type) return false;
      if(!matches(p, q)) return false;
      return true;
    }).sort((a,b) => b.year - a.year || a.title.localeCompare(b.title));
  }

  function render(){
    const pubs = filtered();
    if(pubs.length === 0){
      mount.innerHTML = `<div class="card"><p class="muted">No publications match your filters.</p></div>`;
      return;
    }

    // group by year
    const groups = pubs.reduce((acc,p) => {
      acc[p.year] = acc[p.year] || [];
      acc[p.year].push(p);
      return acc;
    }, {});

    const yearsSorted = Object.keys(groups).map(Number).sort((a,b)=>b-a);

    mount.innerHTML = yearsSorted.map(y => {
      const items = groups[y].map(p => {
        const links = (p.links || []).map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join(" ");
        return `
          <div class="list-item">
            <div class="date">${p.type}</div>
            <div class="title">${p.title}</div>
            <div class="desc">${p.authors}</div>
            <div class="desc"><span class="muted">${p.venue}</span></div>
            ${links ? `<div class="inline-links">${links}</div>` : ``}
          </div>
        `;
      }).join("");

      return `
        <div style="margin-bottom:14px;">
          <div class="section-title" style="margin-bottom:10px;">
            <h2>${y}</h2>
            <div class="hint">${groups[y].length} item(s)</div>
          </div>
          <div class="list">${items}</div>
        </div>
      `;
    }).join("");
  }

  yearSelect?.addEventListener('change', render);
  typeSelect?.addEventListener('change', render);
  searchBox?.addEventListener('input', render);

  render();
})();
