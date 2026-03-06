import { usePlayerStore } from '@/stores/player'

const ResetPointsLayer = (rowReset) => {
    const player = usePlayerStore()
    player.prestigeRealm.points.amount = 0
    ResetPointBuyables(player, rowReset)
}

const ResetPointBuyables = (player, rowReset) => {
    let pointBuyables = player.prestigeRealm.points.buyables
    let pointBuyableStatsCalculated = player.prestigeRealmStatsCalculated.points.buyables

    pointBuyables.buyable1Amount = 0
    pointBuyableStatsCalculated.buyable1.cost = 10
    pointBuyableStatsCalculated.buyable1.effects.effectOnPoints.multiplier = 1

    if (!(player.prestigeRealm.prestige.milestones.milestone2Unlocked == true && rowReset == 1)) {
        pointBuyables.buyable2Amount = 0
        pointBuyableStatsCalculated.buyable2.cost = 25
        pointBuyableStatsCalculated.buyable2.effects.effectOnPoints.multiplier = 1
    }

    if (
        pointBuyables.buyable3Amount != undefined &&
        !(player.prestigeRealm.prestige.milestones.milestone3Unlocked == true && rowReset == 1)
    ) {
        pointBuyables.buyable3Amount = 0
        pointBuyableStatsCalculated.buyable3.cost = 1000
        pointBuyableStatsCalculated.buyable3.effects.effectOnPrestigePoints.multiplier = 1
    }
}

export default ResetPointsLayer
