<template>
    <div>
        <div
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
        </div>
        <div class="challenges">
            <div
                class="challenge"
                :class="{ completedChallenge: superPrestige.challenges.challenge1Completed }"
                @click="ToggleSuperPrestigeChallenge1"
            >
                <div class="challengeTitle">Slowed points</div>
                <div class="challengeEntered" v-show="prestigeRealm.enteredChallenge == 'SPC1'">
                    (In Challenge)
                </div>
                <div class="challengeNerfs">
                    <div class="challengeNerf">/100 points</div>
                </div>
                <div class="challengeGoal">Goal: 10000 points</div>
                <div class="challengeRewards">
                    <div class="challengeReward">
                        Reward: Square the effect of prestige upgrade 1-5
                    </div>
                </div>
                <div class="challengeBoxInfo">click to enter/exit challenge</div>
            </div>
            <div
                class="challenge"
                v-show="superPrestige.challenges.challenge2Completed != undefined"
                :class="{ completedChallenge: superPrestige.challenges.challenge2Completed }"
                @click="ToggleSuperPrestigeChallenge2"
            >
                <div class="challengeTitle">Double trouble</div>
                <div class="challengeEntered" v-show="prestigeRealm.enteredChallenge == 'SPC2'">
                    (In Challenge)
                </div>
                <div class="challengeNerfs">
                    <div class="challengeNerf">
                        /1000 points <br>
                        /10 prestige points
                    </div>
                </div>
                <div class="challengeGoal">Goal: 1e5 Prestige Points</div>
                <div class="challengeRewards">
                    <div class="challengeReward">
                        Reward: Square the effect of prestige upgrade 2-5
                    </div>
                </div>
                <div class="challengeBoxInfo">click to enter/exit challenge</div>
            </div>
            <div
                class="challenge"
                v-show="superPrestige.challenges.challenge3Completed != undefined"
                :class="{ completedChallenge: superPrestige.challenges.challenge3Completed }"
                @click="ToggleSuperPrestigeChallenge3"
            >
                <div class="challengeTitle">Rooted trouble</div>
                <div class="challengeEntered" v-show="prestigeRealm.enteredChallenge == 'SPC3'">
                    (In Challenge)
                </div>
                <div class="challengeNerfs">
                    <div class="challengeNerf">
                        ^0.4 points <br>
                        ^0.5 prestige points
                    </div>
                </div>
                <div class="challengeGoal">Goal: 1e6 Prestige Points</div>
                <div class="challengeRewards">
                    <div class="challengeReward">
                        Reward: Square the effects super prestige points
                    </div>
                </div>
                <div class="challengeBoxInfo">click to enter/exit challenge</div>
            </div>
            <div
                class="challenge"
                v-show="superPrestige.challenges.challenge4Completed != undefined"
            ></div>
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
