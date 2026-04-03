# Nellai Tirupati Temple Page

## Current State
- `src/frontend/src/pages/TempleDetailPage.tsx` contains the full single-scroll temple page.
- Navigation: sticky header with a hamburger (☰) icon that opens a `SideDrawer` (slide-in panel from the right).
- Sections use mixed layouts: Sevas as a table, Homams as an icon-grid, Festivals as a vertical timeline, Special Offerings as badges/pills.
- Floating dot navigator (right side, desktop only) and SectionProgress (prev/next arrows pill) also present.

## Requested Changes (Diff)

### Add
- **Dropdown section navigator** in the header bar (replacing the hamburger ☰ button). Clicking opens a styled dropdown listing all 9 sections; clicking any item smooth-scrolls to that section and closes the dropdown. Should look polished and on-brand (gold accent on active/hover, deep green background).
- **Seva cards** — replace the Sevas table with a responsive grid of cards (2 columns on desktop, 1 on mobile). Each card shows the seva name (bold, gold) and description.
- **Homam cards** — convert the icon-grid into proper cards with icon, name (bold), and description. 2–3 columns on desktop.
- **Festival cards** — replace the vertical timeline with a card grid. Each card shows festival name and description. 2 columns on desktop.
- **Special Offerings cards** — replace badge/pill UI with proper cards showing offering name and description.

### Modify
- Header: replace the `<button onClick={() => setDrawerOpen(true)}>` hamburger with a dropdown trigger button labeled "Sections ▾" (or similar). The dropdown appears below the button on click.
- Remove `drawerOpen` state and `setDrawerOpen` usage since the drawer is gone.

### Remove
- `SideDrawer` component and all its code.
- `drawerOpen` state variable.
- Import of `Menu` icon (used only by the drawer trigger) if no longer needed.
- Import of `X` icon if only used by the drawer close button.

## Implementation Plan
1. Remove `SideDrawer` function component and all related state (`drawerOpen`).
2. Add a `SectionDropdown` component in the header: a button that toggles a dropdown panel listing all `NAV_SECTIONS` as clickable items. Close on outside click or item click.
3. Replace Sevas `<table>` with a card grid using SEVAS data array.
4. Replace Homams icon-grid with proper card grid using HOMAMS data array.
5. Replace Festivals vertical timeline with card grid using FESTIVALS data array.
6. Replace Special Offerings badge/pill UI with card grid.
7. Clean up unused imports (`Menu`, `X` if only used by drawer).
8. Validate (lint + typecheck + build).
