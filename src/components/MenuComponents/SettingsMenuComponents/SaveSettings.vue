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
</template>
<script setup>
import { useDialogBoxStore } from '@/stores/dialogBox';
import { usePlayerStore } from '@/stores/player';
import { ref } from 'vue';

const playerStore=usePlayerStore()
const dialogBoxStore=useDialogBoxStore()

const SetAutoSaveInterval=(newms)=>{
    playerStore.saveSettings.autoSaveInterval=newms
}

const ShowHardResetDialogBox=()=>{
    dialogBoxStore.isDialogBoxShown=true
    dialogBoxStore.dialogBoxType="Danger"
    dialogBoxStore.dialogBoxTitle="Hard Reset"
    dialogBoxStore.dialogBoxContent=`Are you sure`
}
</script>