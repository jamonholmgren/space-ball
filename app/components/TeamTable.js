const { table, button, textElement, img } = require('../dom')
const { POSITIONS, playerFilter } = require('../players')

const playerSort = (a, b) => {
  let s = POSITIONS.indexOf(a.position) - POSITIONS.indexOf(b.position)
  if (s !== 0) return s
  s = b.scoutRating - a.scoutRating
  if (s !== 0) return s
  return a.name.localeCompare(b.name)
}

function TeamTable(state, { onDraft, team }) {
  team = team || state.drafting || state.team
  const players = state[team].players

  return table([
    [
      team,
      'img',
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
    ...players
      // .filter(playerFilter(state.filter))
      .sort(playerSort)
      .map(p => [
        textElement('abbr')(p.name, { title: p.report }),
        img(`https://api.adorable.io/avatars/20/${p.firstName}-${p.lastName}`, {
          width: '20',
          height: '20',
        }),
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
