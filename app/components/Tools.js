const { div, button } = require('../dom')

function Tools(state, props) {
  return div([
    button('restart', { onClick: props.onRestart }),
    button('clear filters', { onClick: props.onFilter(null) }),
    button('goalies', { onClick: props.onFilter('Goalie') }),
    button('defense', { onClick: props.onFilter('Defense') }),
    button('centers', { onClick: props.onFilter('Center') }),
    button('forwards', { onClick: props.onFilter('Forward') }),
    button('attacks', { onClick: props.onFilter('Attack') }),
    button('undrafted', { onClick: props.onFilter('undrafted') }),
    state.status === 'drafting' && button('auto pick player', { onClick: props.onAutoDraft }),
    state.status === 'season' && button('trade', { onClick: props.onTrade }),
    state.status === 'trading' && button('back', { onClick: props.onBack }),
  ])
}

module.exports = { Tools }
