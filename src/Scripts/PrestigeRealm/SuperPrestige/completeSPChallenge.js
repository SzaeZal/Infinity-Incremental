const CompleteSPC1=(prestigeRealm, prestigeRealmStats)=>{
    prestigeRealm.enteredChallenge=""
    prestigeRealm.superPrestige.challenges.challenge1Completed=true    
    if(prestigeRealm.superPrestige.challenges.challenge2Completed==undefined){
        prestigeRealm.superPrestige.challenges.challenge2Completed=false
    }
    prestigeRealmStats.points.gain.challengeNerfs.divider/=100
}

const CompleteSPC2=(prestigeRealm, prestigeRealmStats)=>{
    prestigeRealm.enteredChallenge=""
    prestigeRealm.superPrestige.challenges.challenge2Completed=true
    if(prestigeRealm.superPrestige.challenges.challenge3Completed==undefined){
        prestigeRealm.superPrestige.challenges.challenge3Completed=false
    }
    prestigeRealmStats.points.gain.challengeNerfs.divider/=1000
    prestigeRealmStats.prestige.gain.challengeNerfs.divider/=10
}

const CompleteSPC3=(prestigeRealm, prestigeRealmStats)=>{
    prestigeRealm.enteredChallenge=""
    prestigeRealm.superPrestige.challenges.challenge3Completed=true
    if(prestigeRealm.superPrestige.challenges.challenge4Completed==undefined){
        prestigeRealm.superPrestige.challenges.challenge4Completed=false
    }
    prestigeRealmStats.points.gain.challengeNerfs.root/=2.5
    prestigeRealmStats.prestige.gain.challengeNerfs.root/=2
}

const CompleteSPC4=(prestigeRealm, prestigeRealmStats)=>{
    prestigeRealm.enteredChallenge=""
    prestigeRealm.superPrestige.challenges.challenge4Completed=true
    //unlock next layer
    prestigeRealmStats.points.gain.challengeNerfs.root=1
    prestigeRealmStats.prestige.gain.challengeNerfs.root=1
}

export {CompleteSPC1, CompleteSPC2, CompleteSPC3, CompleteSPC4}