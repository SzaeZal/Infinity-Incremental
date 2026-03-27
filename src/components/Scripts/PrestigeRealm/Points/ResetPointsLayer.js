import { usePrestigeRealmStatsStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStats'
import { usePrestigeRealmStatsCalculatedStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStatsCalculated'

const ResetPointsLayer = (rowReset) => {
    const prestigeRealmStatsStore=usePrestigeRealmStatsStore()
    const prestigeRealmStatsCalculatedStore=usePrestigeRealmStatsCalculatedStore()
    prestigeRealmStatsStore.points.amount = 0
    ResetPointBuyables(prestigeRealmStatsStore, prestigeRealmStatsCalculatedStore, rowReset)
}

const ResetPointBuyables = (prestigeRealm, prestigeRealmStatsCalculated, rowReset) => {
    let pointBuyables = prestigeRealm.points.buyables
    let pointBuyableStatsCalculated = prestigeRealmStatsCalculated.points.buyables

    pointBuyables.buyable1Amount = 0
    pointBuyableStatsCalculated.buyable1.cost = 10
    pointBuyableStatsCalculated.buyable1.effects.effectOnPoints.multiplier = 1

    if (!(prestigeRealm.prestige.milestones.milestone2Unlocked == true && rowReset == 1)) {
        pointBuyables.buyable2Amount = 0
        pointBuyableStatsCalculated.buyable2.cost = 25
        pointBuyableStatsCalculated.buyable2.effects.effectOnPoints.multiplier = 1
    }

    if (
        pointBuyables.buyable3Amount != undefined &&
        !(prestigeRealm.prestige.milestones.milestone3Unlocked == true && rowReset == 1)
    ) {
        pointBuyables.buyable3Amount = 0
        pointBuyableStatsCalculated.buyable3.cost = 1000
        pointBuyableStatsCalculated.buyable3.effects.effectOnPrestigePoints.multiplier = 1
    }
}

export default ResetPointsLayer
