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
    
    return {
        UISettings,
        saveSettings,
        hardResetActivate
    }
})
