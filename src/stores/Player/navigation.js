import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', () => {

    const currentRealm=ref("prestige")
    const position=ref({
        x: 0,
        y: 0
    })

    return {
        currentRealm,
        position
    }
})
