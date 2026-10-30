# EBT DotPick 🌍🧭

**Your personal dot hunting assistant.**

<sup>*(Formerly EBT Dot Safari)*</sup>

A mobile map for EuroBillTracker dot hunters: see your conquered dots, find the nearest eligible unconquered dot, inspect places and plan onward from a point you choose.

[Open EBT DotPick](https://shortokapi.github.io/ebt-dotpick/) · [Releases and changes](https://github.com/ShortOkapi/ebt-dotpick/releases)

**Guide updated:** 30 October 2026. This guide covers the v2.3.1-rc.7 test candidate; the current stable release remains v2.3.0. Target areas are available from v2.1.0; places and planning from v2.2.0. Phone and browser menu wording may vary.

## How to use

Installation is optional: you can use DotPick in your browser or add it to your home screen.

1. Open EBT DotPick on your phone. Allow location access if you want the live radar; the request may appear as soon as the app opens.
2. Tap **Download from EBT**. Sign in to EBT only if asked. If signing in shows a confirmation but no download begins, return to DotPick and tap **Download from EBT** again. Accept **Download again** if your browser offers it.
3. Finish the download, or save the file if your browser shows an unsaved preview. See the phone-specific guidance below.
4. Return to DotPick. Tap **Load EBT Notes File**, then **Choose File** if offered, and select the newest Notes CSV from **Downloads** or the folder you saved to.
5. After the import, expand the radar panel to choose your **Target area**. With a usable GPS position, the radar shows your current dot and an eligible unconquered target.

*Already have a fresh Notes CSV? Skip the download and load that file directly.*

### Finding the downloaded file

**Android:** look in **Downloads**. If the new file is not there yet, check your browser’s Downloads list for progress. A completed download does not need to be saved again; dismiss **Download complete** and return to DotPick. You do not need **Open in app**.

**iPhone:** the download and saving steps depend on your browser. If offered **Save…**, choose **Files**, a folder and **Save**. If you are looking at an unsaved preview, use its **More…** or **Share** menu, choose **Save to Files**, select a folder and confirm **Save**. Going back from an unsaved preview does not save it. A completed download does not need another save: return to DotPick and choose the saved file.

Safari and Chrome on iPhone can show different menus. If you cannot find the file, open **Help if the file is missing** in DotPick’s download instructions. Choose the most recent file if older downloads have the same or similar names.

## Updating your conquered-dot map

1. Expand the controls panel if it is collapsed and tap **Update my map** to reopen the download and load instructions.
2. Download a fresh EBT Notes CSV, or use one you have already downloaded.
3. Tap **Load EBT Notes File** and select it.

A successful import replaces the previous conquered-dot map and recalculates the radar. **You do not need to clear your old map first.** The candidate warns before replacing a profile when note or dot counts fall enough to warrant checking, or the filename identifies a different user. The message names the decreasing count and distinguishes cases with more notes but fewer dots (or the reverse). Cancel keeps the existing profile. An invalid or incomplete CSV is rejected without replacing the working profile.

Notes exported at `0;0` have no assigned EBT coordinates. They remain in the displayed note total but conquer no dot; a separate message reports their number. Latitude zero or longitude zero on its own remains valid. Reimport your original Notes CSV to correct a profile previously affected by `0;0`.

The eight-colour legend reserves the first colour for exactly one note and the last for the maximum number of notes in a dot, including ties. Six logarithmic ranges cover counts from two up to the maximum, exclusive. Small gaps separate the exact-value colours from the ranges. The endpoint numbers are slightly bolder; labels and map colours use the same integer thresholds. Bands containing none of your dots are dimmed and have no numeric label, including the one-note band when no dot has exactly one note. Their hover/tap message says No dots in this band. Logarithmic boundaries stay unchanged: an occupied band's number still describes its lower threshold, not necessarily an observed count. Hover a swatch or tap/click it to see its range and the number of dots in that band below the legend. Tap the same swatch again to hide the detail; keyboard Enter/Space also work. The first colour takes precedence when the maximum is one.

DotPick stores the derived dot counts and user reference locally; it does not retain a permanent connection to your CSV file or automatically download new EBT notes. Load a fresh export whenever you want your latest conquests included. Automatic target map updates, described below, are separate from your personal map.

The **Clear conquered dots** button (☒) removes your saved personal dot map after confirmation. It does not delete the CSV file on your phone.

## GPS and the radar

- Tap the **GPS status button** on the right of the radar header to turn GPS off or on. Turning it off asks for confirmation and leaves your conquered dots visible.
- If permission is denied, allow location access in your browser or installed app settings, then return and retry GPS. Your phone’s location services also need to be enabled. A waiting message means the app has not yet accepted a usable position.
- Use **Locate me** (the crosshair button) to centre the map on your position. Moving the map to inspect another area does not change the GPS position used by the radar.
- For live tracking, keep DotPick visible with the screen awake. Tracking resumes when you return to it; wait for an active GPS status before relying on a new reading. While GPS is waiting after a usable fix, the retained reading is labelled **Last known target** and the expanded panel explains that it uses the last position. The target halo is dimmed. A fresh accepted fix restores the live reading.

The radar gives an approximate straight-line distance and a bearing from north. Distance is measured to the nearest point of the target grid cell, usually its boundary, rather than to its centre or a particular town. These are not road distances or turn-by-turn directions.

## Target areas

Expand the radar panel and use the labelled **Target area** selector. Your choice is remembered on this device, and changing it immediately recalculates the target using the current accepted GPS position.

| Target area | What qualifies | What to bear in mind |
| --- | --- | --- |
| **All land worldwide** | Dots marked as containing land by the OpenStreetMap-derived land mask, with manual corrections applied. | Land does not establish euro availability, public access or safety. The coastline-based source can include inland water; manual overrides can correct identified dots. |
| **Euro-use area** | Dots classified as **Conquerable** in the curated Euro-use map, covering land where euros are used or widely available, including Switzerland. | Known unconquerable dots are excluded, but classification is not a guarantee of banknotes, access or current conditions. |

A coastal or island dot qualifies when the selected map marks qualifying land anywhere within it. The displayed distance is to the grid cell, so the nearest point of that cell may itself be water or inaccessible.

The **OSM / Esri** choices in the map layers control change the background imagery. They do not change target eligibility.

### Target selection and radar messages

A target must satisfy both conditions:

1. It is absent from your imported conquered-dot map.
2. It is eligible under the selected target area.

The radar searches up to **150 km** using the existing distance calculation. Conquered and ineligible dots are skipped.

- **You are already in an unconquered target dot:** your current cell meets both conditions.
- **Outside the selected target area:** the Euro-use search found no eligible cells within the search radius.
- **No eligible unconquered target within 150 km:** no target satisfies both conditions within the radius. Nearby eligible dots may already be conquered.
- **Loading selected target map / Selected target map unavailable:** the selected model is not ready for calculations. Use **Retry target map** if shown, and connect to the internet if needed.

An unavailable result clears the previous target rather than keeping its guidance on screen. With no conquered-dot map loaded, load your Notes file before using the radar to find personal targets.

### Choosing a nearby target dot

Expand the GPS panel and tap **Nearby Target Dots**. Its **Target area** selector also changes the live radar's saved area. Choose a card to make that dot the active radar target and open its places. The list normally offers the five geographically closest eligible unconquered dots within **150 km**, including extra ties and the active target when necessary. Each card has the same 24-pixel compass as the GPS display, with a fixed N and a centred rotating arrow.

Cards show **dot steps**: a move to a neighbouring cell, including diagonals. Steps ignore sea, roads, access and travel time. Ordering still uses unrounded geographical distance to each cell, so it need not follow step counts. Place lists continue to show kilometres to arrival points.

The main radar keeps one target and its own kilometre distance and compass. An explicit choice is labelled **Selected Target Dot**. It survives ordinary GPS updates, leaving/returning to the app and area changes while still eligible and in range. On arrival the target row opens places in your current dot. **Use automatic nearest target**, shown as a link beneath the main GPS action when a target is chosen, restores automatic guidance. Reopening/reloading the page, replacing/clearing Notes, conquest or an incompatible eligibility/range change returns to automatic selection. A failed Notes import keeps the valid profile and choice. The choice lasts only for this visit.

Map popups also offer **Nearby Target Dots**, or **Nearby Target Dots From This Dot** for a remote start. These onward lists exclude the starting dot and use a planning area independent of the GPS radar. A fixed **Chosen start** and its six-decimal coordinates remain visible. A compact area switch in the popup changes that planning area. Selecting an onward dot leaves the live radar's target unchanged.

When a places panel was opened from a nearby selector, **Back to Nearby Target Dots** returns to the same search origin and area. The chosen dot and a valid chosen destination can be retained when you reopen its places. A plan from a fixed map point keeps that point as the Google Maps route origin. GPS-dependent searches wait for a fresh fix after location loss or app return.

### Equally near targets and small GPS movements

Equally near target dots remain accessible in **Nearby Target Dots**, even if a tie expands the usual five-card list. Distances are compared before rounding. Two distances both displayed as 12.3 km do not necessarily form a tie.

Without a deliberate selection, the separate stability rule can retain the automatic target while its computed distance remains within **10 metres** of the nearest candidate. The radar then labels it **Nearby Target Dot** and shows its own distance and bearing. A manual choice is not limited by that 10-metre allowance.

## Automatic target map updates

DotPick automatically checks the three published target datasets: the compact Euro-use map (eligibility plus recorded classifications), the worldwide land mask and its manual overrides. The compact Euro-use export keeps these classifications with its matching map revision; no full editor history is downloaded by the phone. The compact Euro-use map can also include a worldwide classification background: dots without individual decisions are Foreign on land and Water Only elsewhere. Explicit decisions, including Unreviewed, take precedence. This does not add Euro-use targets or detect every inland lake. Older maps remain supported; when classifications are unavailable, the app keeps the appropriate uncertainty warning. A newer usable revision is retained if the same dataset offers an older remote revision.

Checks happen:

- On each app opening or page load.
- Hourly while the app is visible.
- When you return to the app, if the hourly check is due.
- Immediately when connectivity returns.

Valid changes are adopted and the radar recalculates using the current accepted GPS position. A published map correction can therefore reach DotPick without a new app release. A closed app checks when it is next opened; it does not run these checks continuously in the background.

If an update fails or contains invalid data, the app retains its last valid map. The target area status shows update or availability information and offers a retry when appropriate. If the device cannot save the newest map for offline use, the panel tells you.

## Offline use and saved data

After a successful online visit, the app, your derived conquered-dot data and validated target maps can remain usable offline, provided the browser retains their local storage. Included target datasets also provide fallback data when available.

Before relying on a new offline copy, open **About** and check its offline-app status. A failed optional icon, manifest or place-name download does not prevent saving the core app. The page, pinned Leaflet files and bundled target maps must be available before an update replaces the previous offline copy. An update can reuse checksum-verified Leaflet files from an older saved copy if the CDN is unavailable; a first-time setup still needs those files.

If preparation fails, About offers **Retry offline setup** and identifies a retained older copy when available. Return online and retry. A prepared update does not reload the map while you are using it: About offers **Reload updated app** when a newer worker takes over an already-open page. Finish imports and resolve any unsaved-profile notice before using that button. Older installed app pages may need an ordinary reload to show these new controls. The app checks again on opening, when connectivity returns, and on a visible return if its hourly check is due.

App releases retain a coordinated offline copy rather than replacing the page on every network request. Release checks verify the page/worker versions, pinned Leaflet files, candidate guide link and a distinct cache identity for changed app code.

Background maps may require an internet connection. Previously viewed tiles may be cached by the browser, but this is not a complete downloadable offline map and their continued availability is not guaranteed. A grey background can therefore be expected offline even when the saved app, your conquered dots and downloaded planning data are working. Turning GPS off does not turn off the network or clear tiles; after a reload it can leave the map at a different position/zoom requiring other tiles.

**Retry offline setup** keeps its button visible and disabled during the attempt. If another attempt fails, About identifies the failed retry and explains that required app files could not all be saved, or that the browser reports offline. After restoring the connection or a temporarily missing local test file, retry again. Saved target maps and stale place lists remain usable offline; their notices identify saved data without presenting an update retry until the browser is online. Unavailable data still offers recovery guidance.

Watch for **Saved Offline** or **Not saved** when importing your personal map. If saving fails, a prominent message explains that the current profile works for this visit only and an older saved map may return next time. **Try saving again** retries without reimporting. A failed save retains the previous saved copy. An unreadable saved profile is reported and retained until you accept a replacement. Clearing browser data, private browsing or changing browsers can affect saved data. Keep your downloaded Notes CSV so you can load it again if needed.

## Install on your home screen

Installation is optional. It gives DotPick a home-screen icon and lets it open like an app; it does not change how your Notes file is imported.

### iPhone — Safari

1. Open DotPick in Safari.
2. Open **Share**. Depending on your Safari layout, this may be inside **More** or the page menu.
3. Choose **Add to Home Screen**. If it is missing from the sharing actions, look under **Edit Actions**.
4. Turn on **Open as Web App** if offered, then tap **Add**.

These are Safari instructions; Chrome’s download and installation menus can differ. See [Apple’s web app instructions](https://support.apple.com/guide/iphone/iphea86e5236/ios) for the current steps.

### Android — Chrome

1. Open DotPick in Chrome.
2. Open Chrome’s three-dot menu and choose **Install app**, or **Install and create shortcut → Install**. Older versions may show **Add to Home screen**.
3. Follow the installation prompts, then open DotPick from its icon.

You can also use an installation invitation if Chrome shows one. There is no need to wait for an invitation to use the app. See [Chrome’s web app instructions](https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid&hl=en) for the current steps.

If your personal map is not present when you first open the installed app, load your saved Notes CSV there.

## Notes files

**Download from EBT** requests the smaller file that EBT calls its **censored Notes CSV**. It omits note comments while retaining the coordinates DotPick needs. The full Notes CSV is also supported. Use a complete export of your notes to represent your conquered-dot map.

## Privacy

### Notes and saved data

Your Notes CSV is read and processed on your device. DotPick does not upload it, your note serial numbers or your comments. It has no user accounts, analytics or advertising trackers.

DotPick does not send your Notes data to Miguel, GitHub or any map provider. Importing your file does not share its contents with them.

To restore your map later, DotPick saves a compact profile in this browser: your user reference and the count of notes in each conquered dot. It also remembers settings such as GPS on/off and target area, and caches app files and downloaded public map/place data for offline use. It does not retain the complete CSV or a history of your GPS fixes.

**Clear conquered dots** removes the saved personal profile after confirmation. The CSV on your device remains yours. Other settings and public caches can remain until you clear this site's browser data. Private browsing, browser storage limits or clearing data can remove saved information; keep your original Notes CSV.

### Location and external services

GPS positions are used on the device for the live marker, distances and radar. Browser/operating-system location services have their own privacy policies.

Online use makes normal requests to GitHub/GitHub Pages for app and public data files, unpkg for Leaflet, and the selected background-map provider (OpenStreetMap or Esri). These services receive ordinary connection information such as your IP address and requested resources. Tile requests and grid-block filenames can reveal the area being viewed or inspected. Public place-data requests do not contain your Notes or exact GPS coordinates.

Opening Google Maps sends the selected destination coordinates. An onward plan from another dot also sends its chosen start; otherwise Google Maps may use your location under its own permissions and policies. DotPick adds no analytics parameters to those links. EBT handles sign-in and Notes downloads on its own site; DotPick does not receive or store your EBT password.

### Feedback

The Feedback action in a dot popup or **Places in this dot** prepares a message containing that dot's reference/name, target area and app version. It does not add your Notes, note counts, live GPS position or planning origin. You can edit and review your message before copying it. Public dataset details are shown separately in a read-only section and included automatically by **Copy message**, with a request to keep them. If automatic copying is unavailable, a complete message is selected for manual copying. Its draft is not saved to browser storage and is cleared when the panel closes.

Use **Copy message**, then **Message Miguel**. Copying writes the reviewed text to your device's clipboard. The second button opens the EBT forum; sign in, paste the text into your private message and send it there. DotPick does not send it automatically. Forum messages are handled by the forum under its own policies.

## Places, dot names and planning

Prepared place and dot-name data currently focuses on the Euro-use area. In worldwide mode, covered mixed dots also include places on foreign land. Names and place lists are reviewed and updated over time, independently of app releases. Where a list is empty, incomplete or unavailable, **Choose your own point on the map** lets you select a destination yourself.

In the expanded GPS panel, the **entire dot-name/ID, distance and compass row** opens places in the active radar dot. It is a keyboard-accessible link, including when you are already in an eligible unconquered dot. **Nearby Target Dots** is the main action button; it opens alternative choices. When a target was chosen deliberately, **Use automatic nearest target** appears as a link below it. The collapsed header keeps its compact display and expand behaviour. Long names wrap while distance and compass stay together; only the name and distance are bold.

Every map-dot popup offers two actions:

- **Places in this dot** inspects that dot, including a conquered or ineligible dot. Inspection works without Notes or GPS. The selected area filters its places, not whether the dot can be inspected. A dot recorded as Unconquerable Euro land has its own prominent warning in either model. A recorded Foreign-land dot shows an outside-Euro-use warning when Euro-use is selected. If no classification is available, a general target-map notice explains the uncertainty. Inspection and deliberate point choice remain available.
- **Nearby Target Dots** searches onward from your accepted GPS position when you are in that dot. **Nearby Target Dots From This Dot** uses the exact clicked point for another dot. These lists exclude the starting dot, require your Notes and search within 150 km. Their area choice is separate from the live radar.

The popup's small **Euro-use area / All land worldwide** switch changes its planning area. Recorded **Foreign land** shows **NOT IN EURO-USE AREA** when Euro-use is selected. Recorded **Unconquerable Euro land** shows **UNCONQUERABLE EURO LAND**, in either model. Conquered-note counts remain visible alongside these notices. **NO LAND HERE** uses an explicit **Water Only** classification or the worldwide mask when no land classification is recorded; Euro-use ineligibility alone never establishes water-only status. The same tag appears in the Places panel for a dot identified as no-land, in either target area and even when the place list is empty or unavailable. An empty place list by itself never establishes no land. The coastline-derived worldwide mask does not remove inland lakes, so automatic detection of every lake-only dot is not provided.

If you pan far enough east or west to see another copy of the world, a dot click uses that location’s ordinary longitude and stored dot ID. Starting Places or Nearby from that popup returns the map to its ordinary copy so the planning outline stays aligned. Ordinary longitudes, including the existing ±180° endpoints, retain their legacy lookup. Radar/onward searches still stop at the ±180° seam; they do not search across it. This is a known limitation near that line.

The popup closes with **Esc**. Its X accepts **Enter** or **Space**, and focus returns to the map. Enter on a popup control performs that control's action; Enter on the focused map itself opens a dot inspection.

Classifications come from Target Map's compact export, including eligible, excluded, foreign, sea and explicitly unreviewed cells. An absent/unreviewed cell is not guessed to be foreign or unconquerable; its Euro-use status remains unreviewed. If classification data is unavailable, the app identifies that limitation. These labels describe the recorded Euro-use classification; the worldwide radar continues to use its separate land model.

Opening a dot popup temporarily collapses the controls and GPS panels to make room for both actions. Closing it restores their previous state. A prominent start box identifies the onward search origin: your GPS position if you are in that dot, or **Chosen start for onward search** with the exact clicked point shown to six decimals. A short-screen popup can scroll without putting its buttons beneath those panels. The aligned controls and GPS panels leave room beside the map layer button on narrow screens.

The GPS places area selector also changes the live radar's saved target area. Temporary GPS loss or leaving the app pauses its navigation; a fresh fix recovers the panel and rechecks its selection. A popup onward search which starts at your GPS position also waits for a fresh fix, but its target-area choice stays independent of the live radar.

**Places in this dot** is inspection. Its list and selected place show straight-line distances **from you** when GPS is usable, even when you inspect a distant dot. Its Maps route uses your location. Without usable GPS, distances are omitted and the selected-place action becomes **View place in Google Maps**. Inspection and its selection remain usable; a fresh fix restores distances and the route action automatically.

An onward plan from another dot shows a prominent **Chosen start** box with the exact clicked point's dot and six-decimal coordinates. List and selected-place distances explicitly say **from chosen start**. Its Maps route sends that fixed origin, even if you move or turn GPS off. Map inspections and onward plans have an area selector independent of the live GPS radar; that planning choice lasts for this visit. Returning to a map plan restores its choices when they still apply. Changing Notes invalidates a personal target plan; simple dot inspection remains usable.

The places heading identifies the whole dot: **Places in Torres Vedras Dot** on the top row, with `[460, 403]` on a separate, normal-weight row. Dot names are convenient display labels, not official EBT identifiers or automatic arrival selections. When the first worldwide representative is foreign, a mixed dot can show the Euro-use and foreign representatives, for example **Lemos / Pustec Dot [466, 475]**; Euro-use mode shows **Lemos Dot [466, 475]**. If its first worldwide representative is Euro-use, the worldwide name has one place. Preferred names can override these generated labels. Default representatives are selected from the full classified pools before taking each model's top five places. Names use English when supplied by OSM, otherwise the local name. Unnamed or unavailable data falls back to **Dot [row, column]**. The IDs, grid bounds and eligibility remain unchanged.

Choose a suggested place or the final **Choose your own point on the map** card, then check the prominent **Selected destination** box before opening Maps. That card uses the same layout when a list is empty or unavailable. It gains the selected border only after you confirm a manual point; cancelling map choice with **Cancel** or **Esc** retains the previous destination and returns focus to that choice. A blue dashed keyboard-focus outline is distinct from the orange selected border. The list shows an English second line beneath a local name when OSM supplies one. Each available distance explicitly says **from you** or **from chosen start**. Target-dot distance is measured to the cell; place distance is measured to the arrival point. Neither is a road distance. Fixed onward plans send both origin and destination at six decimals. GPS routes send the selected destination and let Maps use your location. Inspection without GPS sends a coordinate search. Dot labels are never used as Maps destinations. Google Maps can display its own address or nearby-place label for the coordinate you sent; that wording may differ from the selected place's name in DotPick. A coordinate handoff does not supply a custom Google Maps label. Equally near targets can be selected in the places panel. A map choice does not change the live radar's chosen dot.

A chosen destination survives an area change when it remains in the same inspected/target dot and qualifies for that model, including a listed point outside the new top five. An uncertain manual point chosen worldwide stays selected on switching to Euro-use, with its uncertainty warning and kept coordinates. Use it anyway or choose another point, beginning at those coordinates; Maps is withheld until review. A point known to be outside Euro-use is cleared on that switch. It can still be chosen deliberately in Euro-use after reviewing the warning.

**Euro-use** means the Eurozone, all other countries and territories using the euro (including Kosovo and Montenegro), and Switzerland. Automatic preparation filters places before selecting up to five suggestions independently for each model. Worldwide includes Euro-use and foreign locations. Unknown population remains unknown. The five approved island/land-feature exceptions remain included; Falca and Légua are ordinary results.

### Corrections to names and places

Names and place lists can be corrected over time. Use **Feedback** in the dot popup or **Places in this dot** to suggest a change. The reviewed names include, e.g., Praia da Adraga, Berlengas, or El Hierro Airport. A preferred dot name does not automatically select a destination.

### Choose on the map

Pan or zoom beneath the transparent crosshair, or tap a point. Borders stay red and one CSS pixel wide. The live radar target has a permanent translucent yellow five-pixel halo. A map inspection or plan has a blue five-pixel halo while its panel is open; a coincident target is explained in the context line. Highlights do not change boundaries, distances or eligibility.

**Use this point** requires a strictly interior raw point whose six-decimal handoff also remains interior. Borders, corners and rounding onto an edge are refused. Grid calculations retain original precision; bounds are still displayed at four decimals.

In Euro-use mode, prepared OSM country outlines check a point locally where available. Inside qualifying territory proceeds directly. Foreign points show a prominent red **Outside the Euro-use area** warning; missing outlines, positions within 25 metres of a boundary and conflicting classifications show amber **Euro-use check is uncertain**. Both offer **Use anyway** or **Choose another point**. Accepted warnings remain visible with the selected point. Cancel restores the previous map view and selection.

The point check identifies territory, not dry land or access, and may include territorial waters. Near a border or where geographic data is incomplete, the result can remain uncertain. It does not replace checking access and safety.

### Place data and offline use

Automatic dot names are tied to each prepared block’s content hash. After a valid data update, an old automatic label is withheld until the corresponding current name is available; a failed or late older reply cannot pass itself off as a current name. Preferred names and explicit name exclusions retain priority. A notice that automatic radar selection has resumed disappears after about 12 seconds, or sooner when the target context changes.

Place and nearby-dot buttons stay in place as GPS distances or names update. Place-data requests for the same block share one download and validation; recently used blocks, including saved offline copies, are kept in memory. The public-data cache remains separate from your Notes.

**This dot has no prepared place data yet** means it is outside the current coverage, not that it has no places. **Place data could not be downloaded or read from saved data** means no usable downloaded or cached list is available. **No listed destinations** means the covered dot has an empty list for the chosen target area. You can still choose a point on the map in each case.

Open a covered dot while online to save its places and automatic name. Those visited areas can work offline; unvisited areas may be unavailable offline. Background maps and Google Maps are separate services. This is not a complete downloadable offline map.

Public names and place data are checked for updates on opening, hourly while visible, on return when due and after reconnection. Failed updates retain usable saved data when possible. A place or name correction reaches your device when its updated data is available online.

Prepared place and country-boundary data is © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), under [ODbL](https://opendatacommons.org/licenses/odbl/). Additional place data comes from [GeoNames](https://www.geonames.org/), under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); some coordinates were corrected by Miguel. Application code remains MIT.

## Before you set off

DotPick cannot guarantee euro banknotes in any eligible dot. We do our best to classify dots correctly, but maps can contain mistakes and conditions can change. Check access and safety before setting off, and respect local restrictions.

No dot is worth entering a dangerous or forbidden area. And if your next conquest appears to require a submarine, please question the map before buying one.

## Feedback and map corrections

Use the small **Feedback** action in any dot popup or **Places in this dot** to report an unsuitable dot name, a missing/incorrect place, conquerability or Euro-use classification. Feedback is omitted from nearest-target and onward-planning panels. To report one of those target dots, click that dot on the map and use its popup or **Places in this dot**.

Write a short correction and, if possible, a supporting link. Use **Copy message**, then **Message Miguel** to open [a private message to **Miguel / lmviterbo** on the EBT forum](https://forum.eurobilltracker.com/ucp.php?i=pm&mode=compose&u=448). Sign in, paste your copied text into the message and send it. A forum account is required. There is no separate public email form or automatic submission from DotPick.

For Euro-use conquerability changes, open [EBT Target Map](https://shortokapi.github.io/ebt-target-map/), select a dot, choose its classification and explain your reasoning. Your edits stay in your working copy. Use **Review Changes** to save/share a **Change Report** and send it to Miguel. Proposed corrections are reviewed before accepted changes are published. Target Map does not yet edit DotPick names or place lists; report those through Feedback.

One dot is enough to help. Include its **[i, j]** reference, the proposed change and your reason. Local knowledge is welcome.

## Grid references

DotPick grid references are written as `[south-to-north index, west-to-east index]` — latitude first, longitude second. The first number increases northward and the second increases eastward. These are DotPick references, not official EBT dot numbers.

Tap a dot on the map to inspect its reference, note count and coordinate bounds. An unconquered label describes your imported map; use the selected target area and radar for eligibility.

## Credits and data sources

- **Direction:** Miguel Viterbo ([lmviterbo](https://eurobilltracker.com/profile/?user=10680) = [ShortOkapi](https://github.com/shortokapi)).
- **Code generation:** AI relay — Gemini → Claude → ChatGPT.
- **Audit and testing of earlier versions:** Peter Zagler ([elpeza](https://eurobilltracker.com/profile/?user=77800) = [PZ42](https://github.com/PZ42)), with analysis assistance from Claude.
- **iPhone feedback:** Manfred Wolfensberger (Laurentina, Zürich 🇨🇭), who played a key role in improving iPhone use.
- **Further feedback:** several EBT dot hunters have helped improve the tool.
- **Map library:** [Leaflet](https://leafletjs.com/).
- **Background maps:** OpenStreetMap contributors and Esri, with attribution displayed on the map.
- **Curated Euro-use data and editor:** [EBT Target Map](https://github.com/ShortOkapi/ebt-target-map).
- **Worldwide land mask and manual corrections:** [EBT World Land Map](https://github.com/ShortOkapi/ebt-world-land-map).
- **Additional place data:** [GeoNames](https://www.geonames.org/), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). These destinations were selected and reviewed by Miguel.

Manual reviews have also used Google Maps for reference and Apple Maps satellite imagery to check geography. These review references are separate from the prepared OSM/GeoNames data feeds and the background maps displayed by DotPick. Source notes are retained with curated exceptions; external content retains its applicable terms.

The application code is available under the [MIT licence](LICENSE). The worldwide land mask derives from [OpenStreetMap land polygons](https://osmdata.openstreetmap.de/data/land-polygons.html), © OpenStreetMap contributors, under [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/). External datasets and map imagery retain their own applicable licences and terms; the application’s MIT licence does not replace them. See the source repositories for dataset provenance.

## For maintainers

The separate [maintainer guide](MAINTAINING.md) explains how to edit dot names, curate or exclude places, update prepared data and set release versions. The user instructions above do not require editing repository files.
## Map data and nearby-dot distance ranges

The general reminder that background maps may require an internet connection appears at the end of About → Map data. The separate offline-app status near the version number reports app saving and retry results.

About → Map data identifies the datasets actually loaded by this browser: the Euro-use map revision, worldwide base date, prepared places and preferred dot names. Last successful online checks are separate from failed/latest attempts; bundled or saved data remain usable offline. Target Map's release number identifies the editor software, independently of map-data revisions. Feedback messages include concise public data identifiers and check times so Miguel can reproduce a report. They include no Notes contents or live GPS position.

Nearby Target Dots shows dot steps and an approximate kilometre range to the nearest and farthest points of each whole dot. The range includes water inside the cell and describes straight-line proximity, ignoring roads and access. For onward planning it starts at the displayed Chosen start; for the radar it starts at the accepted GPS position. The existing nearest-point approximation, target order, ties and 150 km minimum-distance limit remain unchanged. The far end of a dot can lie beyond that limit.
