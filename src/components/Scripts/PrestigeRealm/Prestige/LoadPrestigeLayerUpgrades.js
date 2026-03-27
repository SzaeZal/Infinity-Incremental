const LoadPrestigeLayerUpgrades = (prestige, prestigeStatsCalculated) => {
    prestigeStatsCalculated.upgrades.row1.upgrade1Effects.effectOnPoints =
        prestige.upgrades.row1.upgrade1Bought == true ? 2 : 1

    prestigeStatsCalculated.upgrades.row1.upgrade2Effects.effectOnPoints =
        prestige.upgrades.row1.upgrade2Bought == true ? 3 : 1

    prestigeStatsCalculated.upgrades.row1.upgrade3Effects.effectOnPrestigePoints =
        prestige.upgrades.row1.upgrade3Bought == true ? 1.5 : 1

    prestigeStatsCalculated.upgrades.row1.upgrade4Effects.effectOnPoints =
        prestige.upgrades.row1.upgrade4Bought == true ? 5 : 1

    prestigeStatsCalculated.upgrades.row2.upgrade1Effects.effectOnPoints =
        prestige.upgrades.row2.upgrade1Bought == true ? 5 : 1

    prestigeStatsCalculated.upgrades.row2.upgrade2Effects.effectOnPrestigePoints =
        prestige.upgrades.row2.upgrade2Bought == true ? 2 : 1

    if(prestige.upgrades.row2.upgrade3Bought == true){
        prestigeStatsCalculated.upgrades.row2.upgrade3Effects.effectOnPoints = 3
        prestigeStatsCalculated.upgrades.row2.upgrade3Effects.effectOnPrestigePoints = 1.5 
    }
    
    prestigeStatsCalculated.upgrades.row2.upgrade4Effects.effectOnPoints =
        prestige.upgrades.row2.upgrade4Bought == true ? 10 : 1
}

export default LoadPrestigeLayerUpgrades