const { div, span, create, img } = require('../dom')
const { keyForValue } = require('../utils')
const { POSITIONS, playerSort, avatar } = require('../players')
const { findTeam } = require('../teams')

const TEAM_BOX_STYLE = {
  position: 'relative',
  height: '80px',
  width: '100%',
  marginTop: '20px',
  marginBottom: '20px',
}

const PLAYER_STYLE = {
  width: '40px',
  fontSize: '8px',
  textAlign: 'center',
  position: 'absolute',
  margin: '-32px -20px',
  padding: '2px',
  color: 'white',
  transition: 'all 0.5s',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.75)',
}

const coordinates = (position, side, i = 0) => {
  const flip = n => (side === 0 ? n : 100 - n)
  return (
    {
      goalie: { left: `${flip(5)}%`, top: `50%` },
      defense: { left: `${flip(25)}%`, top: `20%` },
      center: { left: `${flip(45)}%`, top: `50%` },
      forward: { left: `${flip(65)}%`, top: `80%` },
      attack: { left: `${flip(80)}%`, top: `30%` },
    }[position] || { left: `${flip(i * 5 + 25)}%`, top: `${flip(-12)}%` }
  )
}

function Players(state, props) {
  const playerDivs = [0, 1].map(side => {
    const lineup = state.game.lineups[side]
    const team = findTeam(state, state.game.teams[side])
    const players = team.players.sort(playerSort)

    return players.map((p, i) => {
      const playing = keyForValue(lineup, p)
      const coords = coordinates(playing, side, i)

      const teamColor = {
        backgroundColor: team.color,
      }

      return div(
        [
          img(avatar(p), {
            title: p.name,
            style: { borderRadius: '8px 8px 0 0', overflow: 'hidden' },
          }), // avatar
          div(`${(p.position[0] || '').toUpperCase()}&nbsp;${p.lastName}`, {
            style: {
              overflow: 'hidden',
            },
          }), // title
          div(`${Math.floor(p.energy)}`, {
            style: {
              width: `${p.energy / 2.5}px`,
              height: '10px',
              backgroundColor: '#4c905f',
              fontSize: '8px',
            },
          }),
        ],
        {
          style: Object.assign({}, PLAYER_STYLE, coords, teamColor),
          cache: `${side} - ${p.name}`,
          animate: ['left', 'top'],
        }
      )
    })
  })

  return playerDivs
}

function Ball(state, props) {
  let coords = { left: '50%', top: '50%' }

  const ball = state.game.ball

  if (POSITIONS.includes(ball.possession)) {
    coords = coordinates(ball.possession, ball.side)
  } else if (ball.possession === 'goal') {
    coords = { left: ball.side === 0 ? '10%' : '90%', top: '50%' }
  }

  return div([], {
    style: Object.assign(
      {},
      {
        position: 'absolute',
        width: '30px',
        height: '30px',
        margin: '-15px -15px',
        background:
          'radial-gradient(ellipse at top 25% left 25%, #fceabb 0%,#fccd4d 52%,#f8b500 84%,#fbdf93 100%)',
        borderRadius: '15px',
        boxShadow: '1px 1px 2px black',
        transition: 'all 1.0s',
      },
      coords
    ),
    cache: 'ball',
    animate: ['left', 'top'],
  })
}

const GOAL_STYLE = {
  outline: 'white 4px solid',
  position: 'absolute',
  margin: '-100px 0',
  height: '200px',
  top: '200px',
  width: '10%',
}

function Lines(state, props) {
  return [
    div([], {
      style: {
        backgroundColor: 'white',
        position: 'absolute',
        left: '50%',
        width: '6px',
        margin: '0 -3px',
        height: '100%',
      },
    }),
    div([], {
      style: Object.assign({}, GOAL_STYLE, {
        left: '0',
      }),
    }),
    div([], {
      style: Object.assign({}, GOAL_STYLE, {
        right: '0',
      }),
    }),
    div([], {
      style: {
        outline: 'white 4px solid',
        width: '100%',
        margin: '0',
        height: '400px',
      },
    }),
  ]
}

function Arena(state, props) {
  const players = Players(state, props)
  const ball = Ball(state, props)
  const lines = Lines(state, props)
  return div([...lines, ...players[0], ...players[1], ball], {
    style: {
      width: '100%',
      height: '400px',
      background: 'radial-gradient(ellipse at center, #333333 0%,#1c2225 100%)',
      position: 'relative',
    },
  })
}

function Game(state, props) {
  return Arena(state, props)
}

module.exports = { Game }
