const CalculatePointGain = (player) => {
    player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade5Effects.effectOnPoints =
        player.prestigeRealm.prestige.upgrades.row1.upgrade5Bought == true
            ? Math.max(1, 1 + Math.log10(player.prestigeRealm.points.amount)) 
            : 1

    player.prestigeRealmStatsCalculated.points.gain.multiplier =
        1 *
        player.prestigeRealmStatsCalculated.points.buyables.buyable1.effects.effectOnPoints
            .multiplier *
        player.prestigeRealmStatsCalculated.points.buyables.buyable2.effects.effectOnPoints
            .multiplier *
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade1Effects.effectOnPoints *
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade2Effects.effectOnPoints *
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade4Effects.effectOnPoints *
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade5Effects.effectOnPoints *
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade1Effects.effectOnPoints *
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade3Effects.effectOnPoints *
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade4Effects.effectOnPoints

    player.prestigeRealmStatsCalculated.points.gain.exponent = 1
}

const GainPoints = (player, ms) => {
    CalculatePointGain(player)
    player.prestigeRealm.points.amount +=
        (Math.pow(
            player.prestigeRealmStatsCalculated.points.gain.multiplier /
                player.prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider,
            player.prestigeRealmStatsCalculated.points.gain.exponent /
                player.prestigeRealmStatsCalculated.points.gain.challengeNerfs.root,
        ) *
            ms) /
        1000
}

export default GainPoints
