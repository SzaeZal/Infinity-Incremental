import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePrestigeRealmStatsCalculatedStore = defineStore('PrestigeRealmStatsCalculated', () => {
    const points=ref({
        gain: {
            challengeNerfs: {
                divider: 1,
                root: 1,
            },
            multiplier: 1,
            exponent: 1,
        },
        buyables: {
            buyable1: {
                cost: 10,
                maxAmount: 50,
                effects: {
                    effectOnPoints: {
                        multiplier: 1,
                    },
                },
            },
            buyable2: {
                cost: 25,
                maxAmount: 250,
                effects: {
                    effectOnPoints: {
                        multiplier: 1,
                    },
                },
            },
            buyable3: {
                cost: 1000,
                maxAmount: 50,
                effects: {
                    effectOnPrestigePoints: {
                        multiplier: 1,
                    },
                },
            },
        },
    })

    const prestige=ref({
        gain: {
            challengeNerfs: {
                divider: 1,
                root: 1,
            },
            multiplier: 1,
            exponent: 1,
            passive: 0,
        },
        upgrades: {
            row1: {
                upgrade1Effects: {
                    effectOnPoints: 1,
                },
                upgrade2Effects: {
                    effectOnPoints: 1,
                },
                upgrade3Effects: {
                    effectOnPrestigePoints: 1,
                },
                upgrade4Effects: {
                    effectOnPoints: 1,
                },
                upgrade5Effects: {
                    effectOnPoints: 1,
                },
            },
            row2: {
                upgrade1Effects: {
                    effectOnPoints: 1,
                },
                upgrade2Effects: {
                    effectOnPrestigePoints: 1,
                },
                upgrade3Effects: {
                    effectOnPoints: 1,
                    effectOnPrestigePoints: 1,
                },
                upgrade4Effects: {
                    effectOnPoints: 1,
                },
                upgrade5Effects: {
                    effectOnPoints: 1,
                },
            },
            row3: {
                upgrade1Effects: {
                    effectOnPoints: 1,
                },
                upgrade2Effects: {
                    effectOnPoints: 1,
                },
                upgrade3Effects: {
                    effectOnPrestigePoints: 1,
                },
                upgrade4Effects: {
                    effectOnSuperPrestigePoints: 1,
                },
                upgrade5Effects: {
                    effectOnPrestigePoints: 1,
                },
            },
        },
    })

    const superPrestige=ref({
        gain: {
            challengeNerfs: {
                divider: 1,
                root: 1,
            },
            multiplier: 1,
            exponent: 1,
            passive: 0,
        },
        effects: {
            effectOnPoints: 1,
            effectOnPrestigePoints: 1,
        },
    })

    return {
        points,
        prestige,
        superPrestige,
    }
})
