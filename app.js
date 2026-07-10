import { bingoData } from "./bingo-data.js";

const state = {};

const els = {
  announcement: document.querySelector("#announcement"),
  syncStatus: document.querySelector("#syncStatus"),
  tileDialog: document.querySelector("#tileDialog"),
  dialogImage: document.querySelector("#dialogImage"),
  dialogStatus: document.querySelector("#dialogStatus"),
  dialogTitle: document.querySelector("#dialogTitle"),
  dialogDescription: document.querySelector("#dialogDescription"),
  dialogRequirements: document.querySelector("#dialogRequirements"),
  dialogRequirementsWrap: document.querySelector("#dialogRequirementsWrap"),
  dialogCompletedByWrap: document.querySelector("#dialogCompletedByWrap"),
  dialogCompletedBy: document.querySelector("#dialogCompletedBy"),
  tileTemplate: document.querySelector("#tileTemplate")
};

function teamName(teamKey) {
  return bingoData.teams[teamKey].name;
}

function displayTitle(tile) {
  if (tile.completed && tile.completedBy?.trim()) {
    return `${tile.title} - ${tile.completedBy.trim()}`;
  }
  return tile.title;
}

function fitTileTitle(element, text) {
  const length = text.length;
  let size = 0.88;

  if (length > 55) size = 0.58;
  else if (length > 45) size = 0.64;
  else if (length > 35) size = 0.70;
  else if (length > 27) size = 0.76;
  else if (length > 20) size = 0.82;

  element.style.fontSize = `${size}rem`;
}

function render() {
  els.announcement.textContent = bingoData.announcement;
  renderBoards();
  renderProgress();
  els.syncStatus.textContent = "Published from GitHub";
}

function renderBoards() {
  for (const teamKey of ["teamOne", "teamTwo"]) {
    const board = document.querySelector(`#board-${teamKey}`);
    board.textContent = "";

    bingoData.teams[teamKey].tiles.forEach((tile, index) => {
      const fragment = els.tileTemplate.content.cloneNode(true);
      const button = fragment.querySelector(".bingo-tile");
      const image = fragment.querySelector(".tile-image");
      const title = fragment.querySelector(".tile-title");
      const number = fragment.querySelector(".tile-number");
      const shownTitle = displayTitle(tile);

      button.classList.toggle("completed", Boolean(tile.completed));
      button.setAttribute(
        "aria-label",
        `${shownTitle}. ${tile.completed ? "Completed" : "Incomplete"}. Open details.`
      );

      image.src = tile.image || "images/tile-placeholder.svg";
      image.alt = "";
      image.addEventListener("error", () => {
        image.src = "images/tile-placeholder.svg";
      }, { once: true });

      title.textContent = shownTitle;
      fitTileTitle(title, shownTitle);
      number.textContent = String(index + 1);
      button.addEventListener("click", () => openTile(teamKey, index));
      board.appendChild(fragment);
    });
  }
}

function renderProgress() {
  for (const teamKey of ["teamOne", "teamTwo"]) {
    const tiles = bingoData.teams[teamKey].tiles;
    const complete = tiles.filter(tile => tile.completed).length;
    document.querySelector(`#progress-${teamKey}`).textContent =
      `${complete} of ${tiles.length} tiles completed`;
  }
}

function openTile(teamKey, index) {
  const tile = bingoData.teams[teamKey].tiles[index];

  els.dialogImage.src = tile.image || "images/tile-placeholder.svg";
  els.dialogImage.alt = tile.title;
  els.dialogTitle.textContent = tile.title;
  els.dialogDescription.textContent = tile.description;
  els.dialogRequirements.textContent = tile.requirements || "";
  els.dialogRequirementsWrap.classList.toggle("hidden", !tile.requirements);
  els.dialogStatus.textContent = tile.completed ? "Completed" : "Incomplete";
  els.dialogStatus.classList.toggle("complete", tile.completed);

  const completedBy = tile.completedBy?.trim();
  els.dialogCompletedByWrap.classList.toggle("hidden", !(tile.completed && completedBy));
  els.dialogCompletedBy.textContent = completedBy || "";

  els.tileDialog.showModal();
}


render();
