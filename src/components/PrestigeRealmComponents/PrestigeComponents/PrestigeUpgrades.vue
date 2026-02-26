<template>
    <div class="layerResetButton" :class="{'prestigeResetButton' : (prestigePointsOnReset>0)}" @click="PrestigeReset">
        <span v-if="prestigePointsOnReset<1e3">
            <h3 class="currencyOnReset">
                + {{ FormatNumber(prestigePointsOnReset) }} PP
            </h3>
            <h5 class="plusOneAt">
                +1 at {{ FormatNumber(pointsToPlusOnePrestigePointOnReset) }} points
            </h5>
        </span>
        <span v-else>
            <h3 class="currencyOnReset">
                + {{ FormatNumber(prestigePointsOnReset) }} PP
            </h3>
        </span>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/components/Scripts/formatters'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
const prestigePointsOnReset=ref(
    Math.floor(
        Math.pow(
            Math.pow(
                playerStore.prestigeRealm.points.amount / 500,
                0.5
            ) * playerStore.prestigeRealmStatsCalculated.prestige.gain.multiplier
            / playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider,
            playerStore.prestigeRealmStatsCalculated.prestige.gain.exponent
            / playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.root
        )
    )
)
const pointsToPlusOnePrestigePointOnReset=ref(
    Math.pow(
        Math.pow(
            prestigePointsOnReset.value + 1,
            playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.root
            / playerStore.prestigeRealmStatsCalculated.prestige.gain.exponent 
        ) * playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider
        / playerStore.prestigeRealmStatsCalculated.prestige.gain.multiplier,
        2
    ) * 500
)

const PrestigeReset=()=>{
    if(prestigePointsOnReset.value>0){
        
    }
}

setInterval(() => {
    prestigePointsOnReset.value=
        Math.floor(
            Math.pow(
                Math.pow(
                    playerStore.prestigeRealm.points.amount / 500,
                    0.5
                ) * playerStore.prestigeRealmStatsCalculated.prestige.gain.multiplier
                / playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider,
                playerStore.prestigeRealmStatsCalculated.prestige.gain.exponent
                / playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.root
            )
        )
    
   pointsToPlusOnePrestigePointOnReset.value=
        Math.pow(
            Math.pow(
                prestigePointsOnReset.value + 1,
                playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.root
                / playerStore.prestigeRealmStatsCalculated.prestige.gain.exponent 
            ) * playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider
            / playerStore.prestigeRealmStatsCalculated.prestige.gain.multiplier,
            2
        ) * 500    
}, 25);

</script>
