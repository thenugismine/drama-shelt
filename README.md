# After the Credits

Public read-only drama diary: https://thenugismine.github.io/drama-shelt/

## Editing the collection

Edit **K Dramas** in Google Sheets. The website has no add, edit, rating, upload, or write endpoint.

- **Sheet1:** add watched titles and grades in A:B, favorites in C, watchlist in D, movies and ratings in E:F. Latest duplicate entry wins; history remains visible.
- **Website Reviews:** optional title, score / 10, review, spoiler checkbox, country, and HTTPS Poster URL. Source title must match the title in Sheet1; keep existing IDs. For a new drama, add a review row with Type `drama` and matching Source title; an ID is optional.
- Poster URL changes take effect with the next feed refresh. Existing curated artwork is retained by title. New dramas with no poster use a unique exact TVmaze title match; ambiguous titles show a labeled fallback. Add a verified Poster URL in the sheet for aliases, ambiguous titles, or films. No guessed posters.

## Permanent one-way sync

Google Sheets Publish to web has automatic republishing enabled. `sync-config.json` points at the two public, read-only CSV feeds. The site checks at opening, every 60 seconds while visible, on focus, and when Refresh collection is clicked. Google may take a few minutes to republish edits. No GitHub rebuild is needed for content edits.

Only the two feeds are read; no Apps Script, OAuth token, public write service, or account credentials are used. The source's existing edit permissions remain in Google Drive. Published sheet values are public, including spoiler reviews in the underlying feed.

If either feed fails or is invalid, retain the last loaded collection (the embedded snapshot on first load) and show an unavailable notice. Sync applies both tabs together. Poster lookup failures retain labeled fallbacks.

## Files

`index.html`: presentation and embedded fallback; `sheet-sync.js`: CSV parser, title-based merging and exact artwork lookup; `collection.json`: initial snapshot; `poster-matches.json`: curated artwork sources. `google-sheet-sync.zip` now contains only this read-only client and instructions. The former editor/backend was retired without deployment.

TVmaze promotional artwork belongs to its rights holders. “Love Sprout” needs its exact title or a verified sheet Poster URL.
