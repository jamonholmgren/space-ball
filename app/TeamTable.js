const { table, button } = require('./dom')

function TeamTable({ team }, { onDraft }) {
  return table([
    [
      'name',
      'age',
      'position',
      // 'athlete',
      // 'offense',
      // 'defense',
      // 'potential',
      // 'overall',
      'rating',
      'report',
    ],
    ...team.sort((a, b) => (a.position > b.position ? -1 : 1)).map(p => [
      p.name,
      p.age,
      p.position,
      // p.athlete,
      // p.offense,
      // p.defense,
      // p.potential,
      // p.overall,
      p.rating,
      p.report,
    ]),
  ])
}

module.exports = { TeamTable }
