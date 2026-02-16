<template>
    <div class="menuButtons" :class="{'menuButtonDisappear': isMenuOpen, 'menuButtonAppear' : !isMenuOpen}">
        <div class="menuButton"  @click="ToggleMenu">
            <img src="./icons/menuOpen.png" alt="menu open" class="menuIcon openMenu">
            <p class="menuButtonText">Open Menu</p>
        </div>
    </div>
    <div class="menuButtons" :class="{'menuButtonDisappear': !isMenuOpen, 'menuButtonAppear' : isMenuOpen}">
        <div class="menuButton"  @click="ToggleMap">
            <img src="./icons/MainMenuIcons/map.png" alt="map" class="menuIcon openMap">
            <p class="menuButtonText">Map</p>
        </div>
        <div class="menuButton" @click="ToggleStats">
            <img src="./icons/MainMenuIcons/stats.png" alt="menu close" class="menuIcon openStats">
            <p class="menuButtonText">Stats</p>
        </div>
        <div class="menuButton" @click="ToggleMenu">
            <img src="./icons/menuClose.png" alt="menu close" class="menuIcon closeMenu">
            <p class="menuButtonText">Close Menu</p>
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