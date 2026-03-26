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
import { usePlayerStore } from './stores/player'

import Positions from './components/Positions.vue'
import MainMenu from './components/MainMenu.vue'
import DialogBox from './components/DialogBox.vue'
import Notifications from './components/Notifications.vue'
import PrestigeRealm from './components/PrestigeRealmComponents/PrestigeRealm.vue'

import { useNavigationStore } from './stores/Player/navigation'
import { useSettingsStore } from './stores/Player/settings'

import GainPoints from './components/Scripts/PrestigeRealm/PrestigeRealmGains/GainPoints'
import GainPrestigePoints from './components/Scripts/PrestigeRealm/PrestigeRealmGains/GainPrestigePoints'
import { usePrestigeRealmStatsStore } from './stores/Player/PrestigeRealm/prestigeRealmStats'
import { usePrestigeRealmStatsCalculatedStore } from './stores/Player/PrestigeRealm/prestigeRealmStatsCalculated'

const playerStore = usePlayerStore()

const navigationStore=useNavigationStore()
const settingsStore=useSettingsStore()
const prestigeRealmStatsStore=usePrestigeRealmStatsStore()
const prestigeRealmStatsCalculatedStore=usePrestigeRealmStatsCalculatedStore()

const Tick = (ms) => {
    if (prestigeRealmStatsStore.points.amount != Infinity) {
        GainPoints(prestigeRealmStatsStore, prestigeRealmStatsCalculatedStore, ms)
    }

    if(prestigeRealmStatsStore.prestige.amount!=Infinity){
        GainPrestigePoints(playerStore, ms)
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

const Save = () => {
    const playerParsedToJson = playerStore.CreateJson()
    let jwt = CreatePartialJWT(playerParsedToJson)
    localStorage.setItem('InfinityIncSave', jwt)
}

const SaveChecker = () => {
    msSinceSave += currentAutoSaveInterval.value == 0 ? 0 : 25
    if (currentAutoSaveInterval.value != playerStore.saveSettings.autoSaveInterval) {
        currentAutoSaveInterval.value = playerStore.saveSettings.autoSaveInterval
        msSinceSave = 0
        Save()
    } else if (msSinceSave >= currentAutoSaveInterval.value && currentAutoSaveInterval.value != 0) {
        Save()
        msSinceSave -= currentAutoSaveInterval.value
    }
}

let autoSaveInterval = setInterval(SaveChecker, 25)

const CreatePartialJWT = (payloadInJson) => {
    let payloadInBase64 = btoa(payloadInJson)
    let jwt = payloadInBase64
    return jwt
}

const DecodePartialJwt = () => {
    let jwt = localStorage.getItem('InfinityIncSave')
    if (jwt != null || jwt != '') {
        return atob(jwt)
    }
    return null
}
const Load = () => {
    let playerSaveJson = DecodePartialJwt()
    try {
        playerStore.Load(playerSaveJson)
    } catch (e) {
        console.log(e)
    }
}

Load()

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
