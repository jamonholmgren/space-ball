const { div, h1, create } = require('../dom')
const { POSITIONS, playerSort } = require('../players')

function TeamBox(state, { team }) {
  const players = state[team].players.sort(playerSort)
  return div(players.map(p => create('div')(p.name)))
}

function Game(state, { teams }) {
  return div([TeamBox(state, { team: teams[0] }), TeamBox(state, { team: teams[1] })])
}

module.exports = { Game }
