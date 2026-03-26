import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePrestigeRealmStatsStore = defineStore('PrestigeRealmStats', () => {
    const enteredChallenge=ref('')
    
    const points=ref({
        amount: 0,
        buyables: {
            buyable1Amount: 0,
            buyable2Amount: 0,
            buyable3Amount: 0,
        },
    })

    const prestige=ref({
        amount: 0,
        upgrades: {
            row1: {
                upgrade1Bought: false,
                upgrade2Bought: false,
                upgrade3Bought: false,
                upgrade4Bought: false,
                upgrade5Bought: false,
            },
            row2: {
                upgrade1Bought: false,
                upgrade2Bought: false,
                upgrade3Bought: false,
                upgrade4Bought: false,
                upgrade5Bought: false,
            },
        },
        milestones: {
            milestone1Unlocked: false,
        },
    })

    const superPrestige=ref({
        unlocked: false,
        amount: 0,
        challenges: {
            challenge1Completed: false,
        },
        milestones: {
            milestone1Unlocked: false,
        },
    })

    return {
        enteredChallenge,
        points,
        prestige,
        superPrestige
    }
})
