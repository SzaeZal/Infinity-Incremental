import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const realm1=ref({
    points:{
      amount: 0
    }
  })

  return {realm1}
})
