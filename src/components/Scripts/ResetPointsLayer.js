import { usePlayerStore } from "@/stores/player"

const ResetPointsLayer=()=>{
    const player=usePlayerStore()
    player.prestigeRealm.points.amount=0
    ResetPointBuyables(player.prestigeRealm.points.buyables, player.prestigeRealmStatsCalculated.points.buyables)
}

const ResetPointBuyables=(pointBuyables, pointBuyableStatsCalculated)=>{

    pointBuyables.buyable1Amount=0
    pointBuyableStatsCalculated.buyable1.cost =10
    pointBuyableStatsCalculated.buyable1.effects.effectOnPoints.multiplier = 1

    pointBuyables.buyable2Amount=0
    pointBuyableStatsCalculated.buyable2.cost =25
    pointBuyableStatsCalculated.buyable2.effects.effectOnPoints.multiplier =1
}

export default ResetPointsLayer