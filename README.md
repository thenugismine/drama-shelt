# After the Credits — Cinematic Shelf

Chishimba’s drama diary, hosted on GitHub Pages at https://thenugismine.github.io/drama-shelt/.

## Collection and artwork

The current collection contains 230 dramas and 30 movies imported from K Dramas. Original letter grades, extra plus signs, movie thumbs, favorite order, and duplicate-entry histories are preserved. Scores out of ten and written reviews start blank.

229 dramas have TVmaze poster links. Matches are recorded in `poster-matches.json`; alternative English titles and Korean/Chinese language were checked. `Love Sprout` is deliberately left unmatched because its exact title is unclear. Seasons listed separately use the show’s series artwork. Movie posters can be added through the owner workspace. Posters belong to the respective rights holders; TVmaze supplies matching metadata and links.

`index.html` contains a last-known collection snapshot, so the site can remain usable when the sheet service is unavailable. `collection.json` is the corresponding data backup.

## Permanent Google Sheet syncing

**Status: prepared; activation awaits Google deployment authorization.**

The bound Google Apps Script project contains the backend and owner editor. Source is archived in `google-sheet-sync.zip` as `sync/Code.gs` and `sync/Editor.html`. Deployment must execute as the owner. Public requests return only the drama collection; every editor and save request checks that the active Google account equals the deploying owner. An anonymous account or a different account cannot save. No owner credential or API key is included in this repository.

`Sheet1` remains the source for drama and movie grades, watchlist entries, and favorites. The additional **Website Reviews** tab holds stable IDs, display titles, scores, reviews, spoiler flags, poster URLs, country, source-title mapping, and creation dates. Sheet1’s actual native layout is A:B dramas/ratings, C favorites, D watchlist, E:F movies/ratings. The CSV export adds a synthetic index column that is not present in the native sheet.

Once authorized and deployed:

1. Save the deployed Google `/exec` URL as `endpoint` in `sync-config.json`.
2. The site reads the sheet on page load, every minute while visible, and when you return to the tab. Connection failures show the last saved collection and a visible status.
3. **My workspace → Rate & review** opens the owner editor on Google. Saves persist to the original grade cell and Website Reviews. A revision check rejects stale saves if an entry changed after it was loaded. New titles append to the relevant sheet columns while preserving neighboring movie/drama data.
4. Visitors can browse and share reviews without signing in. Editing requires the deploying owner’s Google account.

Do not enable an anonymous owner-executed deployment without checking the owner guard. Do not change `owner_()` to use the effective identity alone: every public request executes under that identity. The active identity must be nonblank and match it.

Google’s spreadsheet authorization can permit access to spreadsheets generally. The code opens one fixed spreadsheet and exposes only collection fields. Review Google’s authorization screen before granting access.

## Editing while activation is pending

The site clearly shows that syncing is pending. Its existing local workspace still stores drafts in that browser only; those drafts are not sheet saves. Download a backup before clearing browser storage. After sync activation, the live sheet is authoritative; migrate any local drafts intentionally rather than overwriting sheet entries automatically.

## GitHub Pages

Publish the main branch from the repository root. The site is static; it needs no npm dependencies or build step. Retain `.nojekyll`, `index.html`, `sync-config.json`, `poster-matches.json`, and the six original `drama-*.jpg` files in the root. The original Pursuit of Jade image remains the hero image.

## Validation

Backend checks cover collection counts, all 15 favorites, latest duplicate ratings, score/review persistence, conflict rejection, owner-only writes, safe appends, and moving a watchlist title to Watching. Poster links are audited as decodable images. Activation still needs an end-to-end live sheet-to-site and owner-save test after Google authorization.
