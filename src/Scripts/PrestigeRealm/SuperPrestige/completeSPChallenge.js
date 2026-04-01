const CompleteSPC1=(prestigeRealm, prestigeRealmStats)=>{
    prestigeRealm.enteredChallenge=""
    prestigeRealm.superPrestige.challenges.challenge1Completed=true
    prestigeRealm.superPrestige.challenges.challenge2Completed=false
    prestigeRealmStats.points.gain.challengeNerfs.divider/=100
}

export {CompleteSPC1}