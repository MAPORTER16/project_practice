# Team Directory

A searchable team directory for Ops. Fetches the current team roster from a
live API, displays each person's name, email, and company, and lets you find
someone in seconds by typing part of their name or email — no more digging
through a stale shared spreadsheet.

Built with React, TypeScript, and Vite.

## Features

- Fetches users from an API on load, with distinct **loading**, **error**,
  and **empty** states — the page always explains what's happening, never a
  silent blank screen
- Live search by name or email, case-insensitive, with a separate "no
  matches" message when a search comes up empty
- Accessible: a real `<label>` on the search input, semantic `<ul>`/`<li>`
  markup, `mailto:` links on every email, and full keyboard navigation

## Development

```sh
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

## Screenshot

![Team Directory screenshot](./screenshot.png)
