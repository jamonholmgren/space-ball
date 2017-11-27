const { TEAMS } = require('./teams')
const { schedule } = require('./scheduling')

// this "heals" state that has been corrupted or is out of date.
// it's good for when we've updated the game code but the saved game is old.
function heal(st) {
  if (st.status === 'season') {
    if (!st.schedule || st.schedule.length === 0) {
      st.schedule = schedule(TEAMS)
    }
    if (st.week < 1) {
      st.week = 1
    }
  }

  // update all energy to 100
  TEAMS.forEach(t => st[t].players.forEach(p => (p.energy = 100)))

  // reconnect team after deserialization
  if (st.game) {
    st.game.teams[0] = st[st.game.teams[0].name]
    st.game.teams[1] = st[st.game.teams[1].name]
  }

  return st
}

module.exports = { heal }
