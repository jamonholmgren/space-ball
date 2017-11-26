const { div, button } = require('../dom')

function Tools(state, props) {
  let buttons = [button('restart', { onClick: props.onRestart })]

  if (state.status === 'season') {
    buttons = [
      ...buttons,
      button('trade', { onClick: props.onTrade }),
      button('play', { onClick: props.onPlay }),
    ]
  }

  if (state.status === 'trading') {
    buttons = [...buttons, button('back', { onClick: props.onBack })]
  }

  if (state.status === 'game') {
    buttons = [...buttons, button('back', { onClick: props.onBack })]
  }

  if (state.status === 'drafting') {
    buttons = [
      ...buttons,
      button('clear filters', { onClick: props.onFilter(null) }),
      button('goalies', { onClick: props.onFilter('Goalie') }),
      button('defense', { onClick: props.onFilter('Defense') }),
      button('centers', { onClick: props.onFilter('Center') }),
      button('forwards', { onClick: props.onFilter('Forward') }),
      button('attacks', { onClick: props.onFilter('Attack') }),
      button('undrafted', { onClick: props.onFilter('undrafted') }),
      state.drafting === state.team && button('auto pick player', { onClick: props.onAutoDraft }),
    ]
  }

  return div(buttons)
}

module.exports = { Tools }
