document.addEventListener("DOMContentLoaded", function() {
  const footer = document.createElement("footer");
  const horizontalLine = document.createElement("hr");
  horizontalLine.style.marginBottom = "10px"; // optional
  footer.style.textAlign = "center";
  footer.style.fontWeight = "normal";
  footer.innerHTML = `Copyright &copy; M. G. Sarwar Murshed. All rights reserved.`;
  document.body.appendChild(horizontalLine);
  document.body.appendChild(footer);
});