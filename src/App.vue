<template>
  <Positions />
</template>

<script setup>
import Positions from './components/Positions.vue'
import { usePlayerStore } from './stores/player'
import { ref } from 'vue'

const playerStore = usePlayerStore()
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
  startX=e.clientX
  startY=e.clientY
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

$(document).keydown((e) => {
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

$(document).keyup((e) => {
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

const UpdateUIPositions = () => {
  if (playerStore.navigation.currentRealm == 'prestige') {
  }
}
</script>
