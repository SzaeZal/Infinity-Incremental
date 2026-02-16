<template>
    <div class="menuButtons">
        <div class="menuButton" :class="{'openMenuButton': isMenuOpen}" @click="ToggleMenu">
            <img src="./icons/menuOpen.png" alt="menu open" class="menuIcon openMenu">
            <p class="menuButtonText">Open Menu</p>
        </div>
    </div>
    
</template>

<script setup>
import { usePlayerStore } from '@/stores/player';
import { ref } from 'vue';


const playerStore = usePlayerStore()
const isMenuOpen=ref(false)

const ToggleMenu=()=>{
    isMenuOpen.value=!isMenuOpen.value
}



</script>