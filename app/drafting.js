const { POSITIONS } = require('./players')
const { TEAMS, findTeam } = require('./teams')
const { rand } = require('./utils')

const autoDraftPlayer = state => {
  // figure out who is remaining on the board, sorted by scout rating
  const remainingPlayers = state.players
    .filter(p => !p.team)
    .sort((a, b) => b.scoutRating - a.scoutRating)

  // nothing left?
  if (remainingPlayers.length <= 0) return

  // figure out what positions we need to draft for
  let needs = POSITIONS.filter(
    pos => findTeam(state, state.drafting).players.filter(p => p.position === pos).length < 1
  )

  // if no current needs, then draft whoever is best
  if (needs.length === 0) needs = POSITIONS

  // randomly try to find a suitable player in the top 5
  // try 5 times ... see if one turns up
  for (let c = 0; c < 5; c++) {
    const i = rand(0, 5)
    const p = remainingPlayers[i]
    if (p && needs.includes(p.position)) return p
  }

  // didn't find something suitable, so just look for the first player that fits our needs
  // in the top 10 remaining players
  for (let i = 0; i < 10; i++) {
    const p = remainingPlayers[i]
    if (p && needs.includes(p.position)) return p
  }

  // didn't find any player in our current need set, so just return the best remaining player
  return remainingPlayers[0]
}

function draft(state, player) {
  if (!player) return

  const team = findTeam(state, state.drafting)
  player.team = team.name
  const nextTeam = TEAMS[TEAMS.indexOf(team.name) + 1] || TEAMS[0]
  return {
    teams: state.teams.map(t => {
      if (t.name !== team.name) return t
      return Object.assign({}, team, {
        players: [...team.players, player],
      })
    }),
    drafting: nextTeam,
  }
}

module.exports = { draft, autoDraftPlayer }
