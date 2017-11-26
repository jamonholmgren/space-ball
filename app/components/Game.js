const { div, span, create, img } = require('../dom')
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
}

const ARENA_STYLE = {
  width: '100%',
  height: '400px',
  backgroundColor: '#7b9bad',
}

function TeamBox(state, { team }) {
  const players = team.players.sort(playerSort)
  return div(
    players.map((p, i) => {
      return div(
        [
          img(avatar(p), { title: p.name }), // avatar
          span(`${p.position[0]} ${p.name}`), // title
        ],
        {
          style: Object.assign({ left: `${i * 60}px` }, PLAYER_STYLE),
        }
      )
    }),
    { style: TEAM_BOX_STYLE }
  )
}

function Arena(state, { teams }) {
  return div([], { style: ARENA_STYLE })
}

function Game(state, props) {
  return div(
    [
      TeamBox(state, { team: state.game.teams[0] }),
      Arena(state, { teams: state.game.teams }),
      TeamBox(state, { team: state.game.teams[1] }),
    ],
    { style: { width: '100%' } }
  )
}

module.exports = { Game }
