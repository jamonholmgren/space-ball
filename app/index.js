const storage = require('electron-json-storage')
const STATE_STORAGE = 'gameState'

const TICK_DELAY = 1000

const { add, clearAll, h1 } = require('./dom')
const { generatePlayers } = require('./players')
const { autoDraftPlayer } = require('./drafting')
const { Tools, TeamTable, PlayerTable } = require('./components')

const TEAMS = [
  'mercurians',
  'venusians',
  'terrans',
  'martians',
  'jovians',
  'saturnians',
  'uranians',
  'neptunians',
]

// initial state load
storage.get(STATE_STORAGE, (err, oldState) => {
  setState(oldState)
})

const INITIAL_STATE = {
  status: 'drafting',
  drafting: TEAMS[0],
  scheduleOffset: 0,
  players: [],
  team: 'martians',
  mercurians: { wins: 0, losses: 0, players: [] },
  venusians: { wins: 0, losses: 0, players: [] },
  terrans: { wins: 0, losses: 0, players: [] },
  martians: { wins: 0, losses: 0, players: [] },
  jovians: { wins: 0, losses: 0, players: [] },
  saturnians: { wins: 0, losses: 0, players: [] },
  uranians: { wins: 0, losses: 0, players: [] },
  neptunians: { wins: 0, losses: 0, players: [] },
}

// Game state. This is where the magic happens.
let state = Object.assign({}, INITIAL_STATE)

// A game tick is an automatic advancement based on the previous
// state. So, for example, if a computer-controlled team is on the
// clock to draft a player, 1 second later they will draft using this
// tick event.
let tick = null
function setTick(st) {
  // computer is on the clock to draft
  if (st.status === 'drafting' && st.drafting !== st.team) {
    return setTimeout(() => {
      // use fresh state, since old state might be stale
      const pl = autoDraftPlayer(state)
      // draft that player for the current team
      draft(pl)
    }, TICK_DELAY)
  }
}

function setState(newState) {
  state = Object.assign({}, state, newState)

  // persist state
  storage.set(STATE_STORAGE, state)

  // if already a tick event set, clear it
  if (tick) {
    clearTimeout(tick)
  }

  tick = setTick(state)

  render(state)
}

const reset = () => {
  clear()
  setState({ players: generatePlayers(80) })
}
const clear = () => {
  storage.clear(STATE_STORAGE)
  clearTimeout(tick)
  tick = null
  setState(Object.assign({}, INITIAL_STATE))
}

function draft(player) {
  if (!player) {
    // done drafting
    setState({ status: 'season', drafting: null })
    return
  }

  const team = state.drafting
  player.team = team
  const nextTeam = TEAMS[TEAMS.indexOf(team) + 1] || TEAMS[0]
  setState({
    [team]: Object.assign({}, state[team], {
      players: [...state[team].players, player],
    }),
    drafting: nextTeam,
  })
}

function render(state) {
  clearAll()
  add(Tools(state, { onReset: reset, onClear: clear }))
  switch (state.status) {
    case 'drafting':
      add(h1(`Drafting: ${state.drafting}`))
      add(TeamTable(state, {}))
      add(PlayerTable(state, { onDraft: draft }))
      break
    default:
  }
}
