document.addEventListener("DOMContentLoaded", () => {
    try {
        injectNavbar();
    } catch (e) {
        console.error("Navbar failed to inject:", e);
    }
});

//inject navbar
function injectNavbar() {
    const navElement = document.querySelector("nav");
    if (!navElement) return; 

    const path = window.location.pathname;
    
    let segments = path.split('/').filter(s => s.length > 0);
    
    if (segments[0] === 'kurone741.github.io') {
        segments.shift();
    }

    if (segments.length > 0 && segments[segments.length - 1].includes('.html')) {
        segments.pop();
    }

    const depth = segments.length;
    const prefix = "../".repeat(depth);

    navElement.innerHTML = `
         <aside class="navbar">
	<a href="/">home</a><br>
	<a href="/logs">logs</a><br>
	<a href="/projects">projects</a><br>
	<a href="/photos">photos</a><br>
	<a href="/music">music</a><br>
        <a href="/links">links</a>
</aside>
    `;
}
	const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/gh/MarketingPipeline/Markdown-Tag/markdown-tag.js";
document.head.appendChild(script);


