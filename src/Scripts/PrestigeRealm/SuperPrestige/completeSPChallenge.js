const CompleteSPC1=(prestigeRealm, prestigeRealmStats)=>{
    prestigeRealm.enteredChallenge=""
    prestigeRealm.superPrestige.challenges.challenge1Completed=true
    prestigeRealm.superPrestige.challenges.challenge2Completed=false
    prestigeRealmStats.points.gain.challengeNerfs.divider/=100
}

const CompleteSPC2=(prestigeRealm, prestigeRealmStats)=>{
    prestigeRealm.enteredChallenge=""
    prestigeRealm.superPrestige.challenges.challenge2Completed=true
    prestigeRealm.superPrestige.challenges.challenge3Completed=false
    prestigeRealmStats.points.gain.challengeNerfs.divider/=1000
    prestigeRealmStats.prestige.gain.challengeNerfs.divider/=10
}

export {CompleteSPC1, CompleteSPC2}