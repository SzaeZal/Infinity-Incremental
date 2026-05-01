<template>
    <div>
        <button
            class="layerResetButton"
            :class="{
                superPrestigeResetButton:
                    superPrestigePointsOnReset > 0 && prestigeRealm.prestige.amount >= 1e5,
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
        </button>
        <div class="challenges">
            <button
                class="challenge"
                :class="{ completedChallenge: superPrestige.challenges.challenge1Completed }"
                @click="ToggleSuperPrestigeChallenge1"
            >
                <h2 class="challengeTitle">Slowed points</h2>
                <span class="challengeEntered" v-show="prestigeRealm.enteredChallenge == 'SPC1'">
                    (In Challenge)
                </span>
                <div class="challengeNerfs">
                    <div class="challengeNerf">/100 points</div>
                </div>
                <p class="challengeGoal">Goal: 10000 points</p>
                <div class="challengeRewards">
                    <div class="challengeReward">
                        Reward: Square the effect of prestige upgrade 1-5
                    </div>
                </div>
                <span class="challengeBoxInfo">click to enter/exit challenge</span>
            </button>
            <button
                class="challenge"
                v-show="superPrestige.challenges.challenge2Completed != undefined"
                :class="{ completedChallenge: superPrestige.challenges.challenge2Completed }"
                @click="ToggleSuperPrestigeChallenge2"
            >
                <h2 class="challengeTitle">Double trouble</h2>
                <span class="challengeEntered" v-show="prestigeRealm.enteredChallenge == 'SPC2'">
                    (In Challenge)
                </span>
                <div class="challengeNerfs">
                    <div class="challengeNerf">
                        /1000 points <br>
                        /10 prestige points
                    </div>
                </div>
                <p class="challengeGoal">Goal: 1e5 Prestige Points</p>
                <div class="challengeRewards">
                    <div class="challengeReward">
                        Reward: Square the effect of prestige upgrade 2-5
                    </div>
                </div>
                <span class="challengeBoxInfo">click to enter/exit challenge</span>
            </button>
            <button
                class="challenge"
                v-show="superPrestige.challenges.challenge3Completed != undefined"
                :class="{ completedChallenge: superPrestige.challenges.challenge3Completed }"
                @click="ToggleSuperPrestigeChallenge3"
            >
                <h2 class="challengeTitle">Unpower</h2>
                <span class="challengeEntered" v-show="prestigeRealm.enteredChallenge == 'SPC3'">
                    (In Challenge)
                </span>
                <div class="challengeNerfs">
                    <div class="challengeNerf">
                        ^0.4 points <br>
                        ^0.5 prestige points
                    </div>
                </div>
                <p class="challengeGoal">Goal: 1e10 Prestige Points</p>
                <div class="challengeRewards">
                    <div class="challengeReward">
                        Reward: Unlock prestige power
                    </div>
                </div>
                <span class="challengeBoxInfo">click to enter/exit challenge</span>
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/Scripts/formatters'

import ResetPointsLayer from '@/Scripts/PrestigeRealm/Points/ResetPointsLayer'
import ResetPrestigePointsLayer from '@/Scripts/PrestigeRealm/Prestige/ResetPrestigeLayer'

