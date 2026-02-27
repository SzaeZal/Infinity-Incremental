<template>
    <div class="mapButtons">
        <div class="mapButton pointsMapButton">
            <img src="@/components/icons/MapIcons/pin.png" alt="P" class="mapButtonIcon" />
            <div class="mapButtonPin">
                <img
                    src="@/components/icons/MapIcons/pin.png"
                    alt="pin"
                    v-show="!playerStore.prestigeRealmMapPins.points"
                />
                <img
                    src="@/components/icons/MapIcons/pinOff.png"
                    alt="pinOff"
                    v-show="playerStore.prestigeRealmMapPins.points"
                />
            </div>
        </div>
        <div class="mapButton prestigeMapButton">
            <img src="@/components/icons/MapIcons/pin.png" alt="PP" class="mapButtonIcon" />
            <div class="mapButtonPin">
                <img
                    src="@/components/icons/MapIcons/pin.png"
                    alt="pin"
                    v-show="!playerStore.prestigeRealmMapPins.prestige"
                />
                <img
                    src="@/components/icons/MapIcons/pinOff.png"
                    alt="pinOff"
                    v-show="playerStore.prestigeRealmMapPins.prestige"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
</script>
