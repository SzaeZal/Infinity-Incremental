<template>
    <div>
        <Points
            v-show="UIShown.prestigeRealm.points"
            class="element prestigeRealmLayer points"
            :style="UIPositions.prestigeRealm.points"
        />
        <svg
            width="10px"
            height="250px"
            class="element prestigeLayerConnector"
            :style="UIPositions.prestigeRealm.pointsPrestigeConnector"
            v-show="UIShown.prestigeRealm.points || UIShown.prestigeRealm.prestige"
        >
            <line x1="5" y1="0" x2="5" y2="250" />
        </svg>
        <Prestige
            v-show="UIShown.prestigeRealm.prestige"
            class="element prestigeRealmLayer prestige"
            :style="UIPositions.prestigeRealm.prestige"
        />
        <svg
            width="10px"
            height="250px"
            class="element prestigeLayerConnector"
            :style="UIPositions.prestigeRealm.prestigeSuperPrestigeConnector"
            v-show="UIShown.prestigeRealm.prestige || UIShown.prestigeRealm.superPrestige"
        >
            <line x1="5" y1="0" x2="5" y2="250" />
        </svg>
        <SuperPrestige
            v-show="UIShown.prestigeRealm.superPrestige"
            class="element prestigeRealmLayer superPrestige"
            :style="UIPositions.prestigeRealm.superPrestige"
        />
    </div>
</template>
<script setup>
import { usePlayerStore } from '@/stores/player'
import Points from './PointComponents/PointsMain.vue'
import Prestige from './PrestigeComponents/PrestigeMain.vue'
import SuperPrestige from './SuperPrestigeComponents/SuperPrestigeMain.vue'
import { ref, reactive } from 'vue'

const playerStore=usePlayerStore()


const UIShown = ref({
    prestigeRealm: {
        points: true,
        prestige: false,
        superPrestige: false,
    },
})

const UIPositions = ref({
    prestigeRealm: {
        points: reactive({
            left: 0,
            top: 0,
        }),
        pointsPrestigeConnector: reactive({
            left: 0,
            top: 0,
        }),
        prestige: reactive({
            left: 0,
            top: 0,
        }),
        prestigeSuperPrestigeConnector: reactive({
            left: 0,
            top: 0,
        }),
        superPrestige: reactive({
            left: 0,
            top: 0,
        }),
    },
})

const UpdateUIPositions = () => {
    let loadedUIBorders = {
        x: playerStore.UISettings.screenSizeX / 2,
        y: playerStore.UISettings.screenSizeY / 2,
    }
    if (playerStore.navigation.realm == 'prestige') {
        let pointsPosition = {
            x: -25 - playerStore.navigation.positionX,
            y: -150 - playerStore.navigation.positionY,
        }

        if (
            Math.abs(pointsPosition.x) - 200 > loadedUIBorders.x ||
            Math.abs(pointsPosition.y) - 200 > loadedUIBorders.y
        ) {
            UIShown.value.prestigeRealm.points = false
        } else {
            UIShown.value.prestigeRealm.points = true
            UIPositions.value.prestigeRealm.points.left = screen.width / 2 + pointsPosition.x + 'px'
            UIPositions.value.prestigeRealm.points.top = screen.height / 2 + pointsPosition.y + 'px'
        }

        let pointsPrestigeConnectorPosition = {
            x: -25 - playerStore.navigation.positionX,
            y: 350 - playerStore.navigation.positionY,
        }
        UIPositions.value.prestigeRealm.pointsPrestigeConnector.left =
            screen.width / 2 + pointsPrestigeConnectorPosition.x + 'px'
        UIPositions.value.prestigeRealm.pointsPrestigeConnector.top =
            screen.height / 2 + pointsPrestigeConnectorPosition.y + 'px'

        let prestigePosition = {
            x: -25 - playerStore.navigation.positionX,
            y: 850 - playerStore.navigation.positionY,
        }

        if (
            Math.abs(prestigePosition.x) - 200 > loadedUIBorders.x ||
            Math.abs(prestigePosition.y) - 200 > loadedUIBorders.y
        ) {
            UIShown.value.prestigeRealm.prestige = false
        } else {
            UIShown.value.prestigeRealm.prestige = true
            UIPositions.value.prestigeRealm.prestige.left =
                screen.width / 2 + prestigePosition.x + 'px'
            UIPositions.value.prestigeRealm.prestige.top =
                screen.height / 2 + prestigePosition.y + 'px'
        }

        let prestigeSuperPrestigeConnectorPosition = {
            x: -25 - playerStore.navigation.positionX,
            y: 1350 - playerStore.navigation.positionY,
        }
        UIPositions.value.prestigeRealm.prestigeSuperPrestigeConnector.left =
            screen.width / 2 + prestigeSuperPrestigeConnectorPosition.x + 'px'
        UIPositions.value.prestigeRealm.prestigeSuperPrestigeConnector.top =
            screen.height / 2 + prestigeSuperPrestigeConnectorPosition.y + 'px'

        let superPrestigePosition = {
            x: -25 - playerStore.navigation.positionX,
            y: 1850 - playerStore.navigation.positionY,
        }

        if (
            playerStore.prestigeRealm.superPrestige.unlocked == false ||
            Math.abs(superPrestigePosition.x) - 200 > loadedUIBorders.x ||
            Math.abs(superPrestigePosition.y) - 200 > loadedUIBorders.y
        ) {
            UIShown.value.prestigeRealm.superPrestige = false
        } else {
            UIShown.value.prestigeRealm.superPrestige = true
            UIPositions.value.prestigeRealm.superPrestige.left =
                screen.width / 2 + superPrestigePosition.x + 'px'
            UIPositions.value.prestigeRealm.superPrestige.top =
                screen.height / 2 + superPrestigePosition.y + 'px'
        }
    } else {
        UIShown.value.prestigeRealm.points = false
        UIShown.value.prestigeRealm.prestige = false
        UIShown.value.prestigeRealm.superPrestige = false
    }
}
setInterval(UpdateUIPositions, 15)
</script>