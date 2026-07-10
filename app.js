import { bingoData } from "./bingo-data.js";

const state = {
  activeTeam: "teamOne",
  selectedTeam: null,
  selectedTileIndex: null
};

const els = {
  announcement: document.querySelector("#announcement"),
  progressSummary: document.querySelector("#progressSummary"),
  syncStatus: document.querySelector("#syncStatus"),
  tileDialog: document.querySelector("#tileDialog"),
  dialogImage: document.querySelector("#dialogImage"),
  dialogStatus: document.querySelector("#dialogStatus"),
  dialogTitle: document.querySelector("#dialogTitle"),
  dialogDescription: document.querySelector("#dialogDescription"),
  dialogRequirements: document.querySelector("#dialogRequirements"),
  dialogRequirementsWrap: document.querySelector("#dialogRequirementsWrap"),
  tileTemplate: document.querySelector("#tileTemplate")
};

function teamName(teamKey) {
  return bingoData.teams[teamKey].name;
}

function activeTiles() {
  return bingoData.teams[state.activeTeam].tiles;
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

      button.classList.toggle("completed", Boolean(tile.completed));
      button.setAttribute(
        "aria-label",
        `${tile.title}. ${tile.completed ? "Completed" : "Incomplete"}. Open details.`
      );

      image.src = tile.image || "images/tile-placeholder.svg";
      image.alt = "";
      image.addEventListener(
        "error",
        () => {
          image.src = "images/tile-placeholder.svg";
        },
        { once: true }
      );

      title.textContent = tile.title;
      number.textContent = String(index + 1);
      button.addEventListener("click", () => openTile(teamKey, index));
      board.appendChild(fragment);
    });
  }
}

function renderProgress() {
  const tiles = activeTiles();
  const complete = tiles.filter(tile => tile.completed).length;
  els.progressSummary.textContent =
    `${teamName(state.activeTeam)} has completed ${complete} of ${tiles.length} tiles.`;
}

function switchTeam(teamKey) {
  state.activeTeam = teamKey;

  document.querySelectorAll(".team-tab").forEach(tab => {
    const active = tab.dataset.team === teamKey;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  document.querySelector("#panel-team-one").classList.toggle("hidden", teamKey !== "teamOne");
  document.querySelector("#panel-team-two").classList.toggle("hidden", teamKey !== "teamTwo");
  renderProgress();
}

function openTile(teamKey, index) {
  const tile = bingoData.teams[teamKey].tiles[index];
  state.selectedTeam = teamKey;
  state.selectedTileIndex = index;

  els.dialogImage.src = tile.image || "images/tile-placeholder.svg";
  els.dialogImage.alt = tile.title;
  els.dialogTitle.textContent = tile.title;
  els.dialogDescription.textContent = tile.description;
  els.dialogRequirements.textContent = tile.requirements || "";
  els.dialogRequirementsWrap.classList.toggle("hidden", !tile.requirements);
  els.dialogStatus.textContent = tile.completed ? "Completed" : "Incomplete";
  els.dialogStatus.classList.toggle("complete", tile.completed);

  els.tileDialog.showModal();
}

document.querySelectorAll(".team-tab").forEach(tab => {
  tab.addEventListener("click", () => switchTeam(tab.dataset.team));
});

render();
