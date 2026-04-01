<template>
    <div class="milestones">
        <div
            class="milestone"
            :class="{ unlockedMilestone: superPrestige.milestones.milestone1Unlocked }"
        >
            <div class="milestoneRequirement">15 Super Prestige Points</div>
            <div class="milestoneEffect">
                Keep the 1st row of prestige upgrades on super prestige resets
            </div>
        </div>
        <div
            class="milestone"
            :class="{ unlockedMilestone: superPrestige.milestones.milestone2Unlocked }"
        >
            <div class="milestoneRequirement">100 Super Prestige Points</div>
            <div class="milestoneEffect">
                Keep the 2nd row of prestige upgrades on super prestige resets
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/Scripts/formatters'
import { usePrestigeRealmStatsStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStats'

const prestigeRealm = usePrestigeRealmStatsStore()
let superPrestige = prestigeRealm.superPrestige
</script>
