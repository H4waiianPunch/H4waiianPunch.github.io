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
