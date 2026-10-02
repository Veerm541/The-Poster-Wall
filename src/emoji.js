import { emojiPicker } from './dom.js';

/* =========================
   EMOJIS
========================= */

export const EMOJIS = [
    '😀',
    '😂',
    '😍',
    '😎',
    '🥳',
    '😢',
    '😡',
    '👍',
    '👎',
    '❤️',
    '🔥',
    '✨',
    '🎉',
    '🥀',
    '👀',
    '💀',
    '🤔',
    '😴',
    '🙏',
    '💯',
    '😭',
    '😅',
    '🤯',
    '😔'
];

emojiPicker.innerHTML =
    EMOJIS
        .map(
            e => `<button type="button">${e}</button>`
        )
        .join('');
