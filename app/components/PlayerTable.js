const { playerFilter, avatar } = require('../players')
const { table, button, img, create } = require('../dom')

const playerSort = (a, b) =>
  a.scoutRating === b.scoutRating ? b.overall - a.overall : b.scoutRating - a.scoutRating

function PlayerTable({ team, drafting, players, filter }, { onDraft }) {
  return table([
    [
      'draft',
      'pic',
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
    ...players
      .filter(playerFilter(filter))
      .sort(playerSort)
      .map(p => [
        p.team || (team === drafting && button('Draft', { onClick: () => onDraft(p) })) || '',
        img(avatar(p), {
          width: '20',
          height: '20',
        }),
        create('abbr')(p.name, { title: p.report }),
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
