const CalculatePointGain = (prestigeRealm, prestigeRealmStatsCalculated) => {
    prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade5Effects.effectOnPoints =
        prestigeRealm.prestige.upgrades.row1.upgrade5Bought == true
            ? Math.max(1, 1 + Math.log10(prestigeRealm.points.amount)) 
            : 1
    if(prestigeRealm.superPrestige.challenges.challenge1Completed==true){
        prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade5Effects.effectOnPoints =
             Math.pow(
                prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade5Effects.effectOnPoints
                , 2
            )
    }

    prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade5Effects.effectOnPoints =
        prestigeRealm.prestige.upgrades.row2.upgrade5Bought == true
            ? Math.max(1, 1 + Math.log10(prestigeRealm.prestige.amount)) 
            : 1
    if(prestigeRealm.superPrestige.challenges.challenge2Completed==true){
        prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade5Effects.effectOnPoints =
             Math.pow(
                prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade5Effects.effectOnPoints
                , 2
            )
    }

    prestigeRealmStatsCalculated.superPrestige.effects.effectOnPoints = 
        1 + Math.pow(prestigeRealm.superPrestige.amount, 2)

    prestigeRealmStatsCalculated.points.gain.multiplier =
        1 *
        prestigeRealmStatsCalculated.points.buyables.buyable1.effects.effectOnPoints
            .multiplier *
        prestigeRealmStatsCalculated.points.buyables.buyable2.effects.effectOnPoints
            .multiplier *
        prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade1Effects.effectOnPoints *
        prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade2Effects.effectOnPoints *
        prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade4Effects.effectOnPoints *
        prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade5Effects.effectOnPoints *
        prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade1Effects.effectOnPoints *
        prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade3Effects.effectOnPoints *
        prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade4Effects.effectOnPoints *
        prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade5Effects.effectOnPoints *
        prestigeRealmStatsCalculated.prestige.upgrades.row3.upgrade1Effects.effectOnPoints *
        prestigeRealmStatsCalculated.prestige.upgrades.row3.upgrade2Effects.effectOnPoints *
        prestigeRealmStatsCalculated.superPrestige.effects.effectOnPoints

    prestigeRealmStatsCalculated.points.gain.exponent = 1
}

const GainPoints = (prestigeRealm, prestigeRealmStatsCalculated, ms) => {
    CalculatePointGain(prestigeRealm, prestigeRealmStatsCalculated)
    prestigeRealm.points.amount +=
        (Math.pow(
            prestigeRealmStatsCalculated.points.gain.multiplier /
                prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider,
            prestigeRealmStatsCalculated.points.gain.exponent /
                prestigeRealmStatsCalculated.points.gain.challengeNerfs.root,
        ) *
            ms) /
        1000
}

export default GainPoints
