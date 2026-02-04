import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const prestigeRealm=ref({
    points:{
      amount: 0
    }
  })
  const navigation=ref({
    realm:"prestige",
    positionX: 0,
    positionY: 0
  })

  return {prestigeRealm, navigation}
})
