// ==========================================
// global
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    try {
        injectNavbar();
    } catch (e) {
        console.error("Navbar failed to inject:", e);
    }
});

function injectNavbar() {
    const navElement = document.querySelector("nav");
    if (!navElement) return; 

    const path = window.location.pathname;
    
    let segments = path.split('/').filter(s => s.length > 0);
    
    if (segments[0] === 'liangnb07.github.io') {
        segments.shift();
    }

    if (segments.length > 0 && segments[segments.length - 1].includes('.html')) {
        segments.pop();
    }

    const depth = segments.length;
    const prefix = "../".repeat(depth);

    // Injection
    navElement.innerHTML = `
         <aside class="left-sidebar">
    <div class="panel">
        <h2>nav</h2>
	
	<a href="/">Home</a><br>
	<a href="/about">About</a><br>
	<a href="/blog">Blog</a><br>
	<a href="/projects">Projects</a><br>
	<a href="/photos">Photography</a><br>
	<a href="/music">Music</a><br>
        <a href="/links">Links</a>
    </div>
</aside>
    `;
}
	const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/gh/MarketingPipeline/Markdown-Tag/markdown-tag.js";
document.head.appendChild(script);