import { useNotificationStore } from '@/stores/notification'
import { usePrestigeRealmStatsStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStats'
import { usePrestigeRealmStatsCalculatedStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStatsCalculated'

const prestigeRealm = usePrestigeRealmStatsStore()
const prestigeRealmStatsCalculated = usePrestigeRealmStatsCalculatedStore()
const notificationStore = useNotificationStore()
let superPrestige = prestigeRealm.superPrestige

const superPrestigePointsOnReset = ref(
    Math.floor(
        Math.pow(
            (Math.pow(prestigeRealm.prestige.amount / 1e5, 0.25) *
                prestigeRealmStatsCalculated.superPrestige.gain.multiplier) /
                prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.divider,
            prestigeRealmStatsCalculated.superPrestige.gain.exponent /
                prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.root,
        ),
    ),
)
const prestigePointsToPlusOnePrestigePointOnReset = ref(
    Math.pow(
        (Math.pow(
            superPrestigePointsOnReset.value + 1,
            prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.root /
                prestigeRealmStatsCalculated.superPrestige.gain.exponent,
        ) *
            prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.divider) /
            prestigeRealmStatsCalculated.superPrestige.gain.multiplier,
        4,
    ) * 1e5,
)

const SuperPrestigeReset = () => {
    if (superPrestigePointsOnReset.value > 0 && prestigeRealm.prestige.amount >= 1e5) {
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
    if (superPrestige.amount >= 100 && superPrestige.milestones.milestone2Unlocked == false) {
        superPrestige.milestones.milestone2Unlocked = true
        superPrestige.milestones.milestone3Unlocked = false
        notificationStore.NewNotification('Milestone unlocked', '100 SP', 'superPrestigeMilestone')
    }
    if (superPrestige.amount >= 250 && superPrestige.milestones.milestone3Unlocked == false) {
        superPrestige.milestones.milestone3Unlocked = true
        superPrestige.milestones.milestone4Unlocked = false
        notificationStore.NewNotification('Milestone unlocked', '250 SP', 'superPrestigeMilestone')
    }
    if (superPrestige.amount >= 1e4 && superPrestige.milestones.milestone4Unlocked == false) {
        superPrestige.milestones.milestone4Unlocked = true
        superPrestige.milestones.milestone5Unlocked = false
        notificationStore.NewNotification('Milestone unlocked', '1e4 SP', 'superPrestigeMilestone')
    }
    if (superPrestige.amount >= 1e10 && superPrestige.milestones.milestone5Unlocked == false) {
        superPrestige.milestones.milestone5Unlocked = true
        superPrestige.milestones.milestone6Unlocked = false
        notificationStore.NewNotification('Milestone unlocked', '1e10 SP', 'superPrestigeMilestone')
    }
}

setInterval(() => {
    superPrestigePointsOnReset.value = Math.floor(
        Math.pow(
            (Math.pow(prestigeRealm.prestige.amount / 1e5, 0.25) *
                prestigeRealmStatsCalculated.superPrestige.gain.multiplier) /
                prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.divider,
            prestigeRealmStatsCalculated.superPrestige.gain.exponent /
                prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.root,
        ),
    )

    prestigePointsToPlusOnePrestigePointOnReset.value =
        Math.pow(
            (Math.pow(
                superPrestigePointsOnReset.value + 1,
                prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.root /
                    prestigeRealmStatsCalculated.superPrestige.gain.exponent,
            ) *
                prestigeRealmStatsCalculated.superPrestige.gain.challengeNerfs.divider) /
                prestigeRealmStatsCalculated.superPrestige.gain.multiplier,
            4,
        ) * 1e5
}, 25)

const ToggleSuperPrestigeChallenge1 = () => {
    if (prestigeRealm.enteredChallenge != 'SPC1') {
        ResetPrestigePointsLayer(2)
        ResetPointsLayer(2)
        prestigeRealm.enteredChallenge = 'SPC1'
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.root = 1
        prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.root= 1
        prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider=1
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider = 100
    } else {
        prestigeRealm.enteredChallenge = ''
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider = 1
    }
}


const ToggleSuperPrestigeChallenge2 = () => {
    if (prestigeRealm.enteredChallenge != 'SPC2') {
        ResetPrestigePointsLayer(2)
        ResetPointsLayer(2)
        prestigeRealm.enteredChallenge = 'SPC2'
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.root = 1
        prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.root= 1
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider = 1000
        prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider=10
    } else {
        prestigeRealm.enteredChallenge = ''
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider = 1
        prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider=1
    }
}

const ToggleSuperPrestigeChallenge3 = () => {
    if (prestigeRealm.enteredChallenge != 'SPC3') {
        ResetPrestigePointsLayer(2)
        ResetPointsLayer(2)
        prestigeRealm.enteredChallenge = 'SPC3'
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider = 1
        prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider=1
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.root = 2.5
        prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.root= 2
    } else {
        prestigeRealm.enteredChallenge = ''
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.root = 1
        prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.root= 1
    }
}

</script>
