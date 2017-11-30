const { div, span, create, img } = require('../dom')
const { keyForValue } = require('../utils')
const { POSITIONS, playerSort, avatar } = require('../players')

const TEAM_BOX_STYLE = {
  position: 'relative',
  height: '80px',
  width: '100%',
  marginTop: '20px',
  marginBottom: '20px',
}

const PLAYER_STYLE = {
  width: '40px',
  fontSize: '10px',
  textAlign: 'center',
  position: 'absolute',
  margin: '-20px -20px -20px -20px',
  transition: 'all 0.5s',
}

const ARENA_STYLE = {
  width: '100%',
  height: '400px',
  backgroundColor: '#7b9bad',
  position: 'relative',
}

const coordinates = (position, leftright, topbottom) => {
  return {
    goalie: { [leftright]: `5%`, [topbottom]: `50%` },
    defense: { [leftright]: `25%`, [topbottom]: `20%` },
    center: { [leftright]: `45%`, [topbottom]: `50%` },
    forward: { [leftright]: `65%`, [topbottom]: `80%` },
    attack: { [leftright]: `80%`, [topbottom]: `30%` },
  }[position]
}

function TeamBox(state, { team, lineup, side }) {
  return div()
}

window.coords = []

function Players(state, props) {
  const playerDivs = [0, 1].map(side => {
    const team = state.game.teams[side]
    const lineup = state.game.lineups[side]
    const players = state[team].players.sort(playerSort)
    const topbottom = side === 0 ? 'top' : 'bottom'
    const leftright = side === 0 ? 'left' : 'right'

    return players.map((p, i) => {
      const playing = keyForValue(lineup, p)
      const coords = playing
        ? coordinates(playing, leftright, topbottom)
        : { [leftright]: `${i * 5 + 25}%`, [topbottom]: '-12%' }
        
      return div(
        [
          img(avatar(p), { title: p.name }), // avatar
          div(
            div(`${Math.floor(p.energy)}`, {
              style: {
                width: `${p.energy / 2.5}px`,
                height: '8px',
                backgroundColor: '#4c905f',
                color: 'white',
                fontSize: '8px',
              },
            }),
            {
              border: 'solid 1px #008570',
              width: `40px`,
              height: `8px`,
            }
          ),
          div(`${(p.position[0] || '').toUpperCase()}&nbsp;${p.lastName}`), // title
        ],
        {
          style: Object.assign(coords, PLAYER_STYLE),
          cache: `${side} - ${p.name}`,
          animate: [ 'left', 'right', 'top', 'bottom' ],
        }
      )
    })
  })

  return playerDivs
}

function Arena(state, props) {
  const players = Players(state, props)
  return div([].concat(players[0]).concat(players[1]), { style: ARENA_STYLE })
}

function Game(state, props) {
  return Arena(state, props)
}

module.exports = { Game }
