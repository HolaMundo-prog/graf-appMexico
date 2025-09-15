const baseColors = {
    green: '#006847',
    white: '#ffffff',
    red: '#ce1126'
}


const refs = {
    greenRange: document.getElementById('greenRange'),
    whiteRange: document.getElementById('whiteRange'),
    redRange: document.getElementById('redRange'),
    greenVal: document.getElementById('greenVal'),
    whiteVal: document.getElementById('whiteVal'),
    redVal: document.getElementById('redVal'),
    resetBtn: document.getElementById('resetBtn'),
}


function hexToRgb(hex) {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    if (h.length === 6) {
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }
    return [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)];
}
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
function applyIntensity(hex, percent) {
    const [r, g, b] = hexToRgb(hex);
    const hsl = rgbToHsl(r, g, b);
    const factor = percent / 100;
    const newL = Math.max(0, Math.min(100, Math.round(hsl.l * factor)));
    return `hsl(${hsl.h} ${hsl.s}% ${newL}%)`;
}


function updateFlagColors() {
    const g = parseInt(refs.greenRange.value, 10);
    const w = parseInt(refs.whiteRange.value, 10);
    const r = parseInt(refs.redRange.value, 10);


    refs.greenVal.value = g + '%';
    refs.whiteVal.value = w + '%';
    refs.redVal.value = r + '%';


    const gcolor = applyIntensity(baseColors.green, g);
    const wcolor = applyIntensity(baseColors.white, w);
    const rcolor = applyIntensity(baseColors.red, r);


    document.documentElement.style.setProperty('--green', gcolor);
    document.documentElement.style.setProperty('--white', wcolor);
    document.documentElement.style.setProperty('--red', rcolor);
}


[refs.greenRange, refs.whiteRange, refs.redRange].forEach(el => {
    el.addEventListener('input', updateFlagColors);
});


refs.resetBtn.addEventListener('click', () => {
    refs.greenRange.value = 100;
    refs.whiteRange.value = 100;
    refs.redRange.value = 100;
    updateFlagColors();
});


updateFlagColors();