/* Talks data + renderer (same pattern as news.js) */

const TALKS = [
  // Invited talks
  {
    date: "2024-04-01",
    dateText: "2024",
    title: "Challenges and Opportunities of Generative AI in Higher Education – Practical Experience",
    venue: "AI in Higher Education Conference · Lakeshore Technical College",
    type: "invited",
    tags: ["Generative AI", "Higher Education"],
    note: "Presented with Dr. Tanim Ahsan on integrating generative AI tools in academic settings, addressing implementation challenges and pedagogical opportunities."
  },
  {
    date: "2023-06-01",
    dateText: "2023",
    title: "Contactless Fingerprint Segmentation and Recognition",
    venue: "CITeR Webinar Series",
    type: "invited",
    tags: ["Biometrics", "Contactless", "Fingerprint"],
    note: "Presented research findings on contactless fingerprint processing systems to government and industry stakeholders (DHS, Public Safety Canada, Home Office UK)."
  },
  {
    date: "2022-06-01",
    dateText: "2022",
    title: "Deep Learning-Based Fingerprint Segmentation Systems",
    venue: "CITeR Webinar Series",
    type: "invited",
    tags: ["Deep Learning", "Biometrics", "Segmentation"],
    note: "Demonstrated fingerprint segmentation approaches using deep learning, including results from DHS-funded research."
  },

  // Proposal presentations
  {
    date: "2022-05-01",
    dateText: "2022",
    title: "Robust Contactless Fingerprint Processing Tool",
    venue: "CITeR Annual Meeting",
    type: "proposal",
    tags: ["Proposal", "Contactless", "CITeR"],
    note: "Presented research proposal to funding organizations, including DHS, Public Safety Canada, Home Office UK, and Qualcomm."
  },
  {
    date: "2022-01-01",
    dateText: "2021–2022",
    title: "Fingerprint Image Segmentation Using Deep Learning",
    venue: "CITeR Research Showcases",
    type: "proposal",
    tags: ["Proposal", "Segmentation", "CITeR"],
    note: "Presented proposals and progress updates for contact-based and contactless segmentation systems to federal and industry stakeholders."
  },

  // Conference presentations
  {
    date: "2021-10-01",
    dateText: "2021",
    title: "Deep Slap Fingerprint Segmentation for Juveniles and Adults",
    venue: "IEEE ICCE–Asia",
    type: "conference",
    tags: ["Fingerprints", "Segmentation", "IEEE"]
  },
  {
    date: "2020-12-01",
    dateText: "2020",
    title: "Resource-aware On-device Deep Learning for Supermarket Hazard Detection",
    venue: "IEEE ICMLA",
    type: "conference",
    tags: ["Edge AI", "On-device", "IEEE"]
  },
  {
    date: "2020-08-01",
    dateText: "2020",
    title: "Fast Resilient-Aware Data Layout Organization for Resistive Computing Systems",
    venue: "IEEE ISVLSI",
    type: "conference",
    tags: ["Systems", "VLSI", "IEEE"]
  },
  {
    date: "2020-06-01",
    dateText: "2020",
    title: "Hazard Detection in Supermarkets Using Deep Learning on the Edge",
    venue: "USENIX HotEdge",
    type: "conference",
    tags: ["Edge AI", "USENIX"]
  }
];

function esc(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fmtDate(d) {
  // For sorting only; display uses dateText.
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return 0;
  return dt.getTime();
}

function renderTalkItem(t) {
  const tagsHtml = (t.tags || [])
    .map(x => `<span class="badge">${esc(x)}</span>`)
    .join("");

  const noteHtml = t.note ? `<div class="desc">${esc(t.note)}</div>` : "";

  return `
    <div class="list-item">
      <div class="date">${esc(t.dateText || "")} · ${esc((t.type || "").toUpperCase())}</div>
      <div class="title">${esc(t.title)}</div>
      <div class="desc">${esc(t.venue)}</div>
      ${noteHtml}
      ${tagsHtml ? `<div class="meta">${tagsHtml}</div>` : ""}
    </div>
  `;
}

(function initTalks() {
  const root = document.querySelector("[data-talks]");
  if (!root) return;

  const initial = Number(root.getAttribute("data-initial")) || 12;

  let state = {
    sort: "newest",
    filter: "all",
    visible: initial
  };

  function getFilteredSorted() {
    let items = TALKS.slice();

    if (state.filter !== "all") {
      items = items.filter(x => (x.type || "").toLowerCase() === state.filter);
    }

    items.sort((a, b) => {
      const da = fmtDate(a.date);
      const db = fmtDate(b.date);
      return state.sort === "oldest" ? da - db : db - da;
    });

    return items;
  }

  function render() {
    const items = getFilteredSorted();
    const shown = items.slice(0, state.visible);
    root.innerHTML = shown.map(renderTalkItem).join("");

    const loadBtn = document.querySelector("[data-load-more]");
    if (loadBtn) {
      loadBtn.style.display = (state.visible < items.length) ? "inline-flex" : "none";
    }
  }

  // Sort buttons (reuse the same data-sort pattern as your news page)
  document.querySelectorAll("[data-sort]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.sort = btn.getAttribute("data-sort") || "newest";
      state.visible = initial;
      render();
    });
  });

  // Filters
  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.filter = btn.getAttribute("data-filter") || "all";
      state.visible = initial;
      render();
    });
  });

  // Load more
  const loadBtn = document.querySelector("[data-load-more]");
  if (loadBtn) {
    loadBtn.addEventListener("click", () => {
      state.visible += initial;
      render();
    });
  }

  render();
})();
