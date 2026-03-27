<template>
    <div class="mapButtons">
        <div class="mapButton pointsMapButton">
            <img src="@/components/icons/MapIcons/pin.png" alt="P" class="mapButtonIcon" />
            <div class="mapButtonPin">
                <img
                    src="@/components/icons/MapIcons/pin.png"
                    alt="pin"
                    v-show="!prestigeRealmMapPinsStore.pointsMapPin"
                />
                <img
                    src="@/components/icons/MapIcons/pinOff.png"
                    alt="pinOff"
                    v-show="prestigeRealmMapPinsStore.pointsMapPin"
                />
            </div>
        </div>
        <div class="mapButton prestigeMapButton">
            <img src="@/components/icons/MapIcons/pin.png" alt="PP" class="mapButtonIcon" />
            <div class="mapButtonPin">
                <img
                    src="@/components/icons/MapIcons/pin.png"
                    alt="pin"
                    v-show="!prestigeRealmMapPinsStore.prestigeMapPin"
                />
                <img
                    src="@/components/icons/MapIcons/pinOff.png"
                    alt="pinOff"
                    v-show="prestigeRealmMapPinsStore.prestigeMapPin"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { usePrestigeRealmMapPinsStore } from '@/stores/Player/PrestigeRealm/prestigeRealmMapPins';


const prestigeRealmMapPinsStore=usePrestigeRealmMapPinsStore()
</script>
