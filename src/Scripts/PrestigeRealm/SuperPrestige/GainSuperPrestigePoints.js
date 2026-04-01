const CalculateSuperPrestigePointGain = (prestigeRealm, prestigeRealmStatsCalculated) => {

    prestigeRealmStatsCalculated.superPrestige.gain.multiplier =
        1 *
        prestigeRealmStatsCalculated.prestige.upgrades.row3.upgrade4Effects
            .effectOnSuperPrestigePoints

    prestigeRealmStatsCalculated.points.gain.exponent = 1
}

const GainSuperPrestigePoints = (prestigeRealm, prestigeRealmStatsCalculated, ms) => {
    CalculateSuperPrestigePointGain(prestigeRealm, prestigeRealmStatsCalculated)
    prestigeRealm.superPrestige.amount +=
        (Math.pow(
            prestigeRealmStatsCalculated.superPrestige.gain.multiplier /
                prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.divider,
            prestigeRealmStatsCalculated.superPrestige.gain.exponent /
                prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.root,
        ) *
            prestigeRealmStatsCalculated.superPrestige.gain.passive *
            ms) /
        1000
}

export default GainSuperPrestigePoints
