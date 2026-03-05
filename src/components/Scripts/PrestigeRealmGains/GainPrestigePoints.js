const CalculatePrestigePointGain = (player) => {
    player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade5Effects.effectOnPrestigePoints =
        player.prestigeRealm.prestige.upgrades.row2.upgrade5Bought == true
            ? Math.max(1, 1 + Math.log10(player.prestigeRealm.prestige.amount)) 
            : 1

    player.prestigeRealmStatsCalculated.prestige.gain.multiplier =
        1 *
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade3Effects
            .effectOnPrestigePoints
        * player.prestigeRealmStatsCalculated.points.buyables.buyable3.effects
            .effectOnPrestigePoints.multiplier
        * player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade2Effects
            .effectOnPrestigePoints
        * player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade3Effects
            .effectOnPrestigePoints
        * player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade5Effects
            .effectOnPrestigePoints

    player.prestigeRealmStatsCalculated.points.gain.exponent = 1
}

const GainPrestigePoints = (player, ms) => {
    CalculatePrestigePointGain(player)
    player.prestigeRealm.prestige.amount +=
        (Math.pow(
            player.prestigeRealmStatsCalculated.prestige.gain.multiplier /
                player.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider,
            player.prestigeRealmStatsCalculated.prestige.gain.exponent /
                player.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.root,
        ) *
            player.prestigeRealmStatsCalculated.prestige.gain.passive *
            ms) /
        1000
}

export default GainPrestigePoints
