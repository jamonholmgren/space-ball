const { div, button } = require('../dom')

function Tools(state, props) {
  return div([
    button('reset', { onClick: props.onReset }),
    button('clear', { onClick: props.onClear }),
  ])
}

module.exports = { Tools }
