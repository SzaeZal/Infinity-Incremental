import LoadPointsLayerBuyables from './PrestigeRealm/Points/LoadPointsLayerBuyables'

const LoadBuyables = (prestigeRealm, prestigeRealmStatsCalculated) => {
    LoadPrestigeRealmBuyables(prestigeRealm, prestigeRealmStatsCalculated)
}

const LoadPrestigeRealmBuyables = (prestigeRealm, prestigeRealmStatsCalculated) => {
    LoadPointsLayerBuyables(prestigeRealm.points, prestigeRealmStatsCalculated.points)
}

export default LoadBuyables
