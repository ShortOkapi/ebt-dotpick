# EBT DotPick — maintainer guide

Updated: **26 October 2026**. This file is for project maintenance. Visitors can use the [user guide](README.md).

## Dot names and destinations are separate

A dot name is a convenient label for a whole grid cell. A destination is a specific point within that cell. Changing the dot's name does not automatically rename its places, change an arrival coordinate, alter eligibility or mark it conquered.

Keep legacy grid constants, anchors, index order and antimeridian/polar behaviour unchanged. References are `[south-to-north index, west-to-east index]`. Displayed bounds have four decimals; calculations keep original precision and Maps handoffs use six decimals.

## Preferred dot names

Edit **dot-name-overrides.json** at the **ebt-dotpick** repository root. Keep the `include` and `exclude` arrays, even when empty. Use each dot only once in `include`. Keep one complete entry per line, with its `[row, column]` together, as in the supplied file. Preserve other entries, optional model-specific names, reasons, `exclude` and metadata. This is the same JSON format; only its layout has changed.

```json
{
  "dot": [460, 403],
  "name": "Torres Vedras"
}
```

Names omit “Dot” and the ID; the app adds them. `name` applies to both models. Optional `nameWorldwide` and `nameEuroUse` take precedence for the respective model. An optional `reason` explains a maintenance choice.

An `exclude` entry such as `[460, 403]` forces a numeric-only label and takes precedence over preferred or automatic names. Excluding a dot name does not remove its destinations.

The file includes Miguel's reviewed preferences, including, e.g., Praia da Adraga, Berlengas, or El Hierro Airport. Unreviewed dots retain automatic or numeric labels. Label-only edits do not require rebuilding place blocks. Names are checked on opening, hourly while visible, on return when due and after reconnection. Invalid/failed updates retain usable saved preferences.

## Curated destinations and exclusions

Edit **destination-overrides.json** at the **ebt-world-land-map** repository root. This is a source-maintenance file. The app reads its resolved results in prepared blocks rather than requesting OSM or this file for every GPS fix.

An OSM inclusion normally supplies only the ID, dot, Euro-use flag and reason. Available names and coordinates are inherited. Add a `name` only to override its label. Add six-decimal `lat`/`lon` when a checked point must replace the source centre, for example because an archipelago's centre is in water or a large feature's centre falls outside the dot. An English custom label should not retain an obsolete source English name as a second line.

```json
{
  "id": "osm:relation:5011695",
  "dot": [461, 402],
  "name": "Berlengas",
  "euroUse": true,
  "reason": "Berlengas, EBT id=146164"
}
```

Manual entries use a Plus Code ID beginning `manual:`, a name, six-decimal coordinates, dot, Euro-use flag and reason. OSM ways and relations can supply a centre, but that centre must still be checked against the mapped feature and the intended dot.

### Removing a superseded place

Use the destination file's **exclude** array for a particular source ID **within a particular dot**. This is different from excluding a dot name or changing its eligibility.

```json
{
  "id": "osm:relation:4822054",
  "dot": [459, 360],
  "reason": "The reviewed Ponta dos Biscoitos destination replaces the generic Ilha Terceira suggestion in this dot."
}
```

The exclusion is scoped to the ID/dot pair: it must not remove the same island from other dots. Preparation applies exclusions before rebuilding both model lists and the retained-point pool. A destination exclusion takes precedence over an inclusion for the same ID/dot pair.

RC12 records nine superseded island suggestions this way. Other valid places in those dots remain; island names explicitly accepted unchanged remain. The Kalogeroi Islets point takes the reviewed group label. Deserta Grande remains in [436, 386]; Funchal - Lido is [436, 385].

Changing the maintained destination file requires another prepared-data update before the app can show the result. Publish the source change and the corresponding checked blocks/manifest together as a coherent data revision. Do not maintain exceptions by directly editing generated blocks. Existing preparers must implement these scoped exclusions before being used to regenerate the data; do not rerun an older notebook blindly.

## Prepared place data

The prepared place snapshot covers **4,222 dots** from earlier map revisions. The bundled eligibility map matches **Target Map revision 104**, with **4,171 eligible Euro-use dots**. Five newly eligible dots — **[259, 527]**, **[446, 490]**, **[447, 454]**, **[454, 474]** and **[471, 449]** — do not yet have prepared place lists. The newly classified Unconquerable Euro land dot **[449, 490]** also has no prepared list. Their existing manual-point option remains available; updated eligibility does not automatically rebuild place blocks. The old **[255, 527]** prepared record has no listed points or automatic name and remains harmless historical data; revision 84 removes that cell from eligibility. The optional `classifications` object (formatVersion 1) stores compact ranges for excluded, foreign, sea and explicitly unreviewed cells; top-level `ranges` contain eligible cells only. The Target Map exporter supplies both together. The visible **Water Only** label retains the `sea` JSON key. The optional `classifications.background` stores validated worldwide land ranges and pinned source hashes; unrecorded land defaults to Foreign and other unrecorded dots to Water Only. Explicit decisions, including Unreviewed, override that background. Revision 104 preserves the revision-84 eligible ranges, records the 19 reviewed Unreviewed remnants as Foreign/Water Only, and adds the compact background. Older maps without it retain their unknown defaults. Malformed/conflicting ranges reject an update before adoption; the app keeps its usable cached or bundled map. Background lookup uses intervals, not a per-dot global Map. This does not establish worldwide prepared place coverage.

Euro-use means the Eurozone, other countries and territories using the euro, including Kosovo and Montenegro, plus Switzerland. Classify the full candidate pools before selecting each model's top five. Worldwide includes Euro-use places. Missing population stays unknown. The five original curated exceptions remain; Falca and Légua are ordinary results.

