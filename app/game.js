const { POSITIONS } = require('./players')
const { findTeam } = require('./teams')

// returns an optimized lineup for each team in the current game
const autoSubstitution = state => {
  return state.game.teams.map(name => {
    const players = findTeam(state, name).players
    // finding the right lineup is complex
    // first, we rank all the players for each position
    // keeping in mind their preferred position
    // then, we assign each candidate
    // resting players are dropped back until they're fully rested
    // (we may want to revisit this idea later)
    const ranks = POSITIONS.reduce((acc, pos) => {
      const rankings = players.slice().sort((a, b) => {
        // each starts with 10 points
        let aRank = 10
        let bRank = 10

        // depending on how far away from the current position it is, the rank will drop a lot
        aRank -= Math.abs(POSITIONS.indexOf(a.position) - POSITIONS.indexOf(pos)) * 3
        bRank -= Math.abs(POSITIONS.indexOf(b.position) - POSITIONS.indexOf(pos)) * 3

        // if the player is resting, loses 4 rank points
        if (a.status === 'resting') aRank -= 4
        if (b.status === 'resting') bRank -= 4

        // if the player is injured, loses 6 rank points
        if (a.status === 'injured') aRank -= 6
        if (b.status === 'injured') bRank -= 6

        a.rank = a.rank || {}
        b.rank = b.rank || {}

        a.rank[pos] = aRank
        b.rank[pos] = bRank

        // whichever player is better, they gain 2 points
        if (a.scoutRating > b.scoutRating) aRank += 2
        if (b.scoutRating > a.scoutRating) bRank += 2

        return bRank - aRank || b.scoutRating - a.scoutRating
      })
      return Object.assign(acc, { [pos]: rankings })
    }, {})

    // now that we have ranked them, we need to grab the ones who are well suited for their position first
    // since we don't want them playing a different position
    let lineup = {}
    POSITIONS.forEach(pos => {
      if (ranks[pos][0].position === pos) {
        // good to go
        lineup[pos] = ranks[pos][0]
      }
    })

    // if we still have holes, let's fill those with the next best player
    POSITIONS.forEach(pos => {
      if (!lineup[pos]) {
        lineup[pos] = ranks[pos].find(p => !Object.values(lineup).includes(p))
      }
    })

    return lineup
  })
}

function autoSub(state) {
  if (Object.values(state.game.lineups[0])[0]) return

  const lineups = autoSubstitution(state)
  const ball = { side: 1, possession: 'defense' }
  return { game: Object.assign({}, state.game, { lineups: lineups, ball: ball }) }
}

function gameTick(state) {
  const st = autoSub(state)
  return st
}

module.exports = {
  autoSubstitution,
  gameTick,
}
