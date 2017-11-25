const { randomFirst, randomLast } = require('./names')
const { rand } = require('./utils')

const overallRating = player => Math.floor((player.athlete + player.offense + player.defense) / 3)

// draft players
const generatePlayer = () => {
  const q = {
    firstName: randomFirst(),
    lastName: randomLast(),
    age: rand(18, 28),
    athlete: rand(50, 99),
    offense: rand(50, 99),
    defense: rand(50, 99),
  }
  q.overall = overallRating(q)
  q.name = `${q.firstName} ${q.lastName}`
  return q
}
const generatePlayers = num => [...Array(num)].map(generatePlayer)

module.exports = { generatePlayers, generatePlayer }
