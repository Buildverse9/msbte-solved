const { JSDOM } = require('jsdom');
const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const dataJs = fs.readFileSync('data.js', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');

const html = indexHtml.replace('<script src="data.js"></script>', '').replace('<script src="app.js"></script>', '');

const dom = new JSDOM(html, { 
  runScripts: "dangerously", 
  url: "http://localhost/#home"
});

// Mock localStorage
const localStorageMock = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};
dom.window.localStorage = localStorageMock;

// Inject data.js and app.js
const script1 = dom.window.document.createElement("script");
script1.textContent = dataJs;
dom.window.document.body.appendChild(script1);

const script2 = dom.window.document.createElement("script");
script2.textContent = appJs;
dom.window.document.body.appendChild(script2);

dom.window.document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded fired in JSDOM!");
});

// We need to wait for scripts to execute. Wait, if we append them they execute synchronously.
// Let's trigger DOMContentLoaded manually if it didn't fire.
const event = dom.window.document.createEvent('Event');
event.initEvent('DOMContentLoaded', true, true);
dom.window.document.dispatchEvent(event);

// Check if buttons work
try {
  const themeBtn = dom.window.document.getElementById('theme-toggle');
  if (!themeBtn) console.error("Theme btn not found!");
  console.log("Before click, theme:", dom.window.document.documentElement.getAttribute("data-theme"));
  themeBtn.click();
  console.log("After click, theme:", dom.window.document.documentElement.getAttribute("data-theme"));
} catch (e) {
  console.error("Error clicking theme button:", e);
}
