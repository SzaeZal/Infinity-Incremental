<template>
  <Positions class="coords" :navigation="playerStore.navigation" />
  <Points
    v-show="UIShown.prestigeRealm.points"
    class="element prestigeRealmLayer points"
    :style="UIPositions.prestigeRealm.points"
    :points="playerStore.prestigeRealm.points"
    :points-stats-calculated="playerStore.prestigeRealmStatsCalculated.points"
  />
</template>

<script setup>
import Positions from './components/Positions.vue'
import Points from './components/Points.vue'
import { usePlayerStore } from './stores/player'
import { reactive, ref } from 'vue'

const playerStore = usePlayerStore()

const UIShown = ref({
  prestigeRealm: {
    points: true,
  },
})

const UIPositions = ref({
  prestigeRealm: {
    points: reactive({
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
      x: 0 - playerStore.navigation.positionX,
      y: -250 - playerStore.navigation.positionY,
    }

    if (
      Math.abs(pointsPosition.x) > loadedUIBorders.x ||
      Math.abs(pointsPosition.y) > loadedUIBorders.y
    ) {
      UIShown.value.prestigeRealm.points = false
    } else {
      UIShown.value.prestigeRealm.points = true
      UIPositions.value.prestigeRealm.points.left = screen.availWidth / 2 + pointsPosition.x + 'px'
      UIPositions.value.prestigeRealm.points.top = screen.availHeight / 2 + pointsPosition.y + 'px'
    }
  } else {
    UIShown.value.prestigeRealm.points = false
  }
}

//#region saving and loading
const Save = () => {
  const playerParsedToJson = playerStore.CreateJson()
  let jwt = CreatePartialJWT(playerParsedToJson)
  localStorage.setItem('InfinityIncSave', jwt)
}

const CreatePartialJWT = (payloadInJson) => {
  let payloadInBase64 = btoa(payloadInJson)
  let jwt = payloadInBase64
  return jwt
}

const DecodePartialJwt = () => {
  let jwt = localStorage.getItem('InfinityIncSave')
  if (jwt != null) {
    return atob(jwt)
  }
  return null
}

let autoSaveInterval = setInterval(Save, 5000)
const Load = () => {
  let playerSaveJson = DecodePartialJwt()
  try {
    playerStore.Load(playerSaveJson)

    if (playerStore.saveSettings.autoSaveInterval != 0) {
      autoSaveInterval = setInterval(Save, playerStore.saveSettings.autoSaveInterval)
    } else {
      clearInterval(autoSaveInterval)
    }
  } catch (e) {
    console.log(e)
  }
}
//Load()
UpdateUIPositions()
//#endregion

//#region navigation
let startX = 0,
  startY = 0,
  container = $('#app')

const MouseDown = (e) => {
  startX = e.clientX
  startY = e.clientY

  container.on('mousemove', MouseMove)
}

const MouseMove = (e) => {
  playerStore.navigation.positionX += startX - e.clientX
  playerStore.navigation.positionY += startY - e.clientY
  startX = e.clientX
  startY = e.clientY
  UpdateUIPositions()
}

const MouseUp = () => {
  container.off('mousemove')
}

container.on('mousedown', MouseDown)
container.on('mouseup', MouseUp)

const MoveDown = () => {
  playerStore.navigation.positionY += 20
}

const MoveUp = () => {
  playerStore.navigation.positionY -= 20
}

const MoveLeft = () => {
  playerStore.navigation.positionX -= 20
}

const MoveRight = () => {
  playerStore.navigation.positionX += 20
}
const activeMoveDirections = ref({
  Down: false,
  Up: false,
  Left: false,
  Right: false,
})

$(document).on('keydown', (e) => {
  if (e.originalEvent.code == 'KeyS' || e.originalEvent.code == 'ArrowDown') {
    activeMoveDirections.Down = true
  }

  if (e.originalEvent.code == 'KeyW' || e.originalEvent.code == 'ArrowUp') {
    activeMoveDirections.Up = true
  }

  if (e.originalEvent.code == 'KeyA' || e.originalEvent.code == 'ArrowLeft') {
    activeMoveDirections.Left = true
  }

  if (e.originalEvent.code == 'KeyD' || e.originalEvent.code == 'ArrowRight') {
    activeMoveDirections.Right = true
  }
})

$(document).on('keyup', (e) => {
  if (e.originalEvent.code == 'KeyS' || e.originalEvent.code == 'ArrowDown') {
    activeMoveDirections.Down = false
  }

  if (e.originalEvent.code == 'KeyW' || e.originalEvent.code == 'ArrowUp') {
    activeMoveDirections.Up = false
  }

  if (e.originalEvent.code == 'KeyA' || e.originalEvent.code == 'ArrowLeft') {
    activeMoveDirections.Left = false
  }

  if (e.originalEvent.code == 'KeyD' || e.originalEvent.code == 'ArrowRight') {
    activeMoveDirections.Right = false
  }
})

setInterval(() => {
  if (activeMoveDirections.Up == true) MoveUp()
  if (activeMoveDirections.Down == true) MoveDown()
  if (activeMoveDirections.Left == true) MoveLeft()
  if (activeMoveDirections.Right == true) MoveRight()
  if (
    activeMoveDirections.Up == true ||
    activeMoveDirections.Down == true ||
    activeMoveDirections.Left == true ||
    activeMoveDirections.Right == true
  ) {
    UpdateUIPositions()
  }
}, 25)
//#endregion
</script>
