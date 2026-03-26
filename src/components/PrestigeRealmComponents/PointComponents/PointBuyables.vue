<template>
    <div class="buyables">
        <div class="buyable">
            <h4 class="buyableAmount">
                {{ points.buyables.buyable1Amount }} /
                {{ pointsStatsCalculated.buyables.buyable1.maxAmount }}
            </h4>
            <h3 class="buyableTitle">Point doubler</h3>
            <p class="buyableDescription">Each level doubles point gain</p>
            <p class="buyableEffect">
                Currently: x{{
                    pointsStatsCalculated.buyables.buyable1.effects.effectOnPoints.multiplier
                }}
            </p>
            <p
                class="buyableCost"
                v-if="
                    points.buyables.buyable1Amount <
                    pointsStatsCalculated.buyables.buyable1.maxAmount
                "
            >
                Cost: {{ FormatNumber(pointsStatsCalculated.buyables.buyable1.cost) }} Points
            </p>
            <p v-else>Maxed</p>
            <div
                class="buyableBuyers"
                v-if="
                    points.buyables.buyable1Amount <
                    pointsStatsCalculated.buyables.buyable1.maxAmount
                "
            >
                <div
                    class="buyableBuyOne"
                    :class="{
                        buyablePurchaseable:
                            points.amount >= pointsStatsCalculated.buyables.buyable1.cost,
                    }"
                    @click="Buyable1BuyOnce"
                >
                    Buy 1
                </div>
                <div
                    class="buyableBuyMax"
                    :class="{
                        buyablePurchaseable:
                            points.amount >= pointsStatsCalculated.buyables.buyable1.cost,
                    }"
                    @click="Buyable1BuyMax"
                >
                    Buy Max
                </div>
            </div>
        </div>
        <div class="buyable">
            <h4 class="buyableAmount">
                {{ points.buyables.buyable2Amount }} /
                {{ pointsStatsCalculated.buyables.buyable2.maxAmount }}
            </h4>
            <h3 class="buyableTitle">Point multiplier</h3>
            <p class="buyableDescription">
                Each level multiplies point gain by +x1 <br />
                doubles every 25 levels
            </p>
            <p class="buyableEffect">
                Currently: x{{
                    pointsStatsCalculated.buyables.buyable2.effects.effectOnPoints.multiplier
                }}
            </p>
            <p
                class="buyableCost"
                v-if="
                    points.buyables.buyable2Amount <
                    pointsStatsCalculated.buyables.buyable2.maxAmount
                "
            >
                Cost: {{ FormatNumber(pointsStatsCalculated.buyables.buyable2.cost) }} Points
            </p>
            <p v-else>Maxed</p>
            <div
                class="buyableBuyers"
                v-if="
                    points.buyables.buyable2Amount <
                    pointsStatsCalculated.buyables.buyable2.maxAmount
                "
            >
                <div
                    class="buyableBuyOne"
                    :class="{
                        buyablePurchaseable:
                            points.amount >= pointsStatsCalculated.buyables.buyable2.cost,
                    }"
                    @click="Buyable2BuyOnce"
                >
                    Buy 1
                </div>
                <div
                    class="buyableBuyMax"
                    :class="{
                        buyablePurchaseable:
                            points.amount >= pointsStatsCalculated.buyables.buyable2.cost,
                    }"
                    @click="Buyable2BuyMax"
                >
                    Buy Max
                </div>
            </div>
        </div>
        <div
            class="buyable"
            v-show="prestigeRealmStatsStore.prestige.milestones.milestone1Unlocked == true"
        >
            <h4 class="buyableAmount">
                {{ points.buyables.buyable3Amount }} /
                {{ pointsStatsCalculated.buyables.buyable3.maxAmount }}
            </h4>
            <h3 class="buyableTitle">Prestige multiplier</h3>
            <p class="buyableDescription">
                Each level multiplies prestige point gain by x1.5 <br />
            </p>
            <p class="buyableEffect">
                Currently: x{{
                    pointsStatsCalculated.buyables.buyable3.effects.effectOnPrestigePoints
                        .multiplier
                }}
            </p>
            <p
                class="buyableCost"
                v-if="
                    points.buyables.buyable3Amount <
                    pointsStatsCalculated.buyables.buyable3.maxAmount
                "
            >
                Cost: {{ FormatNumber(pointsStatsCalculated.buyables.buyable3.cost) }} Points
            </p>
            <p v-else>Maxed</p>
            <div
                class="buyableBuyers"
                v-if="
                    points.buyables.buyable3Amount <
                    pointsStatsCalculated.buyables.buyable3.maxAmount
                "
            >
                <div
                    class="buyableBuyOne"
                    :class="{
                        buyablePurchaseable:
                            points.amount >= pointsStatsCalculated.buyables.buyable3.cost,
                    }"
                    @click="Buyable3BuyOnce"
                >
                    Buy 1
                </div>
                <div
                    class="buyableBuyMax"
                    :class="{
                        buyablePurchaseable:
                            points.amount >= pointsStatsCalculated.buyables.buyable3.cost,
                    }"
                    @click="Buyable3BuyMax"
                >
                    Buy Max
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/components/Scripts/formatters'

import { usePrestigeRealmStatsStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStats'
import { usePrestigeRealmStatsCalculatedStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStatsCalculated'

const prestigeRealmStatsStore=usePrestigeRealmStatsStore()
const prestigeRealmStatsCalculatedStore=usePrestigeRealmStatsCalculatedStore()

let points = prestigeRealmStatsStore.points
let pointsStatsCalculated = prestigeRealmStatsCalculatedStore.points

const Buyable1BuyOnce = () => {
    if (points.amount >= pointsStatsCalculated.buyables.buyable1.cost) {
        points.amount -= pointsStatsCalculated.buyables.buyable1.cost
        points.buyables.buyable1Amount++
        pointsStatsCalculated.buyables.buyable1.cost =
            10 *
            Math.pow(
                2,
                points.buyables.buyable1Amount * Math.log2(points.buyables.buyable1Amount + 2),
            )
        pointsStatsCalculated.buyables.buyable1.effects.effectOnPoints.multiplier = Math.pow(
            2,
            points.buyables.buyable1Amount,
        )
    }
}

const Buyable1BuyMax = () => {
    while (points.amount >= pointsStatsCalculated.buyables.buyable1.cost) {
        points.amount -= pointsStatsCalculated.buyables.buyable1.cost
        points.buyables.buyable1Amount++
        pointsStatsCalculated.buyables.buyable1.cost =
            10 *
            Math.pow(
                2,
                points.buyables.buyable1Amount * Math.log2(points.buyables.buyable1Amount + 2),
            )
        pointsStatsCalculated.buyables.buyable1.effects.effectOnPoints.multiplier = Math.pow(
            2,
            points.buyables.buyable1Amount,
        )
    }
}

const Buyable2BuyOnce = () => {
    if (points.amount >= pointsStatsCalculated.buyables.buyable2.cost) {
        points.amount -= pointsStatsCalculated.buyables.buyable2.cost
        points.buyables.buyable2Amount++
        pointsStatsCalculated.buyables.buyable2.cost =
            25 *
            Math.pow(
                1.35,
                points.buyables.buyable2Amount * Math.log2(points.buyables.buyable2Amount + 2),
            )
        pointsStatsCalculated.buyables.buyable2.effects.effectOnPoints.multiplier =
            (1 + points.buyables.buyable2Amount) *
            Math.max(1, 2 * Math.floor(points.buyables.buyable2Amount / 25))
    }
}

const Buyable2BuyMax = () => {
    while (points.amount >= pointsStatsCalculated.buyables.buyable2.cost) {
        points.amount -= pointsStatsCalculated.buyables.buyable2.cost
        points.buyables.buyable2Amount++
        pointsStatsCalculated.buyables.buyable2.cost =
            25 *
            Math.pow(
                1.35,
                points.buyables.buyable2Amount * Math.log2(points.buyables.buyable2Amount + 2),
            )
        pointsStatsCalculated.buyables.buyable2.effects.effectOnPoints.multiplier =
            (1 + points.buyables.buyable2Amount) *
            Math.max(1, 2 * Math.floor(points.buyables.buyable2Amount / 25))
    }
}

const Buyable3BuyOnce = () => {
    if (points.amount >= pointsStatsCalculated.buyables.buyable3.cost) {
        points.amount -= pointsStatsCalculated.buyables.buyable3.cost
        points.buyables.buyable3Amount++
        pointsStatsCalculated.buyables.buyable3.cost =
            1000 *
            Math.pow(
                10,
                points.buyables.buyable3Amount * Math.log2(points.buyables.buyable3Amount + 2),
            )
        pointsStatsCalculated.buyables.buyable3.effects.effectOnPrestigePoints.multiplier =
            Math.pow(1.5, points.buyables.buyable3Amount)
    }
}

const Buyable3BuyMax = () => {
    while (points.amount >= pointsStatsCalculated.buyables.buyable3.cost) {
        points.amount -= pointsStatsCalculated.buyables.buyable3.cost
        points.buyables.buyable3Amount++
        pointsStatsCalculated.buyables.buyable3.cost =
            1000 *
            Math.pow(
                10,
                points.buyables.buyable3Amount * Math.log2(points.buyables.buyable3Amount + 2),
            )
        pointsStatsCalculated.buyables.buyable3.effects.effectOnPrestigePoints.multiplier =
            Math.pow(1.5, points.buyables.buyable3Amount)
    }
}
</script>
