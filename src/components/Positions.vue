<template>
    <div>
        <p>X: {{ Math.floor(playerStore.navigation.positionX / 20) }}</p>
        <p>Y: {{ Math.floor(playerStore.navigation.positionY / 20) }}</p>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { usePlayerStore } from '@/stores/player'

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
    startX = e.clientX
    startY = e.clientY
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
}, 25)
</script>
