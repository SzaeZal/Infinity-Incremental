<template>
    <div class="hasSubMenu">
        <div class="subMenu">
            <div class="subMenuButton" @click="ToggleCurrencies">
                <svg width="175px" height="35px" class="element subMenuSvg">
                    <path d="M20 2 L170 2 L160 33  L10 33 Z" />
                    <text x="25" y="24">Main currencies</text>
                </svg>
            </div>
            <div class="subMenuButton" @click="ToggleLevels">
                <svg width="175px" height="35px" class="element subMenuSvg">
                    <path d="M20 2 L170 2 L160 33  L10 33 Z" />
                    <text x="60" y="24">Levels</text>
                </svg>
            </div>
            <div class="subMenuButton" @click="ToggleOtherStats">
                <svg width="175px" height="35px" class="element subMenuSvg">
                    <path d="M20 2 L170 2 L160 33  L10 33 Z" />
                    <text x="66" y="24">Other</text>
                </svg>
            </div>
        </div>
        <div class="subContent">
            <MainCurrencies v-show="isMainCurrenciesToggled" />
            <Levels v-show="isLevelsToggled" />
            <OtherStats v-show="isOtherStatsToggled" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import MainCurrencies from './StatsMenuComponents/MainCurrencies.vue'
import Levels from './StatsMenuComponents/Levels.vue'
import OtherStats from './StatsMenuComponents/OtherStats.vue'

const isMainCurrenciesToggled = ref(true)
const isLevelsToggled = ref(false)
const isOtherStatsToggled = ref(true)

const ToggleCurrencies = () => {
    if (isMainCurrenciesToggled.value == false) {
        isLevelsToggled.value = false
        isOtherStatsToggled.value = false
    }
    isMainCurrenciesToggled.value = !isMainCurrenciesToggled.value
}

const ToggleLevels = () => {
    if (isLevelsToggled.value == false) {
        isMainCurrenciesToggled.value = false
        isOtherStatsToggled.value = false
    }
    isLevelsToggled.value = !isLevelsToggled.value
}

const ToggleOtherStats = () => {
    if (isOtherStatsToggled.value == false) {
        isMainCurrenciesToggled.value = false
        isLevelsToggled.value = false
    }
    isOtherStatsToggled.value = !isOtherStatsToggled.value
}
</script>

<style scoped>
.subMenuSvg {
    path {
        stroke-width: 2px;
        fill: none;
        stroke: rgb(0, 96, 0);
    }
    text {
        font-size: 20px;
        fill: black;
    }
}
.subMenuButton:hover {
    .subMenuSvg {
        scale: 1.05;
        path {
            fill: rgba(0, 0, 0, 0.05);
        }
    }
}
</style>
