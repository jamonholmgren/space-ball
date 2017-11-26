const { randomFirst, randomLast } = require('./names')
const { rand } = require('./utils')

const POSITIONS = ['Attack', 'Forward', 'Center', 'Defense', 'Goalie']
const randPosition = () => POSITIONS[rand(0, 4)]

const playerFilter = filter => p => {
  if (POSITIONS.includes(filter)) return p.position === filter
  if (filter === 'undrafted') return !p.team
  return true
}

const overallRating = p => Math.floor((p.athlete + p.offense + p.defense + p.potential) / 4)

const playerRating = p => {
  return (
    (p >= 95 && 'A+') ||
    (p >= 91 && 'A') ||
    (p >= 87 && 'A-') ||
    (p >= 83 && 'B+') ||
    (p >= 79 && 'B') ||
    (p >= 75 && 'B-') ||
    (p >= 71 && 'C+') ||
    (p >= 67 && 'C') ||
    (p >= 63 && 'C-') ||
    (p >= 59 && 'D+') ||
    (p >= 55 && 'D') ||
    (p >= 50 && 'D-') ||
    'F'
  )
}

const strings = {
  veryYoung: ['very young', 'one of the youngest in the league', 'quite young'],
  young: ['up and coming', 'still pretty young'],
  prime: ['prime age', 'at a good age'],
  declining: ['is starting to decline', 'probably past prime', 'declining'],
  retirement: ['is nearing retirement', 'well past prime', 'getting older'],
  bad: [`probably not a big league player`, 'pretty unimpressive', 'unlikely to be drafted'],
  average: ['nothing really stands out', 'lacks a go-to skill set', `nothing too impressive`],
  awesome: [`one of the best in the league`, 'future hall-of-famer', 'likely all-star'],
  athletic: ['excellent athletic ability', 'very athletic', 'athletically gifted'],
  averageAthlete: ['average athletic ability', `isn't a breakout athlete`],
  badAthlete: ['questionable athleticism', `not an athlete`, `struggles to keep up`],
  offensive: ['can score the ball', 'dynamic offensive player', 'true scorer'],
  averageOffensive: [`has some holes in offensive game`, `shows flashes on offensive side`],
  badOffensive: [`can't really score`, `lacks any sort of offensive game`],
  defensive: ['defends very aggressively', 'good defender', 'will impact the defensive end'],
  averageDefensive: [`won't hurt you on defense`, 'average defender'],
  badDefensive: [`not much of a defender`, 'defends poorly', 'lacks defensive skill'],
  potential: ['displays a lot of potential', 'will likely get better', 'could improve a lot'],
  averagePotential: ['jury is out on potential', `not sure if will improve`, 'might improve'],
  badPotential: ['unlikely to improve', `not much potential`, `don't expect to improve`],
}

const reportFor = item =>
  (strings[item] && strings[item][rand(0, strings[item].length - 1)]) || `NONE: ${item}`

const playerReport = p => {
  const report = []

  const ratings = ['athlete', 'offense', 'defense', 'potential']
  const GOOD = 80 // to 99
  const AVERAGE = 65 // to 79

  const goodAt = ratings.filter(r => p[r] >= GOOD)
  const badAt = ratings.filter(r => p[r] < AVERAGE)
  const averageAt = ratings.filter(r => p[r] >= AVERAGE && p[r] < GOOD)

  // young player
  p.age < 22 && report.push(reportFor('veryYoung'))
  p.age >= 22 && p.age < 25 && report.push(reportFor('young'))
  p.age >= 25 && p.age < 32 && report.push(reportFor('prime'))
  p.age >= 32 && p.age < 35 && report.push(reportFor('declining'))
  p.age >= 35 && report.push(reportFor('retirement'))

  goodAt.length === 4 && report.push(reportFor('awesome'))
  badAt.length === 4 && report.push(reportFor('bad'))
  averageAt.length === 4 && report.push(reportFor('average'))

  goodAt.includes('athlete') && report.push(reportFor('athletic'))
  goodAt.includes('offense') && report.push(reportFor('offensive'))
  goodAt.includes('defense') && report.push(reportFor('defensive'))
  goodAt.includes('potential') && report.push(reportFor('potential'))

  averageAt.includes('athlete') && report.push(reportFor('averageAthlete'))
  averageAt.includes('offense') && report.push(reportFor('averageOffensive'))
  averageAt.includes('defense') && report.push(reportFor('averageDefensive'))
  averageAt.includes('potential') && report.push(reportFor('averagePotential'))

  badAt.includes('athlete') && report.push(reportFor('badAthlete'))
  badAt.includes('offense') && report.push(reportFor('badOffensive'))
  badAt.includes('defense') && report.push(reportFor('badDefensive'))
  badAt.includes('potential') && report.push(reportFor('badPotential'))

  // now remove an item, randomly
  report.splice(Math.floor(Math.random() * report.length), 1)

  return report.join('...')
}

// draft players
const generatePlayer = () => {
  const p = {
    firstName: randomFirst(),
    lastName: randomLast(),
    age: rand(18, 38),
    position: randPosition(),
    team: undefined,
  }

  // forward positions are generally better at offense, goalie better at defense
  // goalie = 2, center = 0, attack = -2
  // This gives a boost of 20 to one and a penalty of 20 to the other
  // Goalie minimum 70 defensive rating, attack minimum 50
  // Attack minimum 70 offensive rating, goalie minimum 50
  const defensive = POSITIONS.indexOf(p.position) - 2
  p.offense = rand(60 - 5 * defensive, 99)
  p.defense = rand(60 + 5 * defensive, 99)

  // top-end potential and athletic ability drops by 5 for every year over X years old
  p.potential = rand(50, 99 - 5 * Math.max(0, p.age - 27))
  p.athlete = rand(50, 99 - 5 * Math.max(0, p.age - 31))
  p.overall = overallRating(p)
  p.name = `${p.firstName} ${p.lastName}`
  p.scoutRating = Math.min(rand(p.overall - 15, p.overall + 15), 99)
  p.rating = playerRating(p.scoutRating)
  p.report = playerReport(p)
  return p
}
const generatePlayers = num => [...Array(num)].map(generatePlayer)

const playerSort = (a, b) => {
  let s = POSITIONS.indexOf(a.position) - POSITIONS.indexOf(b.position)
  if (s !== 0) return s
  s = b.scoutRating - a.scoutRating
  if (s !== 0) return s
  return a.name.localeCompare(b.name)
}

module.exports = { generatePlayers, generatePlayer, playerFilter, playerSort, POSITIONS }
