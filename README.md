# The Poster Wall 📌

A live, shared community message board — pin a note, see everyone else's land in real time. No framework, no build step, just HTML/CSS/JS backed by Supabase.

## Website Check it out

## Features

- Real-time shared wall — posts sync live across everyone viewing the page
- Neubrutalist styling (thick borders, hard shadows, amber accent)
- Fully responsive, fluid typography from phone to desktop
- Shuffle toggle, pin-burst animation, live/preview status indicator
- Falls back to a local-only preview mode if Supabase isn't configured

## Project structure

```
poster-wall/
├── poster-wall.html     # the whole app — markup, CSS, and JS
├── config.js            # your Supabase URL + key (not committed as a template — fill in and commit for real)
├── config.example.js    # template to copy from
└── .gitignore           # excludes .env, for if you add a secret key later
```


## Tech

Vanilla HTML/CSS/JS, [Supabase](https://supabase.com) (Postgres + Realtime), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) via Google Fonts.