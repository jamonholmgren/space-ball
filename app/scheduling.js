const robin = require('roundrobin')

function schedule(teams) {
  return robin(teams.length, teams)
}

module.exports = { schedule }
