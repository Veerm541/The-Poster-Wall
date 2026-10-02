# The Poster Wall 📌

A live, shared community message board — pin a note, see everyone else's land in real time. No framework, just JS built with Vite backed by Supabase.

## Website Check it out
https://freedom-wall-pin.onrender.com/

## Features

- Real-time shared wall — posts sync live across everyone viewing the page
- Neubrutalist styling (thick borders, hard shadows, amber accent)
- Fully responsive, fluid typography from phone to desktop
- Shuffle toggle, pin-burst animation, live/preview status indicator
- Falls back to a local-only preview mode if Supabase isn't configured


## Setup

```
npm install
cp .env.example .env     # then fill in your keys
npm run dev              # local dev server
npm run build            # outputs to dist/
```

On Render: create a **Static Site**, build command `npm install && npm run build`, publish directory `dist`, and add the three `VITE_*` variables under Environment.

## Tech

Vanilla JS + [Vite](https://vitejs.dev), [Supabase](https://supabase.com) (Postgres + Realtime), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) via Google Fonts.
