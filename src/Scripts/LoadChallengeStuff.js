const LoadChallenges=(prestigeRealm, prestigeRealmStatsCalculated)=>{
    LoadPrestigeRealmChallengeEffects(prestigeRealm, prestigeRealmStatsCalculated)
}

const LoadPrestigeRealmChallengeEffects=(prestigeRealm, prestigeRealmStatsCalculated)=>{
    if(prestigeRealm.enteredChallenge=='SPC1'){
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider=100
    }
    else if(prestigeRealm.enteredChallenge=="SPC2"){
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider=1000
        prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider=10
    }
    else if(prestigeRealm.enteredChallenge=="SPC3"){
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider=100
    }
    else if(prestigeRealm.enteredChallenge=="SPC4"){
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider=100
    }
}

export default LoadChallenges