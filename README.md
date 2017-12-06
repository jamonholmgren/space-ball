# Space Ball Manager

**A game where you manage a club for a fictional sport, "Space Ball"**

By [Jamon Holmgren](https://jamonholmgren.com).

<img width="945" alt="screen shot 2017-11-26 at 12 38 12 am" src="https://user-images.githubusercontent.com/1479215/33238415-295f36e8-d242-11e7-84c1-24f50cbee761.png">

![screen shot 2017-12-04 at 10 11 53 pm](https://user-images.githubusercontent.com/1479215/33592504-2f4c1d50-d940-11e7-9292-06611b715db2.png)

## Description

You're a manager for a popular soccer-like zero-gravity game, Space Ball. Ten players (five on each team) compete in the middle of an arena in zero gravity. They pass the ball back and forth and throw it at the goal. The defending team attempts to deflect or steal the ball, and play reverses.

There are five positions on the field:

* Attack - these are the most aggressive players who attempt to score
* Forward - these support the attack players and also try to score
* Center - these help by keeping the ball on the offensive side of the arena
* Defense - these try to prevent opposing attacks and forwards from scoring
* Goalie - these are the last line of defense

Your job, as the manager of the club, is to:

1. Draft skilled players for each position
2. Manage games by substituting players and setting offensive and defensive strategies [coming soon]
3. Trade with other club to improve your roster [coming soon]
4. Scout upcoming rookies [coming soon]
5. Draft rookies [coming soon]
6. Lead your team to undefeated season after undefeated season [coming soon]

## Install

```bash
# Clone this repository
git clone https://github.com/jamonholmgren/space-ball
# Go into the repository
cd space-ball
# Install dependencies
yarn
# Run the app
yarn start
```

## Dev Notes

* [x] ~Need to figure out animating using CSS transitions~
* [x] ~Need to put team colors on each player so it's obvious what team they're with~
* [x] ~Add a ball~
* [ ] Create faceoff state
* [ ] Clean up the presentation on the arena
* [ ] Add a scoreboard / time clock
* [ ] Create passing ball between players
* [ ] Create player AI so they know whether to pass or shoot
* [ ] Create shot on goal
* [ ] Create goals
* [ ] Create goal scored animation
* [ ] Create deflections
* [ ] Create interceptions
* [ ] Create saves (goalie only)
* [ ] Create time clock running down
* [ ] Create game over animation
* [ ] Refine auto substitutions
* [ ] Create back button (only when game is over)
* [ ] Update team records
* [ ] Show standings
* [ ] Play next game
* [ ] Advance to next week
* [ ] Finish schedule, show final standings
* [ ] Keep stats for each player
 - Goals scored
 - Assists
 - Saves (goalies)
 - Deflections
 - Interceptions
 - Minutes played
* [ ] Add player-control
 - Substitute manually
 - Choose to pass or shoot
 - Defensive controls? (TBD?)
* [ ] Playoff bracket?
 - Track playoff stats separately
* [ ] Track lifetime regular season & playoff records 
* [ ] Main menu
 - Choose a save slot
 - Choose a team
 - Exit to main menu anytime
* [ ] Publish
 - Make a page on jamonholmgren.com/spaceball ?

## License

[MIT](LICENSE.md)
