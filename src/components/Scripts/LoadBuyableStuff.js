const LoadBuyables=(prestigeRealm, prestigeRealmStatsCalculated)=>{
    
    LoadPrestigeRealmBuyables(prestigeRealm.value, prestigeRealmStatsCalculated.value)
}

const LoadPrestigeRealmBuyables =(prestigeRealm, prestigeRealmStatsCalculated)=>{    
    LoadPointsLayerBuyables(prestigeRealm.points, prestigeRealmStatsCalculated.points)
    

}

const LoadPointsLayerBuyables=(points, pointsStatsCalculated)=>{        
    pointsStatsCalculated.buyables.buyable1.cost =
      10 *
      Math.pow(2, points.buyables.buyable1Amount * Math.log2(points.buyables.buyable1Amount + 2))

    pointsStatsCalculated.buyables.buyable1.effects.effectOnPoints.multiplier = Math.pow(
      2,
      points.buyables.buyable1Amount,
    )

    pointsStatsCalculated.buyables.buyable2.cost =
      25 *
      Math.pow(
        1.35,
        points.buyables.buyable2Amount * Math.log2(points.buyables.buyable2Amount+2),
      )

    pointsStatsCalculated.buyables.buyable2.effects.effectOnPoints.multiplier =
      (1 + points.buyables.buyable2Amount) *
      Math.max(1, 2 * Math.floor(points.buyables.buyable2Amount / 25))
}

export default LoadBuyables;