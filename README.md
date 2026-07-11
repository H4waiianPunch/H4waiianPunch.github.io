# GodSlayersFC Raids Event

Edit `raids-data.js`.

Progress:
```js
currentKC: 42,
goalKC: 100
```

Complete a tile:
```js
completed: true,
completedBy: "The Ryanster"
```

All 42 tiles are explicitly written in the data file.


## Why the Old School RuneScape Wiki URL did not work

This is a normal webpage URL, not a direct image file:

```text
https://oldschool.runescape.wiki/w/Chambers_of_Xeric#/media/File:Chambers_of_Xeric_logo.png
```

An `<img>` needs a direct image response ending in an actual image path. The most
reliable option is to save the image in this repository and use:

```js
image: "images/cox-logo.png"
```

This project now includes:

```text
images/cox-logo.png
images/tob-logo.png
images/toa-logo.png
```

## Team direction

- Team One tiles and KC progress run left-to-right.
- Team Two tiles and KC progress run right-to-left.


## Team 2 numbering

Team 2 is visually reversed with CSS. The tile numbers remain assigned in normal
data order (`1` through `7`), which makes the visible left-to-right order:

```text
7 6 5 4 3 2 1
```
