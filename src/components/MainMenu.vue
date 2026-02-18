<template>
    <div class="menuButtons mainMenuButtons" :class="{'menuButtonDisappear': isMenuClosed, 'menuButtonAppear' : isMenuOpen}">
        <div class="menuButton"  @click="ToggleSettings">
            <img src="./icons/MainMenuIcons/settings.png" alt="settings" class="menuIcon openSettings">
            <p class="menuButtonText">Settings</p>
        </div>
        <div class="menuButton"  @click="ToggleInformation">
            <img src="./icons/MainMenuIcons/information.png" alt="information" class="menuIcon openInformation">
            <p class="menuButtonText">Information</p>
        </div>
        <div class="menuButton"  @click="ToggleStory">
            <img src="./icons/MainMenuIcons/story.png" alt="story" class="menuIcon openStory">
            <p class="menuButtonText">Story</p>
        </div>
        <div class="menuButton"  @click="ToggleInfinities">
            <img src="./icons/MainMenuIcons/infinity.png" alt="story" class="menuIcon openInfinities">
            <p class="menuButtonText">Infinities</p>
        </div>
        <div class="menuButton"  @click="ToggleMap">
            <img src="./icons/MainMenuIcons/map.png" alt="map" class="menuIcon openMap">
            <p class="menuButtonText">Map</p>
        </div>
        <div class="menuButton" @click="ToggleStats">
            <img src="./icons/MainMenuIcons/stats.png" alt="menu close" class="menuIcon openStats">
            <p class="menuButtonText">Stats</p>
        </div>
        <div class="menuButton" @click="CloseMenu">
            <img src="./icons/menuClose.png" alt="menu close" class="menuIcon closeMenu">
            <p class="menuButtonText">Close Menu</p>
        </div>
    </div>
    <div class="menuButtons" :class="{'menuButtonDisappear': isMenuOpen, 'menuButtonAppear' : isMenuClosed}">
        <div class="menuButton"  @click="OpenMenu">
            <img src="./icons/menuOpen.png" alt="menu open" class="menuIcon openMenu">
            <p class="menuButtonText">Open Menu</p>
        </div>
    </div>
    <div class="menu" :class="{'mainMap' : isMapToggled,
         'mainSettings' : isSettingsToggled,
         'mainInformation': isInformationToggled,
         'mainStory' : isStoryToggled,
         'mainInfinities' : isInfinitiesToggled,
         'mainStats' : isStatsToggled}">
        <SettingsMain v-show="isSettingsToggled" />
        <Map v-show="isMapToggled" />
        <InformationMain v-show="isInformationToggled" />
        <StoryMain v-show="isStoryToggled" />
        <InfinitiesMain v-show="isInfinitiesToggled" />
        <StatsMain v-show="isStatsToggled" />
    </div>
</template>

<script setup>
import { usePlayerStore } from '@/stores/player';
import { ref } from 'vue';
import Map from '../MenuComponents/Map.vue';
import SettingsMain from '@/MenuComponents/SettingsMain.vue';
import InformationMain from '@/MenuComponents/InformationMain.vue';
import StoryMain from '@/MenuComponents/StoryMain.vue';
import InfinitiesMain from '@/MenuComponents/InfinitiesMain.vue';
import StatsMain from '@/MenuComponents/StatsMain.vue';


const playerStore = usePlayerStore()
const isMenuOpen=ref(false)
const isMenuClosed=ref(false)
const isSettingsToggled=ref(false)
const isMapToggled=ref(false)
const isInformationToggled=ref(false)
const isStoryToggled=ref(false)
const isInfinitiesToggled=ref(false)
const isStatsToggled=ref(false)

const OpenMenu=()=>{
    isMenuOpen.value=true
    isMenuClosed.value=false
}

const CloseMenu=()=>{
    if(isSettingsToggled.value==false){
        isMapToggled.value=false
        isInformationToggled.value=false
        isStoryToggled.value=false
        isInfinitiesToggled.value=false
        isStatsToggled.value=false
        isSettingsToggled.value=false
    }
    isMenuOpen.value=false
    isMenuClosed.value=true    
}

const ToggleSettings=()=>{
    if(isSettingsToggled.value==false){
        isMapToggled.value=false
        isInformationToggled.value=false
        isStoryToggled.value=false
        isInfinitiesToggled.value=false
        isStatsToggled.value=false
    }
    isSettingsToggled.value=!isSettingsToggled.value
    
}

const ToggleMap=()=>{
    if(isMapToggled.value==false){
        isSettingsToggled.value=false
        isInformationToggled.value=false
        isStoryToggled.value=false
        isInfinitiesToggled.value=false
        isStatsToggled.value=false
    }
    isMapToggled.value=!isMapToggled.value
}

const ToggleInformation=()=>{
    if(isInformationToggled.value==false){
        isSettingsToggled.value=false
        isMapToggled.value=false
        isStoryToggled.value=false
        isInfinitiesToggled.value=false
        isStatsToggled.value=false
    }
    isInformationToggled.value=!isInformationToggled.value
}

const ToggleStory=()=>{
    if(isStoryToggled.value==false){
        isSettingsToggled.value=false
        isMapToggled.value=false
        isInformationToggled.value=false
        isInfinitiesToggled.value=false
        isStatsToggled.value=false
    }
    isStoryToggled.value=!isStoryToggled.value
}

const ToggleInfinities=()=>{
    if(isInfinitiesToggled.value==false){
        isSettingsToggled.value=false
        isMapToggled.value=false
        isInformationToggled.value=false
        isStoryToggled.value=false
        isStatsToggled.value=false
    }
    isInfinitiesToggled.value=!isInfinitiesToggled.value
}

const ToggleStats=()=>{
    if(isStatsToggled.value==false){
        isSettingsToggled.value=false
        isMapToggled.value=false
        isInformationToggled.value=false
        isStoryToggled.value=false
        isInfinitiesToggled.value=false
    }
    isStatsToggled.value=!isStatsToggled.value
}

</script>