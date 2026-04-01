<template>
    <div>
        <Points
            v-show="UIShown.points"
            class="element prestigeRealmLayer points"
            :style="UIPositions.points"
        />
        <svg
            width="10px"
            height="250px"
            class="element prestigeLayerConnector"
            :style="UIPositions.pointsPrestigeConnector"
            v-show="UIShown.points || UIShown.prestige"
        >
            <line x1="5" y1="0" x2="5" y2="250" />
        </svg>
        <Prestige
            v-show="UIShown.prestige"
            class="element prestigeRealmLayer prestige"
            :style="UIPositions.prestige"
        />
        <svg
            width="10px"
            height="250px"
            class="element prestigeLayerConnector"
            :style="UIPositions.prestigeSuperPrestigeConnector"
            v-show="prestigeRealmStatsStore.superPrestige.unlocked && (UIShown.prestige || UIShown.superPrestige)"
        >
            <line x1="5" y1="0" x2="5" y2="250" />
        </svg>
        <SuperPrestige
            v-show="UIShown.superPrestige"
            class="element prestigeRealmLayer superPrestige"
            :style="UIPositions.superPrestige"
        />
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'

import Points from './PointComponents/PointsMain.vue'
import Prestige from './PrestigeComponents/PrestigeMain.vue'
import SuperPrestige from './SuperPrestigeComponents/SuperPrestigeMain.vue'

import * as completeSPChallenge from '@/Scripts/PrestigeRealm/SuperPrestige/completeSPChallenge'

import { useNavigationStore } from '@/stores/Player/navigation'
import { useSettingsStore } from '@/stores/Player/settings'
import { usePrestigeRealmStatsStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStats'
import { usePrestigeRealmStatsCalculatedStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStatsCalculated'
import { useNotificationStore } from '@/stores/notification'


const navigationStore=useNavigationStore()
const notificationStore=useNotificationStore()
const settingsStore=useSettingsStore()
const prestigeRealmStatsStore=usePrestigeRealmStatsStore()
const prestigeRealmStatsCalculatedStore=usePrestigeRealmStatsCalculatedStore()

const ChallengeChecker=()=>{
    if(prestigeRealmStatsStore.enteredChallenge=="SPC1" && prestigeRealmStatsStore.points.amount>=1e4){
        completeSPChallenge.CompleteSPC1(prestigeRealmStatsStore, prestigeRealmStatsCalculatedStore)
        notificationStore.NewNotification("Challenge complete", "SPC 1", "superPrestigeMilestone")
    }
    else if(prestigeRealmStatsStore.enteredChallenge=="SPC2" && prestigeRealmStatsStore.prestige.amount>=1e5){
        completeSPChallenge.CompleteSPC2(prestigeRealmStatsStore, prestigeRealmStatsCalculatedStore)
        notificationStore.NewNotification("Challenge complete", "SPC 2", "superPrestigeMilestone")
    }
    else if(prestigeRealmStatsStore.enteredChallenge=="SPC3" && prestigeRealmStatsStore.prestige.amount>=1e4){
        completeSPChallenge.CompleteSPC3(prestigeRealmStatsStore, prestigeRealmStatsCalculatedStore)
        notificationStore.NewNotification("Challenge complete", "SPC 3", "superPrestigeMilestone")
    }
}

setInterval(ChallengeChecker, 25)

const UIShown = ref({
    points: true,
    prestige: false,
    superPrestige: false,
})

const UIPositions = ref({
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
})

const UpdateUIPositions = () => {
    let loadedUIBorders = {
        x: settingsStore.UISettings.screenSizeX / 2,
        y: settingsStore.UISettings.screenSizeY / 2,
    }
    if (navigationStore.currentRealm == 'prestige') {        
        let pointsPosition = {
            x:  - navigationStore.position.x,
            y:  - navigationStore.position.y,
        }

        if (
            Math.abs(pointsPosition.x) - 200 > loadedUIBorders.x ||
            Math.abs(pointsPosition.y) - 200 > loadedUIBorders.y
        ) {
            UIShown.value.points = false
        } else {
            UIShown.value.points = true
            UIPositions.value.points.left = screen.width / 2 + pointsPosition.x + 'px'
            UIPositions.value.points.top = screen.height / 2 + pointsPosition.y + 'px'
        }

        let pointsPrestigeConnectorPosition = {
            x: - navigationStore.position.x,
            y: 500 - navigationStore.position.y,
        }
        UIPositions.value.pointsPrestigeConnector.left =
            screen.width / 2 + pointsPrestigeConnectorPosition.x + 'px'
        UIPositions.value.pointsPrestigeConnector.top =
            screen.height / 2 + pointsPrestigeConnectorPosition.y + 'px'

        let prestigePosition = {
            x:  - navigationStore.position.x,
            y: 1000 - navigationStore.position.y,
        }

        if (
            Math.abs(prestigePosition.x) - 200 > loadedUIBorders.x ||
            Math.abs(prestigePosition.y) - 200 > loadedUIBorders.y
        ) {
            UIShown.value.prestige = false
        } else {
            UIShown.value.prestige = true
            UIPositions.value.prestige.left =
                screen.width / 2 + prestigePosition.x + 'px'
            UIPositions.value.prestige.top =
                screen.height / 2 + prestigePosition.y + 'px'
        }

        let prestigeSuperPrestigeConnectorPosition = {
            x:  - navigationStore.position.x,
            y: 1500 - navigationStore.position.y,
        }
        UIPositions.value.prestigeSuperPrestigeConnector.left =
            screen.width / 2 + prestigeSuperPrestigeConnectorPosition.x + 'px'
        UIPositions.value.prestigeSuperPrestigeConnector.top =
            screen.height / 2 + prestigeSuperPrestigeConnectorPosition.y + 'px'

        let superPrestigePosition = {
            x:  - navigationStore.position.x,
            y: 2000 - navigationStore.position.y,
        }

        if (
            prestigeRealmStatsStore.superPrestige.unlocked == false ||
            Math.abs(superPrestigePosition.x) - 200 > loadedUIBorders.x ||
            Math.abs(superPrestigePosition.y) - 200 > loadedUIBorders.y
        ) {
            UIShown.value.superPrestige = false
        } else {
            UIShown.value.superPrestige = true
            UIPositions.value.superPrestige.left =
                screen.width / 2 + superPrestigePosition.x + 'px'
            UIPositions.value.superPrestige.top =
                screen.height / 2 + superPrestigePosition.y + 'px'
        }
    } else {
        UIShown.value.points = false
        UIShown.value.prestige = false
        UIShown.value.superPrestige = false
    }
}
setInterval(UpdateUIPositions, 15)
</script>