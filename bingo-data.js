export const bingoData = {
  announcement: `Welcome to the GodSlayersFC Bingo!

Add event dates, submission rules, prize details, and important announcements here.`,

  teams: {
    teamOne: {
      name: "Team Saradomin",
      tiles: [
        {
          title: "God Wars Drop",
          image: "images/tile-1.svg",
          description: "Earn an approved God Wars Dungeon unique for your team.",
          requirements: "Submit a screenshot showing the drop, player name, and game message.",
          completed: true
        },
        {
          title: "Barrows Unique",
          image: "images/tile-2.svg",
          description: "Receive any approved Barrows equipment piece.",
          requirements: "The screenshot must clearly show the reward chest result.",
          completed: false
        },
        {
          title: "Clue Scroll Reward",
          image: "images/tile-3.svg",
          description: "Receive an approved clue scroll unique.",
          requirements: "Submit the clue reward interface or collection log update.",
          completed: false
        },
        {
          title: "Slayer Boss Unique",
          image: "images/tile-4.svg",
          description: "Obtain an approved unique from a Slayer boss.",
          requirements: "The drop must be earned during the bingo event.",
          completed: true
        },
        {
          title: "Raid Purple",
          image: "images/tile-5.svg",
          description: "Receive a purple chest from an approved raid.",
          requirements: "Submit the raid completion and reward screenshot.",
          completed: true
        }
      ]
    },

    teamTwo: {
      name: "Team Zamorak",
      tiles: [
        {
          title: "God Wars Drop",
          image: "images/tile-1.svg",
          description: "Earn an approved God Wars Dungeon unique for your team.",
          requirements: "Submit a screenshot showing the drop, player name, and game message.",
          completed: false
        },
        {
          title: "Barrows Unique",
          image: "images/tile-2.svg",
          description: "Receive any approved Barrows equipment piece.",
          requirements: "The screenshot must clearly show the reward chest result.",
          completed: false
        },
        {
          title: "Clue Scroll Reward",
          image: "images/tile-3.svg",
          description: "Receive an approved clue scroll unique.",
          requirements: "Submit the clue reward interface or collection log update.",
          completed: false
        },
        {
          title: "Slayer Boss Unique",
          image: "images/tile-4.svg",
          description: "Obtain an approved unique from a Slayer boss.",
          requirements: "The drop must be earned during the bingo event.",
          completed: false
        },
        {
          title: "Raid Purple",
          image: "images/tile-5.svg",
          description: "Receive a purple chest from an approved raid.",
          requirements: "Submit the raid completion and reward screenshot.",
          completed: false
        }
      ]
    }
  }
};

// Fill each team to 25 tiles by copying and renaming the examples above.
// You can replace every generated tile with your real bingo entries.
for (const team of Object.values(bingoData.teams)) {
  const originals = [...team.tiles];
  while (team.tiles.length < 25) {
    const source = originals[team.tiles.length % originals.length];
    const tileNumber = team.tiles.length + 1;

    team.tiles.push({
      ...source,
      title: `${source.title} ${tileNumber}`,
      completed: false
    });
  }
}
