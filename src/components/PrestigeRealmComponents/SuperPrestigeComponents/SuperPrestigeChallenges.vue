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
            ></div>
            <div
                class="challenge"
                v-show="superPrestige.challenges.challenge3Completed != undefined"
            ></div>
            <div
                class="challenge"
                v-show="superPrestige.challenges.challenge4Completed != undefined"
            ></div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/components/Scripts/formatters'

import ResetPointsLayer from '@/components/Scripts/PrestigeRealm/Points/ResetPointsLayer'
import ResetPrestigePointsLayer from '@/components/Scripts/PrestigeRealm/Prestige/ResetPrestigeLayer'

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
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider = 100
    } else {
        prestigeRealm.enteredChallenge = ''
        prestigeRealmStatsCalculated.points.gain.challengeNerfs.divider = 1
    }
}
</script>
