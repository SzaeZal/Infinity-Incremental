<template>
    <div class="dialogBoxContainer" v-show="dialogBoxStore.isDialogBoxShown">
        <div
            class="dialogBoxMain"
            :class="{
                dialogBoxDanger: isDialogBoxTypeDanger,
            }"
        >
            <div class="dialogBoxHeader" @click="CloseDialogBox">
                <h3 class="dialogBoxTitle">{{ dialogBoxStore.dialogBoxTitle }}</h3>
                <img src="./icons/menuClose.png" alt="close dialog box" />
            </div>
            <div class="dialogBoxContent" v-html="dialogBoxStore.dialogBoxContent"></div>
            <div class="dialogBoxActions" v-if="dialogBoxStore.dialogBoxActions == 'hardReset'">
                <button @click="HardReset">Confirm</button>
                <button @click="CloseDialogBox">Cancel</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'

import { useDialogBoxStore } from '@/stores/dialogBox'
import { useSettingsStore } from '@/stores/Player/settings'

const dialogBoxStore = useDialogBoxStore()
const settingsStore=useSettingsStore()
const isDialogBoxTypeDanger=ref()

const CloseDialogBox = () => {
    dialogBoxStore.isDialogBoxShown = false
}

const HardReset = () => {
    settingsStore.hardResetActivate = true
}

setInterval(() => {
    isDialogBoxTypeDanger.value = dialogBoxStore.dialogBoxType == 'Danger'
}, 25)
</script>
