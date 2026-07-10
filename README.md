# GodSlayersFC Bingo — GitHub Pages Only

This version is completely static and uses only GitHub Pages.

There is:

- No Firebase
- No Firestore
- No administrator account
- No external database
- No server-side code

Visitors can view both boards, switch teams, open tile details, and see completed
tiles. Only people who can commit changes to your GitHub repository can update
the live board.

## How editing works

All editable board information is stored in:

```text
bingo-data.js
```

To update the site:

1. Open `bingo-data.js` in your GitHub repository.
2. Click the pencil icon.
3. Change the announcement, tile text, image paths, or completion values.
4. Click **Commit changes**.
5. GitHub Pages republishes the updated website automatically.

This is the only genuinely private editing method available while remaining
strictly on GitHub Pages. A password or hidden admin interface written in
JavaScript would be visible to visitors and would not be secure.

## Mark a tile complete

Find the tile in `bingo-data.js` and change:

```js
completed: false
```

to:

```js
completed: true
```

Commit the change. The tile will show a green completion indicator on the site.

## Change the announcement

At the top of `bingo-data.js`, edit:

```js
announcement: `Your text here`
```

You can use multiple lines inside the backticks.

## Change a tile

Each tile looks like this:

```js
{
  title: "God Wars Drop",
  image: "images/tile-1.svg",
  description: "Earn an approved God Wars Dungeon unique for your team.",
  requirements: "Submit a screenshot showing the drop and player name.",
  completed: false
}
```

## Add real images

Put image files inside the `images` folder, then reference them like this:

```js
image: "images/bandos-hilt.png"
```

Use lowercase filenames without spaces when possible.

## Publish on GitHub Pages

1. Create a GitHub repository.
2. Upload all files from this folder to the repository root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.

Your repository should remain writable only by trusted clan organizers. Everyone
else can view the GitHub Pages site without being able to change it.

## Preview locally

Run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Do not double-click `index.html`, because the site loads `bingo-data.js` as a
JavaScript module.
