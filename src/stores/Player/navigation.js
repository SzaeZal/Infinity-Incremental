import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', () => {
    const currentRealm=ref("prestige")
    const position=ref({
        x: 0,
        y: 0
    })

    const zip=()=>{
        let navigation={
            currentRealm: currentRealm.value,
            position:position.value
        }
        return navigation
    }

    const unzip=(navigation)=>{
        currentRealm.value=navigation.currentRealm
        position.value=navigation.position
    }

    return {
        currentRealm,
        position,
        zip,
        unzip
    }
})
