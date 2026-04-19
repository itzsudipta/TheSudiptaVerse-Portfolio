const lines = [
    "Full-Stack Developer",
    "Open Source Contributor",
    "Final Year CS @ NiT"
];
let li = 0, ci = 0, deleting = false;
const el = document.getElementById('typer');
function tick() {
    const word = lines[li];
    if (!deleting) {
        el.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; setTimeout(tick, 1800); return; }
    } else {
        el.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; li = (li + 1) % lines.length; setTimeout(tick, 400); return; }
    }
    setTimeout(tick, deleting ? 40 : 75);
}
tick();

// Mobile nav dropdown (hamburger)
(() => {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    const root = document.documentElement;

    const setOpen = (open) => {
        root.classList.toggle('nav-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        setOpen(!root.classList.contains('nav-open'));
    });

    menu.addEventListener('click', (e) => {
        const target = e.target;
        if (target instanceof Element && target.closest('a')) setOpen(false);
    });

    document.addEventListener('click', (e) => {
        if (!root.classList.contains('nav-open')) return;
        const target = e.target;
        if (!(target instanceof Node)) return;
        if (toggle.contains(target) || menu.contains(target)) return;
        setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setOpen(false);
    });

    const mql = window.matchMedia('(max-width: 620px)');
    const handleChange = () => {
        if (!mql.matches) setOpen(false);
    };
    if (typeof mql.addEventListener === 'function') mql.addEventListener('change', handleChange);
    else if (typeof mql.addListener === 'function') mql.addListener(handleChange);
})();
