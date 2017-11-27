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

const coordinates = (position, leftright) => {
  return {
    goalie: { [leftright]: `5%`, top: `50%` },
    defense: { [leftright]: `25%`, top: `20%` },
    center: { [leftright]: `45%`, top: `50%` },
    forward: { [leftright]: `65%`, top: `80%` },
    attack: { [leftright]: `80%`, top: `30%` },
  }[position]
}

function TeamBox(state, { team, lineup, side }) {
  return div()
}

function Arena(state, props) {
  const playerDivs = [0, 1].map(side => {
    const team = state.game.teams[side]
    const lineup = state.game.lineups[side]
    const players = team.players.sort(playerSort)
    const topbottom = side === 0 ? 'top' : 'bottom'
    const leftright = side === 0 ? 'left' : 'right'

    return players.map((p, i) => {
      const playing = keyForValue(lineup, p)
      const coords = playing
        ? coordinates(playing, leftright)
        : { left: `${i * 5 + 25}%`, [topbottom]: '-12%' }

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
          div(`${p.position[0]}&nbsp;${p.lastName}`), // title
        ],
        {
          style: Object.assign(coords, PLAYER_STYLE),
        },
        ARENA_STYLE
      )
    })
  })

  return div([].concat(playerDivs[0]).concat(playerDivs[1]), { style: ARENA_STYLE })
}

function Game(state, props) {
  return Arena(state)
}

module.exports = { Game }
