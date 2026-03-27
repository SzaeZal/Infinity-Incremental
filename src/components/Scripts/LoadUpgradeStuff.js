import LoadPrestigeLayerUpgrades from "./PrestigeRealm/Prestige/LoadPrestigeLayerUpgrades"

const LoadUpgrades = (prestigeRealm, prestigeRealmStatsCalculated) => {
    LoadPrestigeRealmUpgrades(prestigeRealm, prestigeRealmStatsCalculated)
}

const LoadPrestigeRealmUpgrades = (prestigeRealm, prestigeRealmStatsCalculated) => {
    LoadPrestigeLayerUpgrades(prestigeRealm.prestige, prestigeRealmStatsCalculated.prestige)
}

export default LoadUpgrades
