# GodSlayersFC Bingo

This version uses GitHub Pages only. Edit `bingo-data.js` and commit the change.

## Record who completed a tile

Set both fields:

```js
completed: true,
completedBy: "The Ryanster"
```

The tile will display:

```text
God Wars Drop - The Ryanster
```

When a tile is incomplete, normally use:

```js
completed: false,
completedBy: ""
```

All 25 tile objects for both teams are explicitly written in `bingo-data.js`.
There is no loop that generates extra tiles.

## Edit a tile

```js
{
  title: "God Wars Drop",
  image: "images/tile-1.svg",
  description: "Earn an approved God Wars Dungeon unique for your team.",
  requirements: "Submit a screenshot showing the drop, player name, and game message.",
  completed: false,
  completedBy: ""
}
```

Commit changes through GitHub. Visitors do not receive editing controls.

## Layout

Both 5×5 boards are displayed side by side on wide screens. On smaller screens,
they automatically stack vertically so the tiles remain readable.


## Edit the event information

Open `bingo-data.js` and edit:

```js
eventDetails: {
  startDate: "August 1, 2026",
  endDate: "August 31, 2026",
  prize: "Enter prize information here",
  submissionRules: "Enter submission rules here"
}
```

The Discord button is configured in `index.html`.


## Recommended image size

Tile and expanded images now use a 4:3 aspect ratio.

Recommended sizes:

```text
1200 × 900 pixels
800 × 600 pixels
```

Use the same aspect ratio for every image. The site uses `object-fit: cover`, so
images with a different ratio may be cropped around the edges.


## Comments in the project

The main project files now include section comments:

- `index.html` explains the page structure.
- `styles.css` is divided into labelled visual sections.
- `app.js` documents each function, helper, and event listener.
- `bingo-data.js` includes an editing guide and field descriptions.

Comments do not change the behavior of the site.
