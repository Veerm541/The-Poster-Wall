import { state } from './state.js';
import { shuffleBtn, statusPill, statusText, wallEl } from './dom.js';
import { TABS, hash, timeAgo } from './utils.js';

/* =========================
   POST ORDER
========================= */

export function ordered() {

    if (!state.shuffled) {
        return state.posts;
    }

    const arr =
        state.posts.slice();

    for (
        let i = arr.length - 1;
        i > 0;
        i--
    ) {

        const j =
            hash(arr[i].id + i) %
            (i + 1);

        [
            arr[i],
            arr[j]
        ] = [
                arr[j],
                arr[i]
            ];

    }

    return arr;
}

/* =========================
   RENDER POSTS
========================= */

export function render() {

    const list =
        ordered();

    if (!list.length) {

        wallEl.innerHTML =
            `
    <div class="empty">
      the board's empty. pin the first note.
    </div>
  `;

        return;
    }

    wallEl.innerHTML =
        list.map(p => {

            const h =
                hash(p.id);

            const tab =
                TABS[h % TABS.length];

            const rot =
                ((h % 5) - 2) * 0.6;

            const name =
                (p.author || 'anonymous')
                    .replace(/</g, '&lt;');

            const text =
                (p.text || '')
                    .replace(/</g, '&lt;');

            const gifHtml =
                p.gif
                    ? `
        <img
          class="noteGif"
          src="${p.gif.replace(/"/g, '&quot;')}"
          alt=""
          loading="lazy"
          onerror="this.remove()"
        >
      `
                    : '';

            return `
    <div
      class="note"
      style="transform:rotate(${rot}deg);"
    >

      <div
        class="tab"
        style="background:${tab};"
      ></div>

      ${gifHtml}

      ${text
                    ? `<div class="msg">${text}</div>`
                    : ''
                }

      <div class="meta">

        <span>
          ${name}
        </span>

        <span>
          ${timeAgo(
                    p.ts || Date.now()
                )}
        </span>

      </div>

    </div>
  `;

        }).join('');
}

/* =========================
   LIVE STATUS
========================= */

export function setStatus(live) {

    state.liveMode = live;

    statusPill.classList.toggle(
        'off',
        !live
    );

    statusText.textContent =
        live
            ? 'live'
            : 'preview';
}

/* =========================
   SHUFFLE
========================= */

shuffleBtn.addEventListener(
    'click',
    () => {

        state.shuffled = !state.shuffled;

        shuffleBtn.textContent =
            state.shuffled
                ? 'newest'
                : 'shuffle';

        render();

    }
);
