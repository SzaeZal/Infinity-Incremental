<template>
    <div>
        <h2 class="mainCurrencyDisplay">
            You have {{ FormatNumber(prestigeRealm.superPrestige.amount) }} Super Prestige Points
            <img src="../icons/Arrows/arrowRight.png" alt="->" />
            x{{
                FormatNumber(prestigeRealmStatsCalculated.superPrestige.effects.effectOnPoints)
            }}
            points, x{{
                FormatNumber(
                    prestigeRealmStatsCalculated.superPrestige.effects.effectOnPrestigePoints,
                )
            }}
            prestige points
        </h2>
        <div class="layerMenu">
            <div class="layerSubMenu">
                <div
                    class="subMenuItem"
                    :class="{ selectedSubMenuItem: isSuperPrestigeChallengesToggled }"
                    @click="ToggleSuperPrestigeChallenges"
                >
                    <h2>Challenges</h2>
                </div>
                <div
                    class="subMenuItem"
                    :class="{ selectedSubMenuItem: isSuperPrestigeMilestonesToggled }"
                    @click="ToggleSuperPrestigeMilestones"
                >
                    <h2>Milestones</h2>
                </div>
                <div
                    class="subMenuItem"
                    :class="{ selectedSubMenuItem: isPrestigePowerToggled }"
                    @click="TogglePrestigePower"
                    v-show="
                        prestigeRealm.superPrestige.challenges.challenge3 != undefined &&
                        prestigeRealm.superPrestige.challenges.challenge3.completed == true
                    "
                >
                    <h2>Power</h2>
                </div>
            </div>
            <div class="main">
                <SuperPrestigeChallenges v-show="isSuperPrestigeChallengesToggled" />
                <SuperPrestigeMilestones v-show="isSuperPrestigeMilestonesToggled" />
                <PrestigePower v-show="isPrestigePowerToggled" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/Scripts/formatters'

import SuperPrestigeMilestones from './SuperPrestigeMilestones.vue'
import SuperPrestigeChallenges from './SuperPrestigeChallenges.vue'
import PrestigePower from './PrestigePower.vue'

import { usePrestigeRealmStatsStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStats'
import { usePrestigeRealmStatsCalculatedStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStatsCalculated'

const prestigeRealm = usePrestigeRealmStatsStore()
const prestigeRealmStatsCalculated = usePrestigeRealmStatsCalculatedStore()

const isSuperPrestigeChallengesToggled = ref(true)
const isSuperPrestigeMilestonesToggled = ref(false)
const isPrestigePowerToggled = ref(false)

const ToggleSuperPrestigeChallenges = () => {
    if (isSuperPrestigeChallengesToggled.value == false) {
        isSuperPrestigeMilestonesToggled.value = false
        isPrestigePowerToggled.value = false
    }
    isSuperPrestigeChallengesToggled.value = !isSuperPrestigeChallengesToggled.value
}

const ToggleSuperPrestigeMilestones = () => {
    if (isSuperPrestigeMilestonesToggled.value == false) {
        isSuperPrestigeChallengesToggled.value = false
        isPrestigePowerToggled.value = false
    }
    isSuperPrestigeMilestonesToggled.value = !isSuperPrestigeMilestonesToggled.value
}

const TogglePrestigePower = () => {
    if (isPrestigePowerToggled.value == false) {
        isSuperPrestigeChallengesToggled.value = false
        isSuperPrestigeMilestonesToggled.value = false
    }
    isPrestigePowerToggled.value = !isPrestigePowerToggled.value
}
</script>
