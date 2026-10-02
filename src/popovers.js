import { state } from './state.js';
import { emojiBtn, emojiPicker, gifAttach, gifBtn, gifChip, gifChipImg, gifPopover, gifQuery, gifRemove, msgInput } from './dom.js';

/* =========================
   POPOVERS
========================= */

export function closePopovers() {

    emojiPicker.hidden = true;

    gifPopover.hidden = true;
}

/* Emoji button */

emojiBtn.addEventListener(
    'click',
    (e) => {

        e.stopPropagation();

        const willOpen =
            emojiPicker.hidden;

        closePopovers();

        emojiPicker.hidden =
            !willOpen;

    }
);

/* Insert selected emoji */

emojiPicker.addEventListener(
    'click',
    (e) => {

        if (
            e.target.tagName !== 'BUTTON'
        ) {
            return;
        }

        const emoji =
            e.target.textContent;

        const start =
            msgInput.selectionStart;

        const end =
            msgInput.selectionEnd;

        const val =
            msgInput.value;

        const next =
            val.slice(0, start) +
            emoji +
            val.slice(end);

        if (next.length <= 220) {

            msgInput.value =
                next;

            const pos =
                start + emoji.length;

            msgInput.setSelectionRange(
                pos,
                pos
            );

            msgInput.dispatchEvent(
                new Event('input')
            );
        }

        msgInput.focus();

    }
);

/* =========================
   GIF BUTTON
========================= */

gifBtn.addEventListener(
    'click',
    (e) => {

        e.stopPropagation();

        const willOpen =
            gifPopover.hidden;

        closePopovers();

        gifPopover.hidden =
            !willOpen;

        if (!gifPopover.hidden) {
            gifQuery.focus();
        }

    }
);

gifAttach.addEventListener(
    'click',
    () => {

        const url =
            gifQuery.value.trim();

        if (!url) {
            return;
        }

        state.attachedGif = url;

        gifChipImg.src =
            url;

        gifChip.hidden =
            false;

        gifQuery.value = '';

        gifPopover.hidden =
            true;

    }
);

gifRemove.addEventListener(
    'click',
    () => {

        state.attachedGif = null;

        gifChip.hidden =
            true;

        gifChipImg.src = '';

    }
);

/* Close popovers when clicking outside */

document.addEventListener(
    'click',
    (e) => {

        if (
            !emojiPicker.hidden &&
            !emojiPicker.contains(e.target) &&
            e.target !== emojiBtn
        ) {
            emojiPicker.hidden = true;
        }

        if (
            !gifPopover.hidden &&
            !gifPopover.contains(e.target) &&
            e.target !== gifBtn
        ) {
            gifPopover.hidden = true;
        }

    }
);
