import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePrestigeRealmMapPinsStore = defineStore('PrestigeRealmMapPins', () => {
    const pointsMapPin=ref(false)
    const prestigeMapPin=ref(false)
    const superPrestigeMapPin=ref(false)

    const zip=()=>{
        let PrestigeRealmMapPins={
            pointsMapPin: pointsMapPin.value,
            prestigeMapPin: prestigeMapPin.value,
            superPrestigeMapPin: superPrestigeMapPin.value
        }
        return  PrestigeRealmMapPins
    }


    return {
        pointsMapPin,
        prestigeMapPin,
        superPrestigeMapPin,
        zip
    }
})
