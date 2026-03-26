import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePrestigeRealmMapPinsStore = defineStore('PrestigeRealmMapPins', () => {
    const pointsMapPin=ref(false)
    const prestigeMapPin=ref(false)
    const superPrestigeMapPin=ref(false)


    return {
        pointsMapPin,
        prestigeMapPin,
        superPrestigeMapPin
    }
})
