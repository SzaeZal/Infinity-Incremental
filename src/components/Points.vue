<template>
    <div>
        <h2 class="mainCurrencyDisplay ">
            You have {{ points.amount }} Points
        </h2>
        <div class="buyables">
            <div class="buyable">
                <h4 class="buyableAmount" >{{ points.buyables.buyable1Amount }} / {{ pointsStatsCalculated.buyables.buyable1.maxAmount }}</h4>
                <h3 class="buyableTitle">Point doubler</h3>
                <p class="buyableDescription">
                    Each level doubles point gain
                </p>
                <p class="buyableEffect">
                    Currently: x{{ pointsStatsCalculated.buyables.buyable1.effects.effectOnPoints.multiplier }}
                </p>
                <p class="buyableCost" v-if="points.buyables.buyable1Amount < pointsStatsCalculated.buyables.buyable1.maxAmount">
                    Cost: {{ pointsStatsCalculated.buyables.buyable1.cost }} Points
                </p>
                <p v-else>Maxed</p>
                <div class="buyableBuyers">
                    <div class="buyableBuyOne">Buy 1</div>
                    <div class="buyableBuyMax">Buy Max</div>
                </div>
            </div>

            <div class="buyable">
                <h4 class="buyableAmount">{{ points.buyables.buyable2Amount }} / {{ pointsStatsCalculated.buyables.buyable2.maxAmount }}</h4>
                <h3 class="buyableTitle">Point multiplier</h3>
                <p class="buyableDescription">
                    Each level multiplies point gain by +x1 <br>
                    doubles every 25 levels
                </p>
                <p class="buyableEffect">
                    Currently: x{{ pointsStatsCalculated.buyables.buyable2.effects.effectOnPoints.multiplier }}
                </p>
                <p class="buyableCost" v-if="points.buyables.buyable2Amount < pointsStatsCalculated.buyables.buyable2.maxAmount">
                    Cost: {{ pointsStatsCalculated.buyables.buyable2.cost }} Points
                </p>
                <p v-else>Maxed</p>
                <div class="buyableBuyers">
                    <div class="buyableBuyOne">Buy 1</div>
                    <div class="buyableBuyMax">Buy Max</div>
                </div>
            </div>
        </div>
    </div>
    
    
</template>

<script setup>
defineProps({
    points: Object,
    pointsStatsCalculated: Object
})
</script>