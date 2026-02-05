<template>
  <Positions />
</template>

<script setup>
import Positions from './components/Positions.vue'
import { usePlayerStore } from './stores/player'
import { ref } from 'vue'

const playerStore = usePlayerStore()

const UpdateUIPositions = () => {
  if (playerStore.navigation.currentRealm == 'prestige') {
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

let autoSaveInterval
const Load = () => {
  let playerSaveJson = DecodePartialJwt()
  try {
    playerStore.Load(playerSaveJson)
    
    if(playerStore.saveSettings.autoSaveInterval!=0){
      autoSaveInterval = setInterval(Save, playerStore.saveSettings.autoSaveInterval)
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
