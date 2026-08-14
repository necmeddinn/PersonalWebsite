const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('proje-plakatanima.html', 'utf8');
const script = fs.readFileSync('js/script.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;

// Append the script manually since jsdom doesn't execute external scripts automatically
const scriptEl = document.createElement('script');
scriptEl.textContent = script;
document.body.appendChild(scriptEl);

// Wait a bit for DOMContentLoaded (JSDOM handles it)
setTimeout(() => {
    const gallery = document.querySelector('.gallery-container');
    const wrapper = gallery.querySelector('.gallery-wrapper');
    const nextBtn = gallery.querySelector('.gallery-nav.next');
    
    console.log("Initial transform:", wrapper.style.transform);
    nextBtn.click();
    console.log("Transform after 1 click:", wrapper.style.transform);
    nextBtn.click();
    console.log("Transform after 2 clicks:", wrapper.style.transform);
}, 100);
