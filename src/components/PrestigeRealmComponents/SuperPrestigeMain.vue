<template>
    <div>
        <h2 class="mainCurrencyDisplay">
            You have {{ FormatNumber(playerStore.prestigeRealm.superPrestige.amount) }} Super
            Prestige Points 
            <img src="../icons/Arrows/arrowRight.png" alt="->">
            x{{
                FormatNumber(playerStore.prestigeRealmStatsCalculated.superPrestige.effects.effectOnPoints)
            }}
            points, x{{FormatNumber(playerStore.prestigeRealmStatsCalculated.superPrestige.effects.effectOnPrestigePoints)}} prestige points
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
                        playerStore.prestigeRealm.superPrestige.challenges.challenge3 !=
                            undefined &&
                        playerStore.prestigeRealm.superPrestige.challenges.challenge3.completed ==
                            true
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
import { FormatNumber } from '@/components/Scripts/formatters'
import { usePlayerStore } from '@/stores/player'
import SuperPrestigeMilestones from './SuperPrestigeComponents/SuperPrestigeMilestones.vue'
import SuperPrestigeChallenges from './SuperPrestigeComponents/SuperPrestigeChallenges.vue'
import PrestigePower from './SuperPrestigeComponents/PrestigePower.vue'

const playerStore = usePlayerStore()

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
