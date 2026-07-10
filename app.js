// Import all configurable event and bingo information.
import { bingoData } from "./bingo-data.js";

/* ---------- Application state ---------- */
const state = {};

/* ---------- Frequently used page elements ---------- */
// Keeping references here avoids repeatedly searching the document.
const els = {
  startDate: document.querySelector("#startDate"),
  endDate: document.querySelector("#endDate"),
  prize: document.querySelector("#prize"),
  submissionRules: document.querySelector("#submissionRules"),
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

/* ---------- Small helper functions ---------- */

/**
 * Returns the configured display name for a team.
 */
function teamName(teamKey) {
  return bingoData.teams[teamKey].name;
}

/**
 * Builds the text shown on a tile.
 * A completed tile includes the player name when one is provided.
 */
function displayTitle(tile) {
  if (tile.completed && tile.completedBy?.trim()) {
    return `${tile.title} - ${tile.completedBy.trim()}`;
  }

  return tile.title;
}

/**
 * Reduces the tile-title font size as the title becomes longer.
 * This keeps long titles and player names inside the tile.
 */
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

/* ---------- Main rendering ---------- */

/**
 * Loads configurable event details and builds both bingo boards.
 */
function render() {
  // Event information from bingo-data.js.
  els.startDate.textContent = bingoData.eventDetails.startDate;
  els.endDate.textContent = bingoData.eventDetails.endDate;
  els.prize.textContent = bingoData.eventDetails.prize;
  els.submissionRules.textContent = bingoData.eventDetails.submissionRules;

  // Create all 25 tiles for both teams.
  renderBoards();

  // Small status label in the top banner.
  els.syncStatus.textContent = "Published from GitHub";
}

/**
 * Builds each board by cloning the tile template once per tile.
 */
function renderBoards() {
  for (const teamKey of ["teamOne", "teamTwo"]) {
    const board = document.querySelector(`#board-${teamKey}`);

    // Clear any existing tiles before rebuilding.
    board.textContent = "";

    bingoData.teams[teamKey].tiles.forEach((tile, index) => {
      const fragment = els.tileTemplate.content.cloneNode(true);
      const button = fragment.querySelector(".bingo-tile");
      const image = fragment.querySelector(".tile-image");
      const title = fragment.querySelector(".tile-title");
      const number = fragment.querySelector(".tile-number");
      const shownTitle = displayTitle(tile);

      // Apply the completed appearance when needed.
      button.classList.toggle("completed", Boolean(tile.completed));

      // Accessible description for screen readers.
      button.setAttribute(
        "aria-label",
        `${shownTitle}. ${tile.completed ? "Completed" : "Incomplete"}. Open details.`
      );

      // Load the configured image and fall back to a placeholder if it fails.
      image.src = tile.image || "images/tile-placeholder.svg";
      image.alt = "";
      image.addEventListener(
        "error",
        () => {
          image.src = "images/tile-placeholder.svg";
        },
        { once: true }
      );

      // Fill in the visible tile text and number.
      title.textContent = shownTitle;
      fitTileTitle(title, shownTitle);
      number.textContent = String(index + 1);

      // Open the expanded tile when clicked.
      button.addEventListener("click", () => openTile(teamKey, index));

      board.appendChild(fragment);
    });
  }
}

/**
 * Changes which team board is visible in the tabbed layout.
 */
function switchTeam(teamKey) {
  state.activeTeam = teamKey;

  // Update the visual and accessibility state of each tab.
  document.querySelectorAll(".team-tab").forEach(tab => {
    const active = tab.dataset.team === teamKey;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  // Show only the selected team's panel.
  document.querySelector("#panel-team-one").classList.toggle("hidden", teamKey !== "teamOne");
  document.querySelector("#panel-team-two").classList.toggle("hidden", teamKey !== "teamTwo");
}

/* ---------- Expanded tile dialog ---------- */

/**
 * Opens the larger tile view and fills it with the selected tile's data.
 */
function openTile(teamKey, index) {
  const tile = bingoData.teams[teamKey].tiles[index];

  // Large tile image.
  els.dialogImage.src = tile.image || "images/tile-placeholder.svg";
  els.dialogImage.alt = tile.title;

  // Main text.
  els.dialogTitle.textContent = tile.title;
  els.dialogDescription.textContent = tile.description;
  els.dialogRequirements.textContent = tile.requirements || "";

  // Hide the requirements section when none were entered.
  els.dialogRequirementsWrap.classList.toggle("hidden", !tile.requirements);

  // Completion status label.
  els.dialogStatus.textContent = tile.completed ? "Completed" : "Incomplete";
  els.dialogStatus.classList.toggle("complete", tile.completed);

  // Show the completing player's name only for completed tiles.
  const completedBy = tile.completedBy?.trim();
  els.dialogCompletedByWrap.classList.toggle(
    "hidden",
    !(tile.completed && completedBy)
  );
  els.dialogCompletedBy.textContent = completedBy || "";

  els.tileDialog.showModal();
}

/* ---------- Event listeners ---------- */

// Attach a click handler to each team tab.
document.querySelectorAll(".team-tab").forEach(tab => {
  tab.addEventListener("click", () => switchTeam(tab.dataset.team));
});

// Close the expanded tile when the shaded backdrop is clicked.
els.tileDialog.addEventListener("click", event => {
  if (event.target === els.tileDialog) {
    els.tileDialog.close();
  }
});

// Build the page after the module loads.
render();
