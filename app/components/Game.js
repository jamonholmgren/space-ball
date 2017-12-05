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
  padding: '2px',
  transition: 'all 0.5s',
  borderRadius: '8px',
  overflow: 'hidden',
}

const ARENA_STYLE = {
  width: '100%',
  height: '400px',
  backgroundColor: '#2C313C',
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
      
      const teamColor = {
        backgroundColor: side === 0 ? '#6DDAFE' : '#C72B43'
      }
        
      return div(
        [
          img(avatar(p), { title: p.name, style: { borderRadius: '8px 8px 0 0', overflow: 'hidden', } }), // avatar
          div(`${(p.position[0] || '').toUpperCase()}&nbsp;${p.lastName}`), // title
          div(
            div(`${Math.floor(p.energy)}`, {
              style: {
                width: `${p.energy / 2.5}px`,
                height: '10px',
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
        ],
        {
          style: Object.assign({}, PLAYER_STYLE, coords, teamColor),
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
