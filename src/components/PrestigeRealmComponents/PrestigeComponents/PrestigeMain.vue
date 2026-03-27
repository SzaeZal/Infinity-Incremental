<template>
    <div>
        <h2 class="mainCurrencyDisplay">
            You have {{ FormatNumber(prestigeRealmStatsStore.prestige.amount) }} Prestige Points
        </h2>
        <div class="layerMenu">
            <div class="layerSubMenu">
                <div
                    class="subMenuItem"
                    :class="{ selectedSubMenuItem: isPrestigeUpgradesToggled }"
                    @click="TogglePrestigeUpgrades"
                >
                    <h2>Upgrades</h2>
                </div>
                <div
                    class="subMenuItem"
                    :class="{ selectedSubMenuItem: isPrestigeMilestonesToggled }"
                    @click="TogglePrestigeMilestones"
                >
                    <h2>Milestones</h2>
                </div>
            </div>
            <div class="main">
                <PrestigeUpgrades v-show="isPrestigeUpgradesToggled" />
                <PrestigeMilestones v-show="isPrestigeMilestonesToggled" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/Scripts/formatters'
import PrestigeUpgrades from './PrestigeUpgrades.vue'
import PrestigeMilestones from './PrestigeMilestones.vue'
import { usePrestigeRealmStatsStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStats'

const prestigeRealmStatsStore = usePrestigeRealmStatsStore()

const isPrestigeUpgradesToggled = ref(true)
const isPrestigeMilestonesToggled = ref(false)

const TogglePrestigeUpgrades = () => {
    if (isPrestigeUpgradesToggled.value == false) {
        isPrestigeMilestonesToggled.value = false
    }
    isPrestigeUpgradesToggled.value = !isPrestigeUpgradesToggled.value
}

const TogglePrestigeMilestones = () => {
    if (isPrestigeMilestonesToggled.value == false) {
        isPrestigeUpgradesToggled.value = false
    }
    isPrestigeMilestonesToggled.value = !isPrestigeMilestonesToggled.value
}
</script>
