import { usePrestigeRealmStatsStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStats'
import { usePrestigeRealmStatsCalculatedStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStatsCalculated'

const ResetPrestigePointsLayer = (rowReset) => {
    const prestigeRealmStatsStore=usePrestigeRealmStatsStore()
    const prestigeRealmStatsCalculatedStore=usePrestigeRealmStatsCalculatedStore()
    prestigeRealmStatsStore.prestige.amount = 0
    ResetPrestigeUpgrades(prestigeRealmStatsStore, prestigeRealmStatsCalculatedStore, rowReset)
    ResetPrestigeMilestones(prestigeRealmStatsStore, prestigeRealmStatsCalculatedStore, rowReset)
}

const ResetPrestigeUpgrades = (prestigeRealm, prestigeRealmStatsCalculated, rowReset) => {
    if (!(prestigeRealm.superPrestige.milestones.milestone1Unlocked && rowReset == 2)) {
        prestigeRealm.prestige.upgrades.row1.upgrade1Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade1Effects.effectOnPoints = 1

        prestigeRealm.prestige.upgrades.row1.upgrade2Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade2Effects.effectOnPoints = 1

        prestigeRealm.prestige.upgrades.row1.upgrade3Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade3Effects.effectOnPrestigePoints = 1

        prestigeRealm.prestige.upgrades.row1.upgrade4Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade4Effects.effectOnPoints = 1

        prestigeRealm.prestige.upgrades.row1.upgrade5Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row1.upgrade5Effects.effectOnPoints = 1
    }

    if (!(prestigeRealm.superPrestige.milestones.milestone2Unlocked && rowReset == 2)) {
        prestigeRealm.prestige.upgrades.row2.upgrade1Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade1Effects.effectOnPoints = 1

        prestigeRealm.prestige.upgrades.row2.upgrade2Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade2Effects.effectOnPrestigePoints = 1

        prestigeRealm.prestige.upgrades.row2.upgrade3Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade3Effects.effectOnPoints = 1
        prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade3Effects.effectOnPrestigePoints = 1

        prestigeRealm.prestige.upgrades.row2.upgrade4Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade4Effects.effectOnPoints = 1

        prestigeRealm.prestige.upgrades.row2.upgrade5Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row2.upgrade5Effects.effectOnPoints = 1
    }

    if (prestigeRealm.superPrestige.milestones.milestone3Unlocked==true && !(prestigeRealm.superPrestige.milestones.milestone5Unlocked==true && rowReset == 2)) {
        prestigeRealm.prestige.upgrades.row3.upgrade1Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row3.upgrade1Effects.effectOnPoints = 1

        prestigeRealm.prestige.upgrades.row3.upgrade2Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row3.upgrade2Effects.effectOnPoints = 1

        prestigeRealm.prestige.upgrades.row3.upgrade3Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row3.upgrade3Effects.effectOnPrestigePoints = 1

        prestigeRealm.prestige.upgrades.row3.upgrade4Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row3.upgrade4Effects.effectOnSuperPrestigePoints = 1

        prestigeRealm.prestige.upgrades.row3.upgrade5Bought = false
        prestigeRealmStatsCalculated.prestige.upgrades.row3.upgrade5Effects.effectOnPrestigePoints = 1
    }
}

const ResetPrestigeMilestones = (prestigeRealm, prestigeRealmStatsCalculated, rowReset) => {
    if(!(prestigeRealm.superPrestige.milestones.milestone4Unlocked==true && rowReset==2)){
        prestigeRealm.prestige.milestones.milestone1Unlocked = false
        prestigeRealm.prestige.milestones.milestone2Unlocked = false
        prestigeRealm.prestige.milestones.milestone3Unlocked = false
        prestigeRealm.prestige.milestones.milestone4Unlocked = false
    }
}

export default ResetPrestigePointsLayer
