<template>
    <div class="hasSubMenu">
        <div class="subMenu">
            <div class="subMenuButton" @click="ToggleCurrencies">
                <svg
                    width="150px"
                    height="35px"
                    class="element subMenuSvg"
                >
                    <path d="M20 2 L140 2 L130 33  L10 33 Z"  />
                    <text x="30" y="23">Main currencies</text>
                </svg>
            </div>
            <div class="subMenuButton" @click="ToggleLevels">
                <svg
                    width="150px"
                    height="35px"
                    class="element subMenuSvg"
                >
                    <path d="M20 2 L140 2 L130 33  L10 33 Z"  />
                    <text x="20" y="23">Levels</text>
                </svg>
            </div>
            <div class="subMenuButton" @click="ToggleOtherStats">
                <svg
                    width="150px"
                    height="35px"
                    class="element subMenuSvg"
                >
                    <path d="M20 2 L140 2 L130 33  L10 33 Z"  />
                    <text x="20" y="23">Other</text>
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
import { ref } from 'vue';
import MainCurrencies from './StatsMenuComponents/MainCurrencies.vue';
import Levels from './StatsMenuComponents/Levels.vue';
import OtherStats from './StatsMenuComponents/OtherStats.vue';

const isMainCurrenciesToggled=ref(true)
const isLevelsToggled=ref(false)
const isOtherStatsToggled=ref(true)

const ToggleCurrencies=()=>{
    if(isMainCurrenciesToggled.value==false){
        isLevelsToggled.value=false
        isOtherStatsToggled.value=false
    }
    isMainCurrenciesToggled.value=!isMainCurrenciesToggled.value
}

const ToggleLevels=()=>{
    if(isLevelsToggled.value==false){
        isMainCurrenciesToggled.value=false
        isOtherStatsToggled.value=false
    }
    isLevelsToggled.value=!isLevelsToggled.value
}


const ToggleOtherStats=()=>{
    if(isOtherStatsToggled.value==false){
        isMainCurrenciesToggled.value=false
        isLevelsToggled.value=false
    }
    isOtherStatsToggled.value=!isOtherStatsToggled.value
}

</script>