const { add, h1, table } = require('./dom')
const { generatePlayers } = require('./players')

const myh1 = add(
  h1('Space Ball', {
    backgroundColor: 'gray',
    position: 'absolute',
  })
)

myh1.style.left = '40px'
myh1.style.top = '20px'

const players = generatePlayers(50)
