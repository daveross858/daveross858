#!/usr/bin/env bash
# commit.sh — stage and commit all redesign/2026 work, then open a PR
# Run from the repo root: bash commit.sh

set -e

# ── Make sure we're on the right branch ────────────────────────────────────
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "redesign/2026" ]; then
  echo "→ Switching to redesign/2026"
  git checkout -b redesign/2026 2>/dev/null || git checkout redesign/2026
fi

# ── Remove any stale lock files ─────────────────────────────────────────────
rm -f .git/HEAD.lock .git/index.lock

# ── Commit 1: Color & type system ──────────────────────────────────────────
echo "→ Commit 1/5: Color & type system (style.css)"
git add style.css
git diff --cached --quiet || git commit -m "redesign(colors+type): indigo palette, Inter font, updated CSS vars

- Replace maroon #470f0e with indigo #6366f1 throughout
- Add --primary-dark #4f46e5 CSS variable
- Switch body/form font from Open Sans → Inter
- Add portfolio outcome line + category badge styles"

# ── Commit 2: Homepage overhaul ─────────────────────────────────────────────
echo "→ Commit 2/5: Full homepage redesign (index.html)"
git add index.html
git diff --cached --quiet || git commit -m "redesign(index): nav, hero, about, skills strip, case studies, portfolio, contact

Nav:         Fixed top header, desktop + mobile hamburger, open-to-work badge
Hero:        Dark full-viewport section, 200px avatar, positioning statement,
             open-to roles line, dual CTAs
About:       Leadership narrative rewrite — team founding, full-stack ownership,
             dropped tool list
Skills:      Replaced 3-card chip dump with compact single-row expertise strip
Featured:    New dark case studies section with 3 cards above portfolio grid;
             nav 'Work' link updated to scroll to #case-studies
Portfolio:   Outcome lines + color-coded category badges on all 10 cards;
             filters simplified to 4 job-type tabs (All/Product Design/
             UI Engineering/Product Strategy)
Contact:     Social link pills, 2-col form, indigo submit button"

# ── Commit 3: Screenshot assets ─────────────────────────────────────────────
echo "→ Commit 3/5: Screenshot assets"
git add images/screenshots/
git diff --cached --quiet || git commit -m "assets(screenshots): thermofisher.com and fishersci.com homepage + header screenshots

- thermofisher-home.jpg — ThermoFisher homepage representation
- fishersci-home.jpg    — Fisher Scientific homepage representation
- tfs-header.jpg        — ThermoFisher header close-up
- fss-header.jpg        — Fisher Scientific header close-up
- header-comparison.jpg — Side-by-side header comparison"

# ── Commit 4: Case study pages ──────────────────────────────────────────────
echo "→ Commit 4/5: Case study pages"
git add projects/thermofisher-design-system.html \
        projects/thermofisher-header-footer.html \
        projects/thermofisher-homepage.html
git diff --cached --quiet || git commit -m "feat(case-studies): three ThermoFisher case study pages

thermofisher-design-system.html
  - Founded the UI/UX Engineering team from scratch
  - AEM component library: 900+ teams, 100% adoption, CDN-distributed
  - 5-step process, role card, live site links with screenshots

thermofisher-header-footer.html
  - Global nav redesign across thermofisher.com + fishersci.com
  - Wrote all AEM components + owned the release end to end
  - WCAG 2.1 compliance, mega-menu, mobile patterns, footer IA
  - Before/after pattern grid, connected-to-design-system callout

thermofisher-homepage.html
  - Homepage redesign engineering + stakeholder alignment + release mgmt
  - 6 stakeholder groups aligned; zero production incidents at launch
  - Author-friendly AEM components: hero, promo, product grid, editorial"

# ── Commit 5: Supporting files ───────────────────────────────────────────────
echo "→ Commit 5/5: Supporting files"
git add portfolio-improvement-report.md 2>/dev/null || true
git diff --cached --quiet || git commit -m "docs: portfolio improvement report (LinkedIn leaders benchmark)"

# ── Push ────────────────────────────────────────────────────────────────────
echo ""
echo "→ Pushing redesign/2026 to origin..."
git push -u origin redesign/2026

# ── Open PR ─────────────────────────────────────────────────────────────────
echo ""
if command -v gh &> /dev/null; then
  echo "→ Creating PR via GitHub CLI..."
  gh pr create \
    --title "redesign/2026: portfolio overhaul — case studies, new sections, content rewrite" \
    --body "## What's in this PR

### Visual & Layout
- **Sticky nav** — fixed 64px header, desktop + mobile hamburger
- **Hero** — dark full-viewport, 200px avatar, positioning statement, open-to-roles line
- **Skills** — 3-card chip dump replaced with compact single-row expertise strip
- **Portfolio grid** — outcome lines + color-coded category badges on all 10 cards
- **Contact** — social pills, 2-col form, indigo submit button

### New Sections
- **Featured Case Studies** — dark section with 3 cards above portfolio grid
- **Positioning statement** — \`I close the gap between design and engineering — and build the teams that keep it closed.\`

### Content Rewrites
- **About** — full leadership narrative rewrite (team founding → full-stack ownership → origin story → AI angle)
- **Portfolio filters** — simplified from 5 overlapping tabs to 4 job-type tabs

### Case Study Pages (new)
| File | Summary |
|------|---------|
| \`projects/thermofisher-design-system.html\` | Founded the UI/UX Eng team; AEM component library; 900+ teams, 100% adoption |
| \`projects/thermofisher-header-footer.html\` | Global nav redesign, WCAG 2.1, wrote all code + owned release |
| \`projects/thermofisher-homepage.html\` | Homepage redesign; 6 stakeholder groups; zero incidents at launch |

### Assets
- 5 screenshot images under \`images/screenshots/\` (thermofisher + fishersci home + headers + comparison)

---
**Branch:** \`redesign/2026\` → \`main\`" \
    --base main \
    --head redesign/2026
else
  echo "─────────────────────────────────────────────────────────"
  echo "  gh CLI not found. Open this URL to create the PR:"
  echo ""
  REMOTE=$(git remote get-url origin | sed 's/git@github.com:/https:\/\/github.com\//' | sed 's/\.git$//')
  echo "  ${REMOTE}/compare/main...redesign/2026?expand=1"
  echo "─────────────────────────────────────────────────────────"
fi

echo ""
echo "✓ All done."
