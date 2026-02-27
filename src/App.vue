<template>
  <Positions class="coords"/>
  <MainMenu />
  <DialogBox />
  <Points
    v-show="UIShown.prestigeRealm.points"
    class="element prestigeRealmLayer points"
    :style="UIPositions.prestigeRealm.points"
  />
  <svg
    width="10px"
    height="250px"
    class="element prestigeLayerConnector"
    :style="UIPositions.prestigeRealm.pointsPrestigeConnector"
    v-show="UIShown.prestigeRealm.points || UIShown.prestigeRealm.prestige"
  >
    <line x1="5" y1="0" x2="5" y2="250" />
  </svg>
  <Prestige
    v-show="UIShown.prestigeRealm.prestige"
    class="element prestigeRealmLayer prestige"
    :style="UIPositions.prestigeRealm.prestige"
  />
</template>

<script setup>
import Positions from './components/Positions.vue'
import MainMenu from './components/MainMenu.vue'
import Points from './components/PrestigeRealmComponents/PointsMain.vue'
import GainPoints from './components/Scripts/PrestigeRealmGains/GainPoints'
import { usePlayerStore } from './stores/player'
import { reactive, ref } from 'vue'
import Prestige from './components/PrestigeRealmComponents/PrestigeMain.vue'
import DialogBox from './components/DialogBox.vue'
import GainPrestigePoints from './components/Scripts/PrestigeRealmGains/GainPrestigePoints'

const playerStore = usePlayerStore()

const Tick = (ms) => {
  if (playerStore.prestigeRealm.points.amount != Infinity) {
    GainPoints(playerStore, ms)
    GainPrestigePoints(playerStore, ms)
  }
}

let ticker = setInterval(Tick, 25, 25)

const UIShown = ref({
  prestigeRealm: {
    points: true,
    prestige: false,
  },
})

const UIPositions = ref({
  prestigeRealm: {
    points: reactive({
      left: 0,
      top: 0,
    }),
    pointsPrestigeConnector: reactive({
      left: 0,
      top: 0,
    }),
    prestige: reactive({
      left: 0,
      top: 0,
    }),
  },
})

const UpdateUIPositions = () => {
  let loadedUIBorders = {
    x: playerStore.UISettings.screenSizeX / 2,
    y: playerStore.UISettings.screenSizeY / 2,
  }
  if (playerStore.navigation.realm == 'prestige') {
    let pointsPosition = {
      x: -25 - playerStore.navigation.positionX,
      y: -150 - playerStore.navigation.positionY,
    }

    if (
      Math.abs(pointsPosition.x) - 200 > loadedUIBorders.x ||
      Math.abs(pointsPosition.y) - 200 > loadedUIBorders.y
    ) {
      UIShown.value.prestigeRealm.points = false
    } else {
      UIShown.value.prestigeRealm.points = true
      UIPositions.value.prestigeRealm.points.left = screen.width / 2 + pointsPosition.x + 'px'
      UIPositions.value.prestigeRealm.points.top = screen.height / 2 + pointsPosition.y + 'px'
    }

    let pointsPrestigeConnectorPosition = {
      x: -25 - playerStore.navigation.positionX,
      y: 350 - playerStore.navigation.positionY,
    }
    UIPositions.value.prestigeRealm.pointsPrestigeConnector.left =
      screen.width / 2 + pointsPrestigeConnectorPosition.x + 'px'
    UIPositions.value.prestigeRealm.pointsPrestigeConnector.top =
      screen.height / 2 + pointsPrestigeConnectorPosition.y + 'px'

    let prestigePosition = {
      x: -25 - playerStore.navigation.positionX,
      y: 850 - playerStore.navigation.positionY,
    }

    if (
      Math.abs(prestigePosition.x) - 200 > loadedUIBorders.x ||
      Math.abs(prestigePosition.y) - 200 > loadedUIBorders.y
    ) {
      UIShown.value.prestigeRealm.prestige = false
    } else {
      UIShown.value.prestigeRealm.prestige = true
      UIPositions.value.prestigeRealm.prestige.left = screen.width / 2 + prestigePosition.x + 'px'
      UIPositions.value.prestigeRealm.prestige.top = screen.height / 2 + prestigePosition.y + 'px'
    }
  } else {
    UIShown.value.prestigeRealm.points = false
    UIShown.value.prestigeRealm.prestige = false
  }
}
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
    autoSaveInterval=setInterval(SaveChecker, 25)
  }
})
//#endregion
//#region saving and loading
let currentAutoSaveInterval=ref(5000)
let msSinceSave=0

const Save = () => {
  const playerParsedToJson = playerStore.CreateJson()
  let jwt = CreatePartialJWT(playerParsedToJson)
  localStorage.setItem('InfinityIncSave', jwt)
}

const SaveChecker=()=>{
  msSinceSave+= currentAutoSaveInterval.value==0 ? 0 : 25
  if(currentAutoSaveInterval.value!=playerStore.saveSettings.autoSaveInterval){
    currentAutoSaveInterval.value=playerStore.saveSettings.autoSaveInterval
    msSinceSave=0
    Save()
  }
  else if(msSinceSave>=currentAutoSaveInterval.value && currentAutoSaveInterval.value!=0){
    Save()
    msSinceSave-=currentAutoSaveInterval.value
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
  if (jwt != null || jwt!="") {
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
setInterval(UpdateUIPositions, 15)
//#endregion

let hardResetChecker=setInterval(()=>{
  if(playerStore.hardResetActivate==true){
    clearInterval(autoSaveInterval)
    localStorage.setItem('InfinityIncSave', "")
    clearInterval(hardResetChecker)
    location.reload()
  }
}, 25)

</script>
