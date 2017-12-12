const storage = require('electron-json-storage')
const { generatePlayers, POSITIONS } = require('./players')
const { heal } = require('./heal')
const { TEAMS, initTeams } = require('./teams')
const { draft, autoDraftPlayer } = require('./drafting')
const { startSeason, nextGame, startGame } = require('./scheduling')
const { autoSubstitution, gameTick } = require('./game')
const { render } = require('./render.js')

// Where to store the game state for reloading on subsequent app opens.
// This will probably end up changing based on what "save slot" the user
// chooses when they open the game. Like, `gameState-01`.
const STATE_STORAGE = 'gameState'

// How fast the game plays, in milliseconds.
const GAMETICK_DELAY = 100

// Total players generated when you start the game for the first time.
// There are 8 teams, so 8 * 10 roster spots = 80 players
const INITIAL_PLAYERS_COUNT = 80

const INITIAL_STATE = {
  status: 'drafting',
  drafting: TEAMS[0],
  schedule: [],
  week: 0,
  players: [],
  team: 'terrans',
  game: null,
  teams: initTeams(),
}

// Initialize game state. This is where the magic happens
let state = {}

// This is the primary function for changing game state.
// It also re-renders with the new state.
function setState(newState) {
  if (!newState) return

  // simple flat merge of new state
  state = Object.assign({}, state, newState)

  // persist state
  storage.set(STATE_STORAGE, state)

  // log new state
  console.log(`Current State: `, state)

  // rerender everything with the new state
  // also pass down any functions that need to run
  render(state, {
    onAutoDraft: () => setState(draft(state, autoDraftPlayer(state))),
    onBack: () => setState({ status: 'season' }),
    onClear: resetToInitialState,
    onDraft: player => setState(draft(state, player)),
    onFilter: t => () => setState({ filter: t }),
    onPlay: () => setState(startGame(state)),
    onRestart: restart,
    onTrade: () => setState({ status: 'trading' }),
  })
}

// Completely restart the game.
function restart() {
  if (window.confirm(`Are you sure? You'll lose all progress.`)) {
    resetToInitialState()
    setState(generatePlayers(state, INITIAL_PLAYERS_COUNT))
  }
}

// Blow away all saved games, reset back to initial.
function resetToInitialState() {
  storage.clear(STATE_STORAGE)
  setState(Object.assign({}, INITIAL_STATE))
}

// Main game loop.
function tick() {
  if (state.status === 'drafting' && state.drafting !== state.team) {
    const player = autoDraftPlayer(state)
    if (player) {
      return setState(draft(state, player))
    } else {
      // all players are drafted, start the season
      return setState(startSeason(state))
    }
  }

  if (state.status === 'season' && !state.game) {
    // load the next game
    return setState(nextGame(state))
  }

  if (state.status === 'game' && state.game) {
    return setState(gameTick(state))
  }
}
setInterval(tick, GAMETICK_DELAY)

// Let's kick things off, initialize state and load any saved state
storage.get(STATE_STORAGE, (err, oldState) => {
  if (oldState) {
    setState(heal(oldState))
  } else {
    setState(INITIAL_STATE)
  }
})
