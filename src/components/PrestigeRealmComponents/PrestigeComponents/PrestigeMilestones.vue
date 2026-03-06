<template>
    <div class="milestones">
        <div
            class="milestone"
            :class="{ unlockedMilestone: prestige.milestones.milestone1Unlocked }"
        >
            <div class="milestoneRequirement">2 Prestige Points</div>
            <div class="milestoneEffect">Unlock Point buyable 3</div>
        </div>
        <div
            class="milestone"
            v-show="prestige.milestones.milestone2Unlocked != undefined"
            :class="{ unlockedMilestone: prestige.milestones.milestone2Unlocked }"
        >
            <div class="milestoneRequirement">8 Prestige Points</div>
            <div class="milestoneEffect">Keep Point buyable 2 on prestige resets</div>
        </div>
        <div
            class="milestone"
            v-show="prestige.milestones.milestone3Unlocked != undefined"
            :class="{ unlockedMilestone: prestige.milestones.milestone3Unlocked }"
        >
            <div class="milestoneRequirement">50 Prestige Points</div>
            <div class="milestoneEffect">Keep Point buyable 3 on prestige resets</div>
        </div>
        <div
            class="milestone"
            v-show="prestige.milestones.milestone4Unlocked != undefined"
            :class="{ unlockedMilestone: prestige.milestones.milestone4Unlocked }"
        >
            <div class="milestoneRequirement">150 Prestige Points</div>
            <div class="milestoneEffect">Unlock another row of prestige upgrades</div>
        </div>
        <div
            class="milestone"
            v-show="prestige.milestones.milestone5Unlocked != undefined"
            :class="{ unlockedMilestone: prestige.milestones.milestone5Unlocked }"
        >
            <div class="milestoneRequirement">1e5 Prestige Points</div>
            <div class="milestoneEffect">Unlock the next primary prestige layer</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/components/Scripts/formatters'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
let prestige = playerStore.prestigeRealm.prestige
</script>
