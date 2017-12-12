const robin = require('roundrobin')

const { TEAMS } = require('./teams')

function schedule(teams) {
  return robin(teams.length, teams)
}

// starts a new season
function startSeason(state) {
  return {
    status: 'season',
    drafting: null,
    filter: null,
    schedule: schedule(TEAMS),
    week: state.week + 1,
  }
}

// finds the next game in the schedule for the given week
// if it doesn't find one, returns null, which should advance to the next week
function findNextGame(state) {
  const g = (state.schedule[state.week - 1] || []).find(g => Array.isArray(g))
  if (!g) return g
  return {
    teams: [g[0], g[1]],
    lineups: [
      {
        goalie: null,
        defense: null,
        center: null,
        forward: null,
        attack: null,
      },
      {
        goalie: null,
        defense: null,
        center: null,
        forward: null,
        attack: null,
      },
    ],
    ball: {
      side: 0, // 0 or 1, depends what team has it -- or null if neither
      possession: 'goalie', // could be `center`, `forward`, etc
    },
    score: [0, 0],
    time: 1000,
  }
}

function nextGame(state) {
  return {
    game: findNextGame(state),
  }
}

function startGame(state) {
  return {
    status: 'game',
    game: state.game || setNextGame(state),
  }
}

module.exports = { startSeason, nextGame, startGame }
