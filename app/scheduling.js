const robin = require('roundrobin')

function schedule(teams) {
  return robin(teams.length, teams)
}

// finds the next game in the schedule for the given week
// if it doesn't find one, returns null, which should advance to the next week
function nextGame(state) {
  const g = (state.schedule[state.week - 1] || []).find(g => Array.isArray(g))
  if (!g) return g
  return {
    teams: [state[g[0]], state[g[1]]],
    score: [0, 0],
    time: 1000,
  }
}

module.exports = { schedule, nextGame }
