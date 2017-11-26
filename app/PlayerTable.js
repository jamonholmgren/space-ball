const { table, button } = require('./dom')

function PlayerTable({ players }, { onDraft }) {
  return table([
    [
      'draft',
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
    ...players.sort((a, b) => b.scoutRating - a.scoutRating).map(p => [
      button('Draft', { onClick: () => onDraft(p) }),
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

module.exports = { PlayerTable }
