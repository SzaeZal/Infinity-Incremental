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
            v-show="superPrestige.milestones.milestone2Unlocked!=undefined"
            :class="{ unlockedMilestone: superPrestige.milestones.milestone2Unlocked }"
        >
            <div class="milestoneRequirement">100 Super Prestige Points</div>
            <div class="milestoneEffect">
                Keep the 2nd row of prestige upgrades on super prestige resets
            </div>
        </div>
        <div
            class="milestone"
            v-show="superPrestige.milestones.milestone3Unlocked!=undefined"
            :class="{ unlockedMilestone: superPrestige.milestones.milestone3Unlocked }"
        >
            <div class="milestoneRequirement">250 Super Prestige Points</div>
            <div class="milestoneEffect">
                Unlock the 3rd row of prestige upgrades
            </div>
        </div>
        <div
            class="milestone"
            v-show="superPrestige.milestones.milestone4Unlocked!=undefined"
            :class="{ unlockedMilestone: superPrestige.milestones.milestone4Unlocked }"
        >
            <div class="milestoneRequirement">1e4 Super Prestige Points</div>
            <div class="milestoneEffect">
                Keep prestige milestones on super prestige resets
            </div>
        </div>
        <div
            class="milestone"
            v-show="superPrestige.milestones.milestone5Unlocked!=undefined"
            :class="{ unlockedMilestone: superPrestige.milestones.milestone5Unlocked }"
        >
            <div class="milestoneRequirement">1e10 Super Prestige Points</div>
            <div class="milestoneEffect">
                Keep the 3rd row of prestige upgrades on super prestige resets
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
