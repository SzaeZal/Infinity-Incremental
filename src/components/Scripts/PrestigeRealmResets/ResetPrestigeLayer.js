import { usePlayerStore } from '@/stores/player'

const ResetPrestigePointsLayer = (rowReset) => {
    const player = usePlayerStore()
    player.prestigeRealm.prestige.amount = 0
    ResetPrestigeUpgrades(player, rowReset)
    ResetPrestigeMilestones(player, rowReset)
}

const ResetPrestigeUpgrades=(player, rowReset)=>{
    if(true){
        player.prestigeRealm.prestige.upgrades.row1.upgrade1Bought=false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade1Effects.effectOnPoints=1
        
        player.prestigeRealm.prestige.upgrades.row1.upgrade2Bought=false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade2Effects.effectOnPoints=1

        player.prestigeRealm.prestige.upgrades.row1.upgrade3Bought=false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade3Effects.effectOnPrestigePoints=1

        player.prestigeRealm.prestige.upgrades.row1.upgrade4Bought=false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade4Effects.effectOnPoints=1

        player.prestigeRealm.prestige.upgrades.row1.upgrade5Bought=false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade5Effects.effectOnPoints=1
    }
    if(true){
        player.prestigeRealm.prestige.upgrades.row2.upgrade1Bought=false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade1Effects.effectOnPoints=1
        
        player.prestigeRealm.prestige.upgrades.row2.upgrade2Bought=false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade2Effects.effectOnPrestigePoints=1

        player.prestigeRealm.prestige.upgrades.row2.upgrade3Bought=false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade3Effects.effectOnPoints=1
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade3Effects.effectOnPrestigePoints=1

        player.prestigeRealm.prestige.upgrades.row2.upgrade4Bought=false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade4Effects.effectOnPoints=1

        player.prestigeRealm.prestige.upgrades.row2.upgrade5Bought=false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade5Effects.effectOnPoints=1
    }
}

const ResetPrestigeMilestones=(player,rowReset)=>{
    for (const key in player.prestigeRealm.prestige.milestones) {
        console.log(key);
        
        player.prestigeRealm.milestones[key]=false
    }
}

export default ResetPrestigePointsLayer
