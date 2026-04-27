const CalculatePrestigePointGain = (prestigeRealm, prestigeRealmStatsCalculated) => {
    prestigeRealmStatsCalculated.prestige.upgrades.row3.upgrade5Effects.effectOnPrestigePoints =
        prestigeRealm.prestige.upgrades.row3.upgrade5Bought == true
            ? Math.max(1, 1 + Math.log10(prestigeRealm.prestige.amount)) 
            : 1
    
    prestigeRealmStatsCalculated.superPrestige.effects.effectOnPrestigePoints = 
        1 + Math.sqrt(prestigeRealm.superPrestige.amount)

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
        * prestigeRealmStatsCalculated.prestige.upgrades.row3.upgrade3Effects
            .effectOnPrestigePoints
        * prestigeRealmStatsCalculated.prestige.upgrades.row3.upgrade5Effects
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
