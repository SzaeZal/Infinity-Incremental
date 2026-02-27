const LoadUpgrades = (prestigeRealm, prestigeRealmStatsCalculated) => {
    LoadPrestigeRealmUpgrades(prestigeRealm.value, prestigeRealmStatsCalculated.value)
}

const LoadPrestigeRealmUpgrades = (prestigeRealm, prestigeRealmStatsCalculated) => {
    LoadPrestigeLayerUpgrades(prestigeRealm.prestige, prestigeRealmStatsCalculated.prestige)
}

const LoadPrestigeLayerUpgrades = (prestige, prestigeStatsCalculated) => {
    prestigeStatsCalculated.upgrades.row1.upgrade1Effects.effectOnPoints =
        prestige.upgrades.row1.upgrade1Bought == true ? 2 : 1

    prestigeStatsCalculated.upgrades.row1.upgrade2Effects.effectOnPoints =
        prestige.upgrades.row1.upgrade2Bought == true ? 3 : 1

    prestigeStatsCalculated.upgrades.row1.upgrade3Effects.effectOnPrestigePoints =
        prestige.upgrades.row1.upgrade3Bought == true ? 1.5 : 1

    prestigeStatsCalculated.upgrades.row1.upgrade4Effects.effectOnPoints =
        prestige.upgrades.row1.upgrade4Bought == true ? 5 : 1
}

export default LoadUpgrades
