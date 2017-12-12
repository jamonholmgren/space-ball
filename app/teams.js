const TEAMS = [
  'mercurians',
  'venusians',
  'terrans',
  'martians',
  'jovians',
  'saturnians',
  'uranians',
  'neptunians',
]

const initTeams = () => [
  { name: 'mercurians', wins: 0, losses: 0, players: [], color: '#544B19' },
  { name: 'venusians', wins: 0, losses: 0, players: [], color: '#1EFB4B' },
  { name: 'terrans', wins: 0, losses: 0, players: [], color: '#455DC4' },
  { name: 'martians', wins: 0, losses: 0, players: [], color: '#7C945F' },
  { name: 'jovians', wins: 0, losses: 0, players: [], color: '#840B2F' },
  { name: 'saturnians', wins: 0, losses: 0, players: [], color: '#7E4275' },
  { name: 'uranians', wins: 0, losses: 0, players: [], color: '#598EF8' },
  { name: 'neptunians', wins: 0, losses: 0, players: [], color: '#05730C' },
]

const findTeam = (state, name) => state.teams.find(n => n.name === name)

module.exports = { TEAMS, initTeams, findTeam }
