import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const prestigeRealm=ref({
    points:{
      amount: 0
    }
  })
  const UISettings=ref({
    screenSizeX: screen.width,
    screenSizeY: screen.height,
    UIUpdateRateInMs:25,
  })
  const saveSettings=ref({
    autoSaveInterval: 5000
  })
  const navigation=ref({
    realm:"prestige",
    positionX: 0,
    positionY: 0
  })

  const CreateJson=()=>{
    let mergedObject={
      stats:{
        prestigeRealm: prestigeRealm.value,

      },
      settings:{
        UISettings: UISettings.value,
        saveSettings: saveSettings.value
      },
      navigation: navigation.value
    }
    return JSON.stringify(mergedObject)
  }

  const Load = (json)=>{
    let playerSaveParsed = JSON.parse(json);
    prestigeRealm.value=playerSaveParsed.stats.prestigeRealm
    UISettings.value=playerSaveParsed.settings.UISettings
    saveSettings.value=playerSaveParsed.settings.saveSettings
    navigation.value=playerSaveParsed.navigation
  }

  return {prestigeRealm, navigation, UISettings, saveSettings, CreateJson, Load}
})
