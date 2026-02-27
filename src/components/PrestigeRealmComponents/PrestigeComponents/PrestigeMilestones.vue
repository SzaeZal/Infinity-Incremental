<template>
    <div class="milestones">
        
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/components/Scripts/formatters'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
let prestige= playerStore.prestigeRealm.prestige
let prestigeStatsCalculated=playerStore.prestigeRealmStatsCalculated.prestige


</script>
