<template>
    <div class="settings">
        <div class="setting">
            <div class="settingName">
                Auto save interval
            </div>
            <div class="settingOptions">
                <div class="option" :class="{'selectedOption' : playerStore.saveSettings.autoSaveInterval==0}" @click="SetAutoSaveInterval(0)">
                    Disabled
                </div>
                <div class="option" :class="{'selectedOption' : playerStore.saveSettings.autoSaveInterval==1000}" @click="SetAutoSaveInterval(1000)">
                    1 second
                </div>
                <div class="option" :class="{'selectedOption' : playerStore.saveSettings.autoSaveInterval==2000}" @click="SetAutoSaveInterval(2000)">
                    2 seconds
                </div>
                <div class="option" :class="{'selectedOption' : playerStore.saveSettings.autoSaveInterval==5000}" @click="SetAutoSaveInterval(5000)">
                    5 seconds
                </div>
                <div class="option" :class="{'selectedOption' : playerStore.saveSettings.autoSaveInterval==15000}" @click="SetAutoSaveInterval(15000)">
                    15 seconds
                </div>
            </div>
        </div>
        <div class="setting">
            <div class="settingName">
                Save and export
            </div>
            <div class="settingOptions">
                <div class="option">
                    Save
                </div>
                <div class="option">
                    Export save to clipboard
                </div>
                <div class="option">
                    Export save to file
                </div>
            </div>
        </div>
        <div class="setting">
            <div class="settingName">
                Save importing
            </div>
            <div class="settingOptions">
                <div class="option">
                    Import via text
                </div>
                <div class="option">
                    Import via file
                </div>
            </div>
        </div>
        <div class="hardReset" @click="ShowHardResetDialogBox">
            Hard Reset
        </div>
    </div>
    <div class="dialogBoxContainer" v-show="isDialogBoxShown">
        <div class="dialogBoxHeader">
            <h3 class="dialogBoxTitle"> {{ dialogBoxTitle }} </h3>
            <img src="../../components/icons/menuClose.png" alt="close" class="dialogBoxClose">
        </div>
        <div class="dialogBoxContent">    
            {{ dialogBoxContent }}
        </div>
        <div class="dialogBoxActions">
            {{ dialogBoxActions }}
        </div>
    </div>
</template>
<script setup>
import { usePlayerStore } from '@/stores/player';
import { ref } from 'vue';

const playerStore=usePlayerStore()
const isDialogBoxShown=ref(false)
const dialogBoxTitle=ref("")
const dialogBoxContent=ref(``)
const dialogBoxActions=ref(``)

const SetAutoSaveInterval=(newms)=>{
    playerStore.saveSettings.autoSaveInterval=newms
}

const ShowHardResetDialogBox =()=>{
    isDialogBoxShown.value=true
}

</script>