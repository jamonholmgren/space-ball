const { div, button } = require('../dom')

function Tools(state, props) {
  return div([
    button('reset', { onClick: props.onReset }),
    state.status === 'season' && button('trade', { onClick: props.onTrade }),
    state.status === 'trading' && button('back', { onClick: props.onBack }),
  ])
}

module.exports = { Tools }
