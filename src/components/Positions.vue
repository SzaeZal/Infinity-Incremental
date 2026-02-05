<template>
    <div>
        <p>X: {{ Math.floor(navigation.positionX /20) }}</p>
        <p>Y: {{ Math.floor(navigation.positionY /20) }}</p>
    </div>
</template>
<script setup>
defineProps({
    navigation: Object
})
</script>