<template>
    <div class="settings">
        <div class="setting">
            <div class="settingName">Auto save interval</div>
            <div class="settingOptions">
                <div
                    class="option"
                    :class="{ selectedOption: settingsStore.saveSettings.autoSaveInterval == 0 }"
                    @click="SetAutoSaveInterval(0)"
                >
                    Disabled
                </div>
                <div
                    class="option"
                    :class="{ selectedOption: settingsStore.saveSettings.autoSaveInterval == 1000 }"
                    @click="SetAutoSaveInterval(1000)"
                >
                    1 second
                </div>
                <div
                    class="option"
                    :class="{ selectedOption: settingsStore.saveSettings.autoSaveInterval == 2000 }"
                    @click="SetAutoSaveInterval(2000)"
                >
                    2 seconds
                </div>
                <div
                    class="option"
                    :class="{ selectedOption: settingsStore.saveSettings.autoSaveInterval == 5000 }"
                    @click="SetAutoSaveInterval(5000)"
                >
                    5 seconds
                </div>
                <div
                    class="option"
                    :class="{ selectedOption: settingsStore.saveSettings.autoSaveInterval == 15000 }"
                    @click="SetAutoSaveInterval(15000)"
                >
                    15 seconds
                </div>
            </div>
        </div>
        <div class="setting">
            <div class="settingName">Save and export</div>
            <div class="settingOptions">
                <div class="option">Save</div>
                <div class="option" @click="ExportSaveToClipboard">Export save to clipboard</div>
                <div class="option" @click="ExportSaveToFile">Export save to file</div>
            </div>
        </div>
        <div class="setting">
            <div class="settingName">Save importing</div>
            <div class="settingOptions">
                <div class="option" @click="ShowImportViaTextDialogBox">Import via text</div>
                <input type="file" accept="text/txt" class="option" @change="ImportSaveViaFile">
            </div>
        </div>
        <div class="hardReset" @click="ShowHardResetDialogBox">Hard Reset</div>
    </div>
</template>
<script setup>
import { useDialogBoxStore } from '@/stores/dialogBox'
import { useNotificationStore } from '@/stores/notification'
import { useSettingsStore } from '@/stores/Player/settings'
import { ref } from 'vue'

const settingsStore=useSettingsStore()
const dialogBoxStore = useDialogBoxStore()
const notificationStore=useNotificationStore()

const SetAutoSaveInterval = (newms) => {
    settingsStore.saveSettings.autoSaveInterval = newms
}

const ExportSaveToClipboard=()=>{
    let save=localStorage.getItem("InfinityIncSave") 
    navigator.clipboard.writeText(save)
    notificationStore.NewNotification("Info","Save copied to clipboard", "Info")
}

const ExportSaveToFile=()=>{
    let save=localStorage.getItem("InfinityIncSave") 
    let blob=new Blob([save], {type: "text/plain"})
    let fileUrl=URL.createObjectURL(blob)
    const link=document.createElement('a')
    link.download="InfinityIncrementalSave.txt"
    link.href=fileUrl
    link.click()
}

const ShowImportViaTextDialogBox=()=>{
    dialogBoxStore.isDialogBoxShown = true
    dialogBoxStore.dialogBoxType = 'primary'
    dialogBoxStore.dialogBoxTitle = 'Import save via text'
    dialogBoxStore.dialogBoxContent = `<input type="text" placeholder="input your save file here" id="saveText"></input>
                                    `
    dialogBoxStore.dialogBoxActions = 'Import'
}

const ImportSaveViaFile=(e)=>{
    let file=e.target.files[0]
    let reader=new FileReader()
    reader.onload=()=>{
        SetAutoSaveInterval(0)
        localStorage.setItem("InfinityIncSave", reader.result)
        location.reload()
    }
    reader.readAsText(file)
    
    
}

const ShowHardResetDialogBox = () => {
    dialogBoxStore.isDialogBoxShown = true
    dialogBoxStore.dialogBoxType = 'Danger'
    dialogBoxStore.dialogBoxTitle = 'Hard Reset'
    dialogBoxStore.dialogBoxContent = `<p>Are you sure you want to reset your save</p>
                                    <p>This action is irreversible</p>
                                    `
    dialogBoxStore.dialogBoxActions = 'hardReset'
}
</script>
