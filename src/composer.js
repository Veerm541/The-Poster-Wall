import { state } from './state.js';
import { countEl, errMsg, form, gifChip, gifChipImg, msgInput, nameInput, pinBtn } from './dom.js';
import { render } from './wall.js';

/* =========================
   CHARACTER COUNTER
========================= */

msgInput.addEventListener(
    'input',
    () => {

        const left =
            220 -
            msgInput.value.length;

        countEl.textContent =
            left + ' left';

        countEl.classList.toggle(
            'warn',
            left < 20
        );

    }
);

/* =========================
   PIN ANIMATION
========================= */

export function burst() {

    const rect =
        form.getBoundingClientRect();

    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const s =
            document.createElement('span');

        s.className =
            'spk';

        s.textContent =
            [
                '✨',
                '⭐',
                '●'
            ][i % 3];

        s.style.left =
            (
                40 +
                Math.random() * 20
            ) + '%';

        s.style.animationDelay =
            (i * 30) + 'ms';

        form.appendChild(s);

        setTimeout(
            () => s.remove(),
            700
        );

    }
}

/* =========================
   SUBMIT POST
========================= */

form.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        const text =
            msgInput.value.trim();

        if (
            !text &&
            !state.attachedGif
        ) {
            return;
        }

        errMsg.hidden = true;

        pinBtn.disabled = true;

        const author =
            nameInput.value.trim();

        const gif =
            state.attachedGif;

        try {

            if (
                state.liveMode &&
                state.sb
            ) {

                const {
                    error
                } =
                    await state.sb
                        .from('messages')
                        .insert({
                            text,
                            author,
                            ts: Date.now(),
                            gif
                        });

                if (error) {
                    throw error;
                }

            } else {

                state.posts.unshift({
                    id:
                        'local-' +
                        Date.now() +
                        Math.random()
                            .toString(36)
                            .slice(2),

                    text,
                    author,
                    ts: Date.now(),
                    gif
                });

                render();

            }

            burst();

            msgInput.value = '';

            countEl.textContent =
                '220 left';

            countEl.classList.remove(
                'warn'
            );

            state.attachedGif = null;

            gifChip.hidden = true;

            gifChipImg.src = '';

        } catch (err) {

            errMsg.textContent =
                "couldn't pin that — try again in a moment.";

            errMsg.hidden = false;

        } finally {

            pinBtn.disabled = false;

        }
    }
);
