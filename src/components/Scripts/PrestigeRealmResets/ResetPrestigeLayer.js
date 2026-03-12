import { usePlayerStore } from '@/stores/player'

const ResetPrestigePointsLayer = (rowReset) => {
    const player = usePlayerStore()
    player.prestigeRealm.prestige.amount = 0
    ResetPrestigeUpgrades(player, rowReset)
    ResetPrestigeMilestones(player, rowReset)
}

const ResetPrestigeUpgrades = (player, rowReset) => {
    if (!(player.prestigeRealm.superPrestige.milestones.milestone1Unlocked && rowReset == 2)) {
        player.prestigeRealm.prestige.upgrades.row1.upgrade1Bought = false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade1Effects.effectOnPoints = 1

        player.prestigeRealm.prestige.upgrades.row1.upgrade2Bought = false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade2Effects.effectOnPoints = 1

        player.prestigeRealm.prestige.upgrades.row1.upgrade3Bought = false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade3Effects.effectOnPrestigePoints = 1

        player.prestigeRealm.prestige.upgrades.row1.upgrade4Bought = false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade4Effects.effectOnPoints = 1

        player.prestigeRealm.prestige.upgrades.row1.upgrade5Bought = false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade5Effects.effectOnPoints = 1
    }
    if (true) {
        player.prestigeRealm.prestige.upgrades.row2.upgrade1Bought = false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade1Effects.effectOnPoints = 1

        player.prestigeRealm.prestige.upgrades.row2.upgrade2Bought = false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade2Effects.effectOnPrestigePoints = 1

        player.prestigeRealm.prestige.upgrades.row2.upgrade3Bought = false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade3Effects.effectOnPoints = 1
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade3Effects.effectOnPrestigePoints = 1

        player.prestigeRealm.prestige.upgrades.row2.upgrade4Bought = false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade4Effects.effectOnPoints = 1

        player.prestigeRealm.prestige.upgrades.row2.upgrade5Bought = false
        player.prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade5Effects.effectOnPoints = 1
    }
}

const ResetPrestigeMilestones = (player, rowReset) => {
    player.prestigeRealm.prestige.milestones.milestone1Unlocked = false
    player.prestigeRealm.prestige.milestones.milestone2Unlocked = false
    player.prestigeRealm.prestige.milestones.milestone3Unlocked = false
    player.prestigeRealm.prestige.milestones.milestone4Unlocked = false
}

export default ResetPrestigePointsLayer
