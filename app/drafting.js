const { POSITIONS } = require('./players')
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
    pos => state[state.team].players.filter(p => p.position === pos).length < 2
  )

  // if no current needs, then draft whatever
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

module.exports = { autoDraftPlayer }
