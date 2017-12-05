const storage = require('electron-json-storage')
const STATE_STORAGE = 'gameState'

const TICK_DELAY = 100
const SUBSTITUTION_DELAY = 5000

const INITIAL_PLAYERS_COUNT = 80 // 10 for each team

const { add, clearAll, h1, h3 } = require('./dom')
const { generatePlayers, POSITIONS } = require('./players')
const { heal } = require('./heal')
const { TEAMS } = require('./teams')
const { autoDraftPlayer } = require('./drafting')
const { schedule, nextGame } = require('./scheduling')
const { autoSubstitution } = require('./game')
const { Tools, TeamTable, PlayerTable, Game } = require('./components')

// initial state load
storage.get(STATE_STORAGE, (err, oldState) => {
  setState(heal(oldState))
})

const INITIAL_STATE = {
  status: 'drafting',
  drafting: TEAMS[0],
  schedule: [],
  week: 0,
  players: [],
  team: 'terrans',
  game: null,
  mercurians: { name: 'mercurians', wins: 0, losses: 0, players: [] },
  venusians: { name: 'venusians', wins: 0, losses: 0, players: [] },
  terrans: { name: 'terrans', wins: 0, losses: 0, players: [] },
  martians: { name: 'martians', wins: 0, losses: 0, players: [] },
  jovians: { name: 'jovians', wins: 0, losses: 0, players: [] },
  saturnians: { name: 'saturnians', wins: 0, losses: 0, players: [] },
  uranians: { name: 'uranians', wins: 0, losses: 0, players: [] },
  neptunians: { name: 'neptunians', wins: 0, losses: 0, players: [] },
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

  if (st.status === 'season' && !st.game) {
    return setTimeout(() => {
      // start a new game (with fresh state)
      setState({ game: nextGame(state) })
    }, TICK_DELAY)
  }

  if (st.status === 'game' && st.game) {
    return setTimeout(() => {
      autoSub(state)
    }, SUBSTITUTION_DELAY)
  }
}

function autoSub(state) {
  if (Object.values(state.game.lineups[0])[0]) {
    
  } else {
    const lineups = autoSubstitution(state)
    setState({ game: Object.assign({}, state.game, { lineups: lineups }) })
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

  console.log(`Current State: `, state)

  render(state)
}

const restart = () => {
  if (window.confirm(`Are you sure? You'll lose all progress.`)) {
    clear()
    setState({ players: generatePlayers(INITIAL_PLAYERS_COUNT) })
  }
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
    setState({
      status: 'season',
      drafting: null,
      filter: null,
      schedule: schedule(TEAMS),
      week: 1,
    })
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

function trade() {
  setState({ status: 'trading' })
}

function back() {
  setState({ status: 'season' })
}

function play() {
  setState({ status: 'game' })
}

function render(state) {
  clearAll()
  add(
    Tools(state, {
      onRestart: restart,
      onClear: clear,
      onTrade: trade,
      onBack: back,
      onAutoDraft: () => draft(autoDraftPlayer(state)),
      onFilter: t => () => setState({ filter: t }),
      onPlay: play,
    })
  )
  add(h1(`Season 1 - Week ${state.week}`))
  switch (state.status) {
    case 'drafting':
      add(h3(`Drafting: ${state.drafting}`))
      add(TeamTable(state, {}))
      add(PlayerTable(state, { onDraft: draft }))
      break
    case 'season':
      if (state.game) {
        add(h3(`${state.game.teams[0]} vs ${state.game.teams[1]}`))
        add(TeamTable(state, { team: state.game.teams[0] }))
        add(TeamTable(state, { team: state.game.teams[1] }))
      } else {
        add(h3(`Scheduling next game...`))
      }
      break
    case 'trading':
      add(h3(`Trading`))
      add(TeamTable(state, {}))
      break
    case 'game':
      if (state.game) {
        add(h3(`${state.game.teams[0]} vs ${state.game.teams[1]}`))
        add(Game(state))
      }
      break
    default:
  }
}
