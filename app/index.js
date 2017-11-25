const { add, h1, table } = require('./dom')
const { generatePlayers } = require('./players')

// const myh1 = add(
//   h1('Space Ball', {
//     backgroundColor: 'gray',
//     position: 'absolute',
//   })
// )

// myh1.style.left = '40px'
// myh1.style.top = '20px'

const players = generatePlayers(150)

const playerRows = [
  [
    'name',
    'age',
    'position',
    'athlete',
    'offense',
    'defense',
    'potential',
    // 'overall',
    'rating',
    'report',
  ],
  ...players.sort((a, b) => b.scoutRating - a.scoutRating).map(p => [
    p.name,
    p.age,
    p.position,
    p.athlete,
    p.offense,
    p.defense,
    p.potential,
    // p.overall,
    p.rating,
    p.report,
  ]),
]

add(table(playerRows))