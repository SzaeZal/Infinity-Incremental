<template>
    <div class="milestones">
        <div
            class="milestone"
            :class="{ unlockedMilestone: superPrestige.milestones.milestone1Unlocked }"
        >
            <div class="milestoneRequirement">15 Super Prestige Points</div>
            <div class="milestoneEffect">Keep the 1st row of prestige upgrades on super prestige resets</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/components/Scripts/formatters'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
let superPrestige = playerStore.prestigeRealm.superPrestige
</script>
