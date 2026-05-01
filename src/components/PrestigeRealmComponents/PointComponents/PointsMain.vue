<template>
    <div>
        <h2 class="mainCurrencyDisplay">
            You have {{ FormatNumber(prestigeRealmStatsStore.points.amount) }} Points
        </h2>
        <div class="layerMenu">
            <div class="layerSubMenu">
                <button class="subMenuItem selectedSubMenuItem">
                    <h2>Buyables</h2>
                </button>
            </div>
            <div class="main">
                <PointBuyables />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/Scripts/formatters'

import PointBuyables from './PointBuyables.vue'

import { usePrestigeRealmStatsStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStats'

const prestigeRealmStatsStore = usePrestigeRealmStatsStore()
</script>
