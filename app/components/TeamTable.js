const { table, button, textElement } = require('../dom')

const playerSort = (a, b) => {
  if (a.position > b.position) {
    return -1
  }
  if (a.position < b.position) {
    return 1
  }
  return a.fullName < b.fullName ? -1 : 1
}

function TeamTable(state, { onDraft }) {
  const players = state[state.drafting || state.team].players

  return table([
    [
      state.drafting || state.team,
      'age',
      'position',
      // 'athlete',
      // 'offense',
      // 'defense',
      // 'potential',
      // 'overall',
      'rating',
      // 'report',
    ],
    ...players.sort(playerSort).map(p => [
      textElement('abbr')(p.name, { title: p.report }),
      p.age,
      p.position,
      // p.athlete,
      // p.offense,
      // p.defense,
      // p.potential,
      // p.overall,
      p.rating,
      // p.report,
    ]),
  ])
}

module.exports = { TeamTable }