Keep **data/destinations/manifest.json** and its referenced blocks consistent. Add new content-addressed block files first, then publish the manifest selecting them. Keep older dated files for existing readers and offline fallback. The data folder version can stay **v20261012-rc10-euro1** while reviewed blocks get new hash filenames; `reviewRevision` and preparation metadata record the later review.

Each block stores clipped country outlines for local point checks. They classify territory, not access or dry land, and can include territorial waters. The 25-metre uncertainty band accounts for simplified boundaries and coordinate rounding. Glorieuses has its reviewed island footprint; other positions can remain uncertain.

Do not renumber the grid or substitute an outside-dot town/cell centre when suggestions are missing. Validate raw and six-decimal coordinates strictly inside the chosen dot. Store resolved OSM names, optional English names, known/unknown population and model classification consistently.

Manifest updates, name updates and block downloads retain their last usable valid copies on failure. Public data caches are separate from app-version caches. RC1/RC2 records remain readable where supported; missing old name metadata falls back to numeric labels. RC1 also lacks English names and country outlines.

## Notes import and legend candidate (2.3.1-rc.2)

This candidate keeps the legacy `ebt_cached_profile` key and `user`/`dots` fields, adding the optional non-negative integer `unlocatedNotes`. Old profiles without it remain readable with zero unlocated notes. The displayed total is located plus unlocated notes; only located notes enter dot aggregates. Exactly `0;0` is the EBT missing-coordinate marker. No coordinate-to-dot arithmetic changes for other notes. Correct previously imported marker notes by reimporting the CSV, not by deleting a whole saved dot.

Quoted multiline records and doubled quotes are streamed across byte chunks. Malformed/incomplete records or coordinates reject the import. Replacement is confirmed for a recognised different user, an unreadable saved profile, or a reduction of at least 10% with a minimum of 10 notes or 2 dots. Counts are compared with the complete current total, including unlocated notes. The original profile remains in use through parsing and cancellation. Save failures retain the previous persisted value and expose a retry. Browser draft errors do not delete stored data.

The palette is unchanged. Exactly one note uses colour 1; the maximum uses colour 8 (ties included), except that a maximum of one uses colour 1. Six middle intervals use thresholds `ceil(2 * (maximum / 2) ** (k / 6))`, `k=0..6`, with exact endpoints and a floating-point tolerance at integer boundaries. The same thresholds drive map colours and labels. Duplicate thresholds describe empty classes; they are not forced apart. Actual dot counts determine occupied bands: a valid mathematical interval with zero observed dots is also dimmed and has no numeric label. The threshold calculations and map colours do not change merely because a band is unused. Swatches are native buttons with 24 px-high hit targets and 8 px colour strips, hover descriptions, keyboard support and a toggled range/count caption. The first and final swatches are separated by 4 px gaps and have bolder labels. Replacement warnings retain the previous thresholds but name the actual direction of each relevant count change and use singular/plural nouns correctly.

## Release versions

For the current manual workflow, update **both** literals together:

1. `const APP_VERSION = '…';` at the start of **sw.js**.
2. The visible version text in **index.html**, inside `<span id="app-version">`.

The HTML version identifies the loaded page. The service-worker version identifies its offline app cache. The About button's hover tooltip includes the page version and identifies a differing worker version when reported. Version text in the feedback report is taken from the HTML; there is no third literal to maintain.

The current stable release is **2.3.0**. The current local test candidate is **2.3.1-rc.2**; it is not a published stable release. Keep the page and service-worker versions together for future candidates. Before merging an accepted stable release, set both literals to its final version and commit before merging. Update the candidate README branch link when starting a different release series. Data-folder versions remain independent of the app version.

Test the supplied complete candidate, then download/test the actual release branch ZIP. Confirm the server starts in the folder beside index.html. Keep physical Android/iPhone checks for GPS, installed-PWA use, clipboard, external-app return and narrow screens. Version 2.2.0 retains the existing icon. A redesigned icon is deferred to a later release.

## Data credits and private preparation

Prepared settlements and boundaries derive from OSM under ODbL. Selected additional place data derives from GeoNames under CC BY 4.0. Keep source notes and explicit overrides with curated exceptions. Manual Google Maps/Apple Maps review references retain their applicable terms. The MIT application licence does not replace dataset or imagery terms.

Preparation scripts, notebooks and source audits stay outside the app and world-land repositories. The shipped app remains index.html with its existing PWA resources, JSON and documentation.

## Rename and compatibility

Public branding and links use EBT DotPick and ebt-dotpick. Keep the manifest identity `/ebt-dot-safari/`, the legacy grid ID, personal-storage keys and persistent target/destination cache names. The new app-shell cache uses the ebt-dotpick-v prefix, so opening the new app does not evict the old shell before the forwarding page is deployed. On the new production path, public data-cache entries under the old path are copied to equivalent new-path keys; normal validation still applies when they are read. No Notes upload or server storage is introduced.

The former address needs its supplied small forwarding page and replacement service worker. Renaming a GitHub repository alone does not redirect its Pages site. Keep Android/iPhone installed-app migration checks separate from ordinary browser checks: retaining the manifest ID supports continuity, but phone-specific shortcut/update behaviour still needs confirmation. Keep the old installation until the new address and its conquered dots have been checked.

About data diagnostics use SHA-256 of the validated JSON values to identify snapshots without adding manual revision numbers to every source. Map revisions and prepared-place versions remain authoritative where supplied. Hashes cover the loaded worldwide base/overrides pair and preferred names as well. A missing fingerprint never blocks an otherwise usable dataset. Cached manifest/preferred-name entries now retain successful-check timestamps; older raw entries remain readable.
