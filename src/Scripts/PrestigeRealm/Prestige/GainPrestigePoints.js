const CalculatePrestigePointGain = (prestigeRealm, prestigeRealmStatsCalculated) => {
    prestigeRealmStatsCalculated.superPrestige.effects.effectOnPrestigePoints = 
        1 + Math.sqrt(prestigeRealm.superPrestige.amount)
    if(prestigeRealm.superPrestige.challenges.challenge3Completed==true){
        prestigeRealmStatsCalculated.superPrestige.effects.effectOnPrestigePoints =
             Math.pow(
                prestigeRealmStatsCalculated.superPrestige.effects.effectOnPrestigePoints
                , 2
            )
    }

    prestigeRealmStatsCalculated.prestige.gain.multiplier =
        1 *
        prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade3Effects
            .effectOnPrestigePoints
        * prestigeRealmStatsCalculated.points.buyables.buyable3.effects
            .effectOnPrestigePoints.multiplier
        * prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade2Effects
            .effectOnPrestigePoints
        * prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade3Effects
            .effectOnPrestigePoints
        * prestigeRealmStatsCalculated.superPrestige.effects.effectOnPrestigePoints

    prestigeRealmStatsCalculated.points.gain.exponent = 1
}

const GainPrestigePoints = (prestigeRealm, prestigeRealmStatsCalculated, ms) => {
    CalculatePrestigePointGain(prestigeRealm, prestigeRealmStatsCalculated)
    prestigeRealm.prestige.amount +=
        (Math.pow(
            prestigeRealmStatsCalculated.prestige.gain.multiplier /
                prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider,
            prestigeRealmStatsCalculated.prestige.gain.exponent /
                prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.root,
        ) *
            prestigeRealmStatsCalculated.prestige.gain.passive *
            ms) /
        1000
}

export default GainPrestigePoints
