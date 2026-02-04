<template>
    <div class="coords">
        <p>X: {{ playerStore.navigation.positionX }}</p>
        <p>Y: {{ playerStore.navigation.positionY }}</p>
    </div>
</template>
<script setup>
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore()
</script>