const { div, button } = require('../dom')

function Tools(state, props) {
  return div([
    button('restart', { onClick: props.onRestart }),
    state.status === 'drafting' && button('auto pick player', { onClick: props.onAutoDraft }),
    state.status === 'season' && button('trade', { onClick: props.onTrade }),
    state.status === 'trading' && button('back', { onClick: props.onBack }),
  ])
}

module.exports = { Tools }
