<template>
    <div>
        <div
            class="layerResetButton"
            :class="{
                superPrestigeResetButton:
                    superPrestigePointsOnReset > 0 &&
                    playerStore.prestigeRealm.prestige.amount >= 1e5,
            }"
            @click="SuperPrestigeReset"
        >
            <span v-if="superPrestigePointsOnReset < 1e3">
                <h3 class="currencyOnReset">+ {{ FormatNumber(superPrestigePointsOnReset) }} SP</h3>
                <h5 class="plusOneAt">
                    +1 at {{ FormatNumber(prestigePointsToPlusOnePrestigePointOnReset) }} PP
                </h5>
            </span>
            <span v-else>
                <h3 class="currencyOnReset">+ {{ FormatNumber(superPrestigePointsOnReset) }} SP</h3>
            </span>
        </div>
        <div class="challenges">
            <div class="challenge"
                :class="{completedChallenge : superPrestige.challenges.challenge1Completed}"
                @click="ToggleSuperPrestigeChallenge1"
            >
                <div class="challengeTitle">
                    Slowed points
                </div>
                <div class="challengeEntered" v-show="playerStore.prestigeRealm.enteredChallenge=='SPC1'">
                    (In Challenge)
                </div>
                <div class="challengeNerfs">
                    <div class="challengeNerf">
                        /100 points
                    </div>
                </div>
                <div class="challengeGoal">
                    Goal: 10000 points
                </div>
                <div class="challengeRewards">
                    <div class="challengeReward">
                        Reward: Square the effect of prestige upgrade 1-5
                    </div>
                </div>
                <div class="challengeBoxInfo">
                    click to enter/exit challenge
                </div>
            </div>
            <div class="challenge"
                v-show="superPrestige.challenges.challenge2Completed!=undefined"
            >

            </div>
            <div class="challenge"
                v-show="superPrestige.challenges.challenge3Completed!=undefined"
            >

            </div>
            <div class="challenge"
                v-show="superPrestige.challenges.challenge4Completed!=undefined"
            >

            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/components/Scripts/formatters'
import { usePlayerStore } from '@/stores/player'
import ResetPointsLayer from '@/components/Scripts/PrestigeRealmResets/ResetPointsLayer'
import { useNotificationStore } from '@/stores/notification'
import ResetPrestigePointsLayer from '@/components/Scripts/PrestigeRealmResets/ResetPrestigeLayer'

const playerStore = usePlayerStore()
const notificationStore = useNotificationStore()
let superPrestige = playerStore.prestigeRealm.superPrestige
let superPrestigeStatsCalculated = playerStore.prestigeRealmStatsCalculated.superPrestige

const superPrestigePointsOnReset = ref(
    Math.floor(
        Math.pow(
            (Math.pow(playerStore.prestigeRealm.prestige.amount / 1e5, 0.25) *
                playerStore.prestigeRealmStatsCalculated.superPrestige.gain.multiplier) /
                playerStore.prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.divider,
            playerStore.prestigeRealmStatsCalculated.superPrestige.gain.exponent /
                playerStore.prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.root,
        ),
    ),
)
const prestigePointsToPlusOnePrestigePointOnReset = ref(
    Math.pow(
        (Math.pow(
            superPrestigePointsOnReset.value + 1,
            playerStore.prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.root /
                playerStore.prestigeRealmStatsCalculated.superPrestige.gain.exponent,
        ) *
            playerStore.prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.divider) /
            playerStore.prestigeRealmStatsCalculated.superPrestige.gain.multiplier,
        4,
    ) * 1e5,
)

const SuperPrestigeReset = () => {
    if (superPrestigePointsOnReset.value > 0 && playerStore.prestigeRealm.prestige.amount >= 1e5) {
        superPrestige.amount += superPrestigePointsOnReset.value
        CheckForSuperPrestigeMilestones()
        ResetPrestigePointsLayer(2)
        ResetPointsLayer(2)
    }
}

const CheckForSuperPrestigeMilestones = () => {
    if (superPrestige.amount >= 15 && superPrestige.milestones.milestone1Unlocked == false) {
        superPrestige.milestones.milestone1Unlocked = true
        superPrestige.milestones.milestone2Unlocked = false
        notificationStore.NewNotification('Milestone unlocked', '15 SP', 'superPrestigeMilestone')
    }
}

setInterval(() => {
    superPrestigePointsOnReset.value = Math.floor(
        Math.pow(
            (Math.pow(playerStore.prestigeRealm.prestige.amount / 1e5, 0.25) *
                playerStore.prestigeRealmStatsCalculated.superPrestige.gain.multiplier) /
                playerStore.prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.divider,
            playerStore.prestigeRealmStatsCalculated.superPrestige.gain.exponent /
                playerStore.prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.root,
        ),
    )

    prestigePointsToPlusOnePrestigePointOnReset.value =
        Math.pow(
            (Math.pow(
                superPrestigePointsOnReset.value + 1,
                playerStore.prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.root /
                    playerStore.prestigeRealmStatsCalculated.superPrestige.gain.exponent,
            ) *
                playerStore.prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs
                    .divider) /
                playerStore.prestigeRealmStatsCalculated.superPrestige.gain.multiplier,
            4,
        ) * 1e5
}, 25)

const ToggleSuperPrestigeChallenge1=()=>{
    if(playerStore.prestigeRealm.enteredChallenge!="SPC1"){
        ResetPrestigePointsLayer(2)
        ResetPointsLayer(2)
        playerStore.prestigeRealm.enteredChallenge="SPC1"
        playerStore.prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider=100
    }
    else{
        playerStore.prestigeRealm.enteredChallenge=""
        playerStore.prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider=1
    }
}
</script>
