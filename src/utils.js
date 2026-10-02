
/* =========================
   GENERAL
========================= */

export const TABS = [
    'var(--amber)',
    'var(--leaf)',
    'var(--rose)'
];

export function hash(str) {

    let h = 0;

    for (let i = 0; i < str.length; i++) {
        h = (h * 31 + str.charCodeAt(i)) | 0;
    }

    return Math.abs(h);
}

export function timeAgo(ts) {

    const s = Math.max(
        1,
        Math.floor((Date.now() - ts) / 1000)
    );

    if (s < 60) {
        return s + 's ago';
    }

    const m = Math.floor(s / 60);

    if (m < 60) {
        return m + 'm ago';
    }

    const h = Math.floor(m / 60);

    if (h < 24) {
        return h + 'h ago';
    }

    return Math.floor(h / 24) + 'd ago';
}
