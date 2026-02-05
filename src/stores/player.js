import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const prestigeRealm=ref({
    points:{
      amount: 0,
      buyables:{
        buyable1Amount: 0,
        buyable2Amount: 0
      }
    }
  })
  const prestigeRealmStatsCalculated=ref({
    points:{
      gain:{
        challengeNerfs: {
          divider: 1,
          root: 1
        },
        multiplier: 1,
        exponent: 1
      },
      buyables:{
        buyable1:{
          cost: 10,
          maxAmount: 50,
          effects:{
            effectOnPoints:{
              multiplier: 1
            }
          }
        },
        buyable2:{
          cost: 25,
          maxAmount: 250,
          effects:{
            effectOnPoints:{
              multiplier: 1
            }
          }
        },
      }
    }
  })
  const UISettings=ref({
    screenSizeX: 2000,
    screenSizeY: 2000,
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

  return {prestigeRealm, prestigeRealmStatsCalculated, navigation, UISettings, saveSettings, CreateJson, Load}
})
