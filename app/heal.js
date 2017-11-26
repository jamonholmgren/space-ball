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

  return st
}

module.exports = { heal }
