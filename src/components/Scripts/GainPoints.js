const CalculatePointGain =(player)=>{
    player.prestigeRealmStatsCalculated.points.gain.multiplier = 1 
        * player.prestigeRealmStatsCalculated.points.buyables.buyable1.effects.effectOnPoints.multiplier
        * player.prestigeRealmStatsCalculated.points.buyables.buyable2.effects.effectOnPoints.multiplier
    
    player.prestigeRealmStatsCalculated.points.gain.exponent = 1 
}

const GainPoints=(player, ms)=>{
    CalculatePointGain(player)
    player.prestigeRealm.points.amount+= Math.pow(
        player.prestigeRealmStatsCalculated.points.gain.multiplier / player.prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider,
        player.prestigeRealmStatsCalculated.points.gain.exponent / player.prestigeRealmStatsCalculated.points.gain.challengeNerfs.root
    ) * ms / 1000
}

export default GainPoints