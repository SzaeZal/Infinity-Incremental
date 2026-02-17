<template>
    <div class="hasSubMenu">
        <div class="subMenu">
            <div class="subMenuButton" @click="ToggleUISettings">
                <svg
                    width="150px"
                    height="35px"
                    class="element subMenuSvg"
                >
                    <path d="M20 2 L140 2 L130 33  L10 33 Z"  />
                    <text x="30" y="23">UI Settings</text>
                </svg>
            </div>
            <div class="subMenuButton" @click="ToggleSaveSettings">
                <svg
                    width="150px"
                    height="35px"
                    class="element subMenuSvg"
                >
                    <path d="M20 2 L140 2 L130 33  L10 33 Z"  />
                    <text x="20" y="23">Save Settings</text>
                </svg>
            </div>
        </div>
        <div class="subContent">
            <UISettings v-show="isUISettingsToggled"/>
            <SaveSettings v-show="isSaveSettingsToggled"/>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SaveSettings from './SettingsMenuComponents/SaveSettings.vue';
import UISettings from './SettingsMenuComponents/UISettings.vue';

const isSaveSettingsToggled=ref(true)
const isUISettingsToggled=ref(false)

const ToggleSaveSettings=()=>{
    if(isSaveSettingsToggled.value==false){
        isUISettingsToggled.value=false
    }
    isSaveSettingsToggled.value=!isSaveSettingsToggled.value
}

const ToggleUISettings=()=>{
    if(isUISettingsToggled.value==false){
        isSaveSettingsToggled.value=false
    }
    isUISettingsToggled.value=!isUISettingsToggled.value
}
</script>