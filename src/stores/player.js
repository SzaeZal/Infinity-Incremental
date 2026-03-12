import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import LoadBuyables from '@/components/Scripts/LoadBuyableStuff'
import LoadUpgrades from '@/components/Scripts/LoadUpgradeStuff'
import LoadChallenges from '@/components/Scripts/LoadChallengeStuff'

export const usePlayerStore = defineStore('player', () => {
    const prestigeRealm = ref({
        enteredChallenge: '',
        points: {
            amount: 0,
            buyables: {
                buyable1Amount: 0,
                buyable2Amount: 0,
                buyable3Amount: 0,
            },
        },
        prestige: {
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
        },
        superPrestige: {
            unlocked: false,
            amount: 0,
            challenges: {
                challenge1Completed: false,
            },
            milestones: {
                milestone1Unlocked: false,
            },
        },
    })
    const prestigeRealmStatsCalculated = ref({
        points: {
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
        },
        prestige: {
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
            },
        },
        superPrestige: {
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
        },
    })
    const prestigeRealmMapPins = ref({
        points: false,
        prestige: false,
    })
    const UISettings = ref({
        screenSizeX: 2000,
        screenSizeY: 2000,
        controllerEnabled: false,
    })
    const saveSettings = ref({
        autoSaveInterval: 5000,
    })
    const navigation = ref({
        realm: 'prestige',
        positionX: 0,
        positionY: 0,
    })

    const CreateJson = () => {
        let mergedObject = {
            stats: {
                prestigeRealm: prestigeRealm.value,
            },
            settings: {
                UISettings: UISettings.value,
                saveSettings: saveSettings.value,
            },
            navigation: navigation.value,
        }
        return JSON.stringify(mergedObject)
    }

    const Load = (json) => {
        if (json != '') {
            let playerSaveParsed = JSON.parse(json)
            prestigeRealm.value = {
                ...prestigeRealm.value,
                ...playerSaveParsed.stats.prestigeRealm,
            }
            UISettings.value = { ...UISettings.value, ...playerSaveParsed.settings.UISettings }
            saveSettings.value = {
                ...saveSettings.value,
                ...playerSaveParsed.settings.saveSettings,
            }
            navigation.value = { ...navigation.value, ...playerSaveParsed.navigation }
            LoadBuyables(prestigeRealm.value, prestigeRealmStatsCalculated.value)
            LoadUpgrades(prestigeRealm.value, prestigeRealmStatsCalculated.value)
            LoadChallenges(prestigeRealm.value, prestigeRealmStatsCalculated.value)
        }
    }

    const hardResetActivate = ref(false)

    return {
        prestigeRealm,
        prestigeRealmStatsCalculated,
        prestigeRealmMapPins,
        navigation,
        UISettings,
        saveSettings,
        CreateJson,
        Load,
        hardResetActivate,
    }
})
