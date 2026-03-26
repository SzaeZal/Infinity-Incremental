<template>
    <div>
        <h2 class="mainCurrencyDisplay">You have {{ FormatNumber(points.amount) }} Points</h2>
        <div class="layerMenu">
            <div class="layerSubMenu">
                <div class="subMenuItem selectedSubMenuItem">
                    <h2>Buyables</h2>
                </div>
            </div>
            <div class="main">
                <PointBuyables />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/components/Scripts/formatters'
import { usePlayerStore } from '@/stores/player'
import PointBuyables from './PointBuyables.vue'

const playerStore = usePlayerStore()
let points = playerStore.prestigeRealm.points
let pointsStatsCalculated = playerStore.prestigeRealmStatsCalculated.points
</script>
