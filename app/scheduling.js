const robin = require('roundrobin')

function schedule(teams) {
  return robin(teams.length, teams)
}

function myGame(state) {
  return (state.schedule[state.week - 1] || []).find(s => s.includes(state.team)) // game with my team in it
}

function myOpponent(state) {
  return myGame(state).find(t => t !== state.team) // opposing team
}

module.exports = { schedule, myGame, myOpponent }
