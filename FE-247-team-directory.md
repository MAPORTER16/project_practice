# FE-247 — Team Directory: searchable user list

| | |
|---|---|
| **Type** | Feature |
| **Priority** | P2 — Medium |
| **Estimate** | 3 points (~2–4 hrs) |
| **Stack** | React + TypeScript + Vite |
| **Reporter** | Ops (via #internal-tools) |
| **Depends on** | None — greenfield page |

---

## Background

Ops currently keeps the team directory in a shared spreadsheet. It goes stale within a week of every new hire, nobody owns it, and last month someone emailed a contractor who left in March.

We already have a `/users` endpoint. Ops doesn't need anything clever — they need a page that's always current and lets them find a person in under five seconds.

## Objective

Build a Team Directory page that fetches users from the API, displays them in a list, and lets the user filter that list by typing a name or email.

**Definition of success:** an Ops teammate lands on the page, types three letters, and finds the person. It never shows them a blank screen without telling them why.

---

## Scope

**In scope**
- One page. Fetch, display, search.
- Loading, error, and empty states.
- Keyboard accessible.

**Out of scope** — do not build these, even if you have time
- Pagination, sorting, or column filters
- Routing to a user detail page
- Editing or adding users
- Backend work of any kind
- Tests (Phase 3 in the roadmap — not this ticket)
- Dark mode, animations, or a component library

> Scope creep is the most common way a 3-point ticket becomes a 13-point ticket. If you think of something good, put it in `LATER.md` and move on. That instinct is being graded here as much as the code.

---

## API

**`GET https://jsonplaceholder.typicode.com/users`**

Returns an array of users. Public, no auth, CORS-enabled.

**Do not take my word for the response shape.** Open that URL in your browser and read the actual JSON. Writing types from a real response instead of from someone's description is a core part of the job — the description is always slightly wrong, including this one.

---

## Tasks

### Task 1 — Scaffold and type the data
**~30 min**

- [ ] Create a Vite + React + TypeScript project.
- [ ] Open the endpoint in your browser. Look at the real response.
- [ ] Define a `User` type in `src/types.ts` covering only the fields this page uses. You do not need to type fields you never render.
- [ ] Note that some fields are nested objects. Type them properly.

**Acceptance criteria**
- [ ] `npm run dev` serves the app with no console errors.
- [ ] `npx tsc --noEmit` passes clean.
- [ ] `User` is defined and exported from its own file.
- [ ] Zero uses of `any` in the codebase. If you're reaching for `any`, use `unknown` and narrow it.
- [ ] You can explain why you typed the nested object the way you did.

---

### Task 2 — Fetch and render the list
**~45 min**

- [ ] Fetch the users when the component mounts.
- [ ] Store them in state, typed as `User[]`.
- [ ] Render each user's name, email, and company name.

**Acceptance criteria**
- [ ] All users from the endpoint render on page load.
- [ ] Each list item has a stable, unique `key` — and it is **not** the array index.
- [ ] No React warnings in the console. None. Not even the yellow ones.
- [ ] The fetch runs exactly once on mount. Verify in the Network tab — if you see two requests, understand why before you "fix" it.
- [ ] Data lives in one `useState`, not several parallel ones.

---

### Task 3 — Handle the three states
**~30 min**

Every real screen has these. Most beginner projects ship one of them.

- [ ] **Loading** — show something while the request is in flight.
- [ ] **Error** — the request failed. Say so in language Ops would understand, not `TypeError: Failed to fetch`.
- [ ] **Empty** — the request succeeded but there's nothing to show. This is a *different* state from loading and from error.

**Acceptance criteria**
- [ ] DevTools → Network → throttle to Slow 3G: the loading state is visible, and no layout jump when data arrives.
- [ ] Break the URL to a 404: the error state renders and the app does not crash or show a blank page.
- [ ] `fetch` does not reject on a 404 — it resolves. Confirm you check `response.ok`, or your error state will never fire.
- [ ] The three states are mutually exclusive. You never see two at once.

---

### Task 4 — Add search
**~45 min**

- [ ] Add a text input above the list.
- [ ] Typing filters the list by name **or** email.
- [ ] Matching is case-insensitive.

**Acceptance criteria**
- [ ] Typing filters in real time. No submit button, no debounce needed at this size.
- [ ] Searching `LEA` matches `Leanne`. Searching `.biz` matches on email.
- [ ] Clearing the input restores the full list.
- [ ] A search matching nothing shows a distinct "no matches" message — **not** the same empty state from Task 3. Those are different problems and Ops needs to know which one they hit.
- [ ] **There is no `filteredUsers` in state.** The filtered list is derived from `users` + `query` during render. Two sources of truth for the same data is the bug you'll spend the next decade avoiding — start now.

---

### Task 5 — Break it into components
**~30 min**

It works. Now make it something a teammate could work in. This ordering is deliberate — you have to feel a 200-line component before splitting one teaches you anything.

- [ ] Extract `SearchBar`, `UserList`, and `UserCard`.
- [ ] Give each an exported props interface.
- [ ] Keep state ownership where it belongs — don't scatter it to make the extraction easier.

**Acceptance criteria**
- [ ] `App.tsx` is under 60 lines.
- [ ] Every component has a typed props interface. No inline `{ x }: { x: string }` shorthand.
- [ ] Each component file has exactly one exported component.
- [ ] `UserCard` receives a `User` and knows nothing about fetching, searching, or where the data came from.
- [ ] `npx tsc --noEmit` still passes. Nothing broke.

---

### Task 6 — Accessibility and ship
**~30 min**

- [ ] The search input has a real associated `<label>`. Placeholder text is not a label.
- [ ] The list uses semantic markup (`<ul>` / `<li>`), not a pile of divs.
- [ ] Email addresses are `mailto:` links.
- [ ] Loading and error states are announced to screen readers (look up `aria-live`).
- [ ] Push to GitHub with a README: what it is, how to run it, one screenshot.

**Acceptance criteria**
- [ ] You can use the entire page with only the keyboard. Tab reaches the input and every link, and focus is always visible.
- [ ] Clicking the label focuses the input. If it doesn't, the label isn't wired up.
- [ ] Zoom to 200% — nothing overlaps or gets cut off.
- [ ] Run Lighthouse: Accessibility scores 95+.
- [ ] The repo is public and `npm install && npm run dev` works from a clean clone.

---

## Definition of Done

- [ ] All six tasks meet their acceptance criteria.
- [ ] `npx tsc --noEmit` passes with zero errors and zero `any`.
- [ ] Console is clean — no errors, no warnings.
- [ ] All three states + the no-matches state verified by hand.
- [ ] Pushed to GitHub with a working README.
- [ ] You can answer every question in Code Review below without opening the code.

---

## Working With Claude On This

Attempt → Answer → Rebuild. Per task, not per project. Twenty minutes on Task 2 before you ask anything about Task 2.

**Good prompts for this ticket**

> Here's my User type and here's the actual API response. My typecheck fails on the nested field and I don't understand the error. What am I not seeing?

> I wrote this fetch in useEffect and it fires twice. I think I know why but I'm not sure. Explain what's happening before you change anything.

> Review Task 4 like a senior frontend engineer. I stored the filtered list in state — talk me out of it or tell me I'm fine.

**The prompt that wastes the ticket**

> Build me a searchable user directory in React and TypeScript.

You'll have it in 30 seconds, you'll have learned nothing, and you'll be exactly as stuck on FE-248.

---

## Code Review

The questions a senior would leave on this PR. Answer them out loud, from memory, before you call it done.

1. Why is the array index a bad `key` here? Give me the specific bug it causes.
2. Why is `filteredUsers` in state a bug, when it obviously works?
3. Your `useEffect` fires twice in dev. Why? Is that broken?
4. `fetch` doesn't throw on a 404. So how does your error state ever fire?
5. Where does `query` live, and why there instead of inside `SearchBar`?
6. What breaks first at 10,000 users? What would you do about it?
7. Why does a placeholder not count as a label?

Can't answer one? That's not failure — that's the next thing to go learn. Then make it a flashcard.

---

## Notes

Ticket is deliberately small. The point isn't the directory — it's that fetch → render → filter → the three states is roughly 60% of all real frontend work, and you'll build some version of this screen every year for the rest of your career.

Do it once, properly, while it's small enough to hold in your head.
