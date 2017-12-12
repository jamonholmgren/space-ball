const { add, clearAll, h1, h3 } = require('./dom')
const { Tools, TeamTable, PlayerTable, Game } = require('./components')

function render(state, props) {
  clearAll()
  add(
    Tools(state, {
      onAutoDraft: props.onAutoDraft,
      onBack: props.onBack,
      onClear: props.onClear,
      onFilter: props.onFilter,
      onPlay: props.onPlay,
      onRestart: props.onRestart,
      onTrade: props.onTrade,
    })
  )
  add(h1(`Season 1 - Week ${state.week}`))
  switch (state.status) {
    case 'drafting':
      add(h3(`Drafting: ${state.drafting}`))
      add(TeamTable(state, {}))
      add(PlayerTable(state, { onDraft: props.onDraft }))
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

module.exports = { render }
