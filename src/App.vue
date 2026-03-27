<template>
    <Positions class="coords" />
    <MainMenu />
    <DialogBox />
    <Notifications />
    <div class="container" v-bind:style="{'width':settingsStore.UISettings.screenSizeX+'px', 'height': settingsStore.UISettings.screenSizeY+'px'}">
        <PrestigeRealm v-show="navigationStore.currentRealm=='prestige'" />
    </div>
    
</template>

<script setup>
import { reactive, ref } from 'vue'

import Positions from './components/Positions.vue'
import MainMenu from './components/MainMenu.vue'
import DialogBox from './components/DialogBox.vue'
import Notifications from './components/Notifications.vue'
import PrestigeRealm from './components/PrestigeRealmComponents/PrestigeRealm.vue'

import { useNavigationStore } from './stores/Player/navigation'
import { useSettingsStore } from './stores/Player/settings'
import { usePrestigeRealmStatsStore } from './stores/Player/PrestigeRealm/prestigeRealmStats'
import { usePrestigeRealmStatsCalculatedStore } from './stores/Player/PrestigeRealm/prestigeRealmStatsCalculated'
import { usePrestigeRealmMapPinsStore } from './stores/Player/PrestigeRealm/prestigeRealmMapPins'

import GainPoints from './components/Scripts/PrestigeRealm/Points/GainPoints'
import GainPrestigePoints from './components/Scripts/PrestigeRealm/Prestige/GainPrestigePoints'
import Save from './components/Scripts/save'
import Load from './components/Scripts/load'

const navigationStore=useNavigationStore()
const settingsStore=useSettingsStore()
const prestigeRealmStatsStore=usePrestigeRealmStatsStore()
const prestigeRealmStatsCalculatedStore=usePrestigeRealmStatsCalculatedStore()
const prestigeRealmMapPinsStore=usePrestigeRealmMapPinsStore()

const Tick = (ms) => {
    if (prestigeRealmStatsStore.points.amount != Infinity) {
        GainPoints(prestigeRealmStatsStore, prestigeRealmStatsCalculatedStore, ms)
    }

    if(prestigeRealmStatsStore.prestige.amount!=Infinity){
        GainPrestigePoints(prestigeRealmStatsStore, prestigeRealmStatsCalculatedStore, ms)
    }
}

let ticker = setInterval(Tick, 25, 25)

//#region blurstuff
let windowFocused = true
let timeWhenBlurred = 0

$(window).on('blur', () => {
    windowFocused = false
    timeWhenBlurred = Date.now()
    clearInterval(ticker)
    clearInterval(autoSaveInterval)
})

$(window).on('focus', () => {
    if (windowFocused == false) {
        windowFocused = true
        let timeWhenFocused = Date.now()
        let timeDiff = timeWhenFocused - timeWhenBlurred
        Tick(timeDiff)
        ticker = setInterval(Tick, 25, 25)
        autoSaveInterval = setInterval(SaveChecker, 25)
    }
})
//#endregion
//#region saving and loading
let currentAutoSaveInterval = ref(5000)
let msSinceSave = 0

const TriggerSave = () => {
    let player={
        stats:{
            prestigeRealm: prestigeRealmStatsStore.zip(),
        },
        mapPins:{
            prestigeRealm: prestigeRealmMapPinsStore.zip()
        },
        navigation: navigationStore.zip(),
        settings: settingsStore.zip()
    }
    try{
        let playerParsed=JSON.stringify(player)
        Save(playerParsed)
    }
    catch(e){
        console.error(e)
    }
    
}

const SaveChecker = () => {
    msSinceSave += currentAutoSaveInterval.value == 0 ? 0 : 25
    if (currentAutoSaveInterval.value != settingsStore.saveSettings.autoSaveInterval) {
        currentAutoSaveInterval.value = settingsStore.saveSettings.autoSaveInterval
        msSinceSave = 0
        TriggerSave()
    } else if (msSinceSave >= currentAutoSaveInterval.value && currentAutoSaveInterval.value != 0) {
        TriggerSave()
        msSinceSave -= currentAutoSaveInterval.value
    }
}

let autoSaveInterval = setInterval(SaveChecker, 25)


const TriggerLoad = () => {
    let playerSaveJson=Load()
    if(playerSaveJson!=''){
        let player=JSON.parse(playerSaveJson)
        prestigeRealmStatsStore.unzip(player.stats.prestigeRealm)
        navigationStore.unzip(player.navigation)
        settingsStore.unzip(player.settings)
    }
}

TriggerLoad()

//#endregion

let hardResetChecker = setInterval(() => {
    if (settingsStore.hardResetActivate == true) {
        clearInterval(autoSaveInterval)
        localStorage.setItem('InfinityIncSave', '')
        clearInterval(hardResetChecker)
        location.reload()
    }
}, 25)

</script>
