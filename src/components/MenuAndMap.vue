<template>
    <div class="menuButton" :class="{'closeButton': isMenuOpen}" @click="ToggleMenu">
        <p v-if="isMenuOpen">Close</p>
        <p v-else>Menu</p>
    </div>
    <div class="mapButton" :class="{'closeButton': isMapOpen}" @click="ToggleMap">
        <p v-if="isMapOpen">Close</p>
        <p v-else>Map</p>
    </div>
</template>

<script setup>
import { usePlayerStore } from '@/stores/player';
import { ref } from 'vue';


const playerStore = usePlayerStore()
const isMapOpen = ref(false)
const isMenuOpen=ref(false)

const ToggleMenu=()=>{
    if(isMapOpen.value){
        ToggleMap()
    }
    isMenuOpen.value=!isMenuOpen.value
}


const ToggleMap=()=>{
    if(isMenuOpen.value){
        ToggleMenu()
    }
    isMapOpen.value=!isMapOpen.value
}

</script>