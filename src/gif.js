import { GIPHY_API_KEY } from './config.js';
import { state } from './state.js';
import { gifAttach, gifChip, gifChipImg, gifPopover, gifQuery, gifResults } from './dom.js';

/* =========================
   GIF
========================= */

export let gifTimer = null;

export const GIF_SEARCH_ENABLED =
    typeof GIPHY_API_KEY !== 'undefined' &&
    GIPHY_API_KEY &&
    !GIPHY_API_KEY.startsWith('YOUR_');

if (GIF_SEARCH_ENABLED) {

    gifQuery.placeholder = 'search GIFs…';

    gifAttach.hidden = true;

} else {

    gifQuery.placeholder =
        'paste a .gif link…';

}

export async function searchGiphy(q) {

    if (!q) {
        gifResults.innerHTML = '';
        return;
    }

    try {

        const res = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${encodeURIComponent(
                GIPHY_API_KEY
            )}&q=${encodeURIComponent(
                q
            )}&limit=12&rating=pg-13`
        );

        const json = await res.json();

        const items = json.data || [];

        gifResults.innerHTML = items.length
            ? items.map(g => {

                const thumb = (
                    g.images.fixed_width_small ||
                    g.images.preview_gif ||
                    g.images.original
                ).url;

                const full = (
                    g.images.fixed_width ||
                    g.images.original
                ).url;

                return `
        <button
          type="button"
          class="gifThumb"
          data-full="${full.replace(/"/g, '&quot;')}"
        >
          <img
            src="${thumb.replace(/"/g, '&quot;')}"
            alt=""
          >
        </button>
      `;

            }).join('')

            : '<div class="gifMsg">no results</div>';

    } catch (e) {

        gifResults.innerHTML =
            '<div class="gifMsg">search failed — try again</div>';

    }
}

if (GIF_SEARCH_ENABLED) {

    gifQuery.addEventListener(
        'input',
        () => {

            clearTimeout(gifTimer);

            gifTimer = setTimeout(
                () => searchGiphy(
                    gifQuery.value.trim()
                ),
                400
            );

        }
    );

    gifResults.addEventListener(
        'click',
        (e) => {

            const btn =
                e.target.closest('.gifThumb');

            if (!btn) {
                return;
            }

            state.attachedGif =
                btn.dataset.full;

            gifChipImg.src =
                state.attachedGif;

            gifChip.hidden =
                false;

            gifPopover.hidden =
                true;

            gifQuery.value = '';

            gifResults.innerHTML = '';

        }
    );
}
