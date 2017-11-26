const { table, button, textElement } = require('../dom')

const playerSort = (a, b) =>
  a.scoutRating === b.scoutRating ? b.overall - a.overall : b.scoutRating - a.scoutRating

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
      // 'report',
    ],
    ...players.sort(playerSort).map(p => [
      p.team || button('Draft', { onClick: () => onDraft(p) }),
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

module.exports = { PlayerTable }
