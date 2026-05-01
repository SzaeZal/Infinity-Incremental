import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
    const UISettings = ref({
        screenSizeX: 2000,
        screenSizeY: 2000,
        controllerEnabled: false,
    })

    const saveSettings = ref({
        autoSaveInterval: 5000,
    })

    const hardResetActivate = ref(false)
    const forceSave=ref(false)

    const zip = () => {
        let settings = {
            UISettings: UISettings.value,
            saveSettings: saveSettings.value,
        }
        return settings
    }

    const unzip=(settings)=>{
        UISettings.value=settings.UISettings
        saveSettings.value=settings.saveSettings
    }

    return {
        UISettings,
        saveSettings,
        hardResetActivate,
        forceSave,
        zip,
        unzip
    }
})
