# After the Credits

A Cinematic Shelf website for Chishimba’s drama ratings and reviews. The website is `index.html`, with the initial collection embedded and poster images beside it. It needs no build step, paid hosting, database, or API key.

## View the website

Open `index.html` in a browser. Search the collection, filter viewing statuses, browse favorites and movies, and open any title to see its rating and review. Reviews have individual shareable links after the site is hosted. Spoiler reviews remain hidden until a reader chooses to reveal them.

## Publish on GitHub Pages

1. Create a public repository, for example `drama-shelt`, in your GitHub account.
2. Upload `index.html`, all six `drama-*.jpg` poster files, and `.nojekyll` to the repository root and commit them on `main`.
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, select `main`, choose `/ (root)`, and save.
4. GitHub Pages displays the website address after deployment completes. For a repository named `drama-shelt` under `thenugismine`, the expected address is `https://thenugismine.github.io/drama-shelt/`. This is an expected address, not a verified live deployment.

## Add dramas, rate them, and write reviews

1. Open the website and choose **My workspace**.
2. Use **Add drama or movie**, or open a title and choose **Rate & review**.
3. Enter your grade, an optional score from 0 to 10, viewing status, review, and spoiler flag. Favorite titles appear in your favorites collection. You can provide an HTTPS poster URL for new titles; titles without posters use a typography cover.
4. **Save draft on this device** keeps your changes in this browser. The public collection remains the version in the hosted file. Browser storage is local to a device and browser; it does not sync to Google Sheets or other devices.
5. Choose **Download website**. Upload the downloaded `index.html` to the same repository root, replacing the existing file. Commit the change. GitHub Pages will publish the new ratings and reviews.
6. Choose **Back up collection** to save a JSON backup. **Restore backup** loads a backup into your local workspace. Take a backup before changing devices or clearing browser storage.

The workspace is a local editor, not an authenticated administration area. Visitors can only change their own browser drafts. A repository write is required to change the published collection. The website never stores GitHub tokens or accesses your Google account.

## Import details

Imported from the current K Dramas spreadsheet on October 11, 2026:

- 227 drama rows with titles and 31 movie rows.
- 230 unique dramas including watchlist-only titles, and 30 unique movies.
- All 15 favorite titles are preserved.
- Five duplicate-title histories are retained. The last sheet entry supplies the displayed grade and status. Open a duplicate title to see its original entries.
- One grade (`A`) has no title in the source. It is preserved in the collection backup under `importNotes.blankTitleRatings` rather than assigned to a guessed title.
- Grades are preserved. A-plus strings and movie thumbs have not been converted into numerical scores. Scores and written reviews begin empty.
- A few clear title spelling errors are corrected for display; the original spreadsheet titles remain in each entry’s `sourceEntries`.
- The Google spreadsheet is unchanged. This version is an imported snapshot, not live synchronization.

`collection.json` is an initial editable backup. The website’s source of published data is the embedded `collection-data` block in `index.html`; replacing the JSON file alone does not update the website.

## Artwork

The site includes downloaded promotional posters for Pursuit of Jade, Crash Landing on You, Coffee Prince, Goblin, Moonlight Drawn by Clouds, and Her Private Life. Each has a source link in the site’s **Artwork credits** dialog. Other titles use typography covers. Promotional artwork belongs to its respective rights holders.

## Validation

Data migration was checked against the spreadsheet: all titled drama and movie entries, original grades, statuses, duplicate histories, favorites, and the untitled grade were retained. JavaScript syntax and collection validation, filtering, sorting, new-entry creation, review escaping, and local draft/public separation were checked. A browser-based visual and interaction check was not available in this environment.
