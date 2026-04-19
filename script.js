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