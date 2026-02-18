<template>
    <div class="hasSubMenu">
        <div class="subMenu">
            <div class="subMenuButton" @click="ToggleInformation">
                <svg
                    width="150px"
                    height="35px"
                    class="element subMenuSvg"
                >
                    <path d="M20 2 L140 2 L130 33  L10 33 Z"  />
                    <text x="27" y="24">Information</text>
                </svg>
            </div>
            <div class="subMenuButton" @click="ToggleChangelog">
                <svg
                    width="150px"
                    height="35px"
                    class="element subMenuSvg"
                >
                    <path d="M20 2 L140 2 L130 33  L10 33 Z"  />
                    <text x="30" y="24">Changelog</text>
                </svg>
            </div>
        </div>
        <div class="subContent">
            <Information v-show="isInformationToggled"/>
            <Changelog v-show="isChangelogToggled"/>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Changelog from './InformationMenuComponents/Changelog.vue';
import Information from './InformationMenuComponents/Information.vue';

const isInformationToggled=ref(true)
const isChangelogToggled=ref(false)

const ToggleInformation=()=>{
    if(isInformationToggled.value==false){
        isChangelogToggled.value=false
    }
    isInformationToggled.value=!isInformationToggled.value
}

const ToggleChangelog=()=>{
    if(isChangelogToggled.value==false){
        isInformationToggled.value=false
    }
    isChangelogToggled.value=!isChangelogToggled.value
}
</script>

<style scoped>
.subMenuSvg{
    path{
        stroke-width: 2px;
        fill: none;
        stroke: rgb(32,32, 64);
    }
    text{
        font-size: 20px;
        fill: black;
    }
}
.subMenuButton:hover{
    .subMenuSvg{
        scale: 1.05;
        path{
            fill: rgba(32,32,64,0.05);
        }
    }
}
</style>