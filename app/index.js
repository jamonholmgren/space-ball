const storage = require('electron-json-storage')
const STATE_STORAGE = 'gameState'

const { add, button, clearAll } = require('./dom')
const { generatePlayers } = require('./players')
const { Tools } = require('./Tools')
const { TeamTable } = require('./TeamTable')
const { PlayerTable } = require('./PlayerTable')

// const myh1 = add(
//   h1('Space Ball', {
//     backgroundColor: 'gray',
//     position: 'absolute',
//   })
// )

// myh1.style.left = '40px'
// myh1.style.top = '20px'

// initial state load
storage.get(STATE_STORAGE, (err, oldState) => {
  setState(oldState)
})

const INITIAL_STATE = { players: [], team: [] }

let state = Object.assign({}, INITIAL_STATE)
function setState(newState) {
  state = Object.assign({}, state, newState)

  // persist state
  storage.set(STATE_STORAGE, state)

  render(state)
}

const reset = () => setState({ players: generatePlayers(80) })
const clear = () => storage.clear(STATE_STORAGE) || setState(Object.assign({}, INITIAL_STATE))

const draft = player => {
  player.team = 'Player'
  setState({ team: [...state.team, player] })
}

function render(state) {
  clearAll()
  add(Tools(state, { onReset: reset, onClear: clear }))
  add(TeamTable(state, {}))
  add(PlayerTable(state, { onDraft: draft }))
}
