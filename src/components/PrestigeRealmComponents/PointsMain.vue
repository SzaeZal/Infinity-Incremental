<template>
  <div>
    <h2 class="mainCurrencyDisplay">You have {{ FormatNumber(points.amount) }} Points</h2>
    <div class="layerMenu">
      <div class="layerSubMenu">
        <div class="subMenuItem selectedSubMenuItem">
          <h2>Buyables</h2>
        </div>
      </div>
      <div class="main">
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
                points.buyables.buyable1Amount < pointsStatsCalculated.buyables.buyable1.maxAmount
              "
            >
              Cost: {{ FormatNumber(pointsStatsCalculated.buyables.buyable1.cost) }} Points
            </p>
            <p v-else>Maxed</p>
            <div
              class="buyableBuyers"
              v-if="
                points.buyables.buyable1Amount < pointsStatsCalculated.buyables.buyable1.maxAmount
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
                points.buyables.buyable2Amount < pointsStatsCalculated.buyables.buyable2.maxAmount
              "
            >
              Cost: {{ FormatNumber(pointsStatsCalculated.buyables.buyable2.cost) }} Points
            </p>
            <p v-else>Maxed</p>
            <div
              class="buyableBuyers"
              v-if="
                points.buyables.buyable2Amount < pointsStatsCalculated.buyables.buyable2.maxAmount
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/components/Scripts/formatters'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
let points = playerStore.prestigeRealm.points
let pointsStatsCalculated = playerStore.prestigeRealmStatsCalculated.points

const Buyable1BuyOnce = () => {
  if (points.amount >= pointsStatsCalculated.buyables.buyable1.cost) {
    points.amount -= pointsStatsCalculated.buyables.buyable1.cost
    points.buyables.buyable1Amount++
    pointsStatsCalculated.buyables.buyable1.cost =
      10 *
      Math.pow(2, points.buyables.buyable1Amount * (1 + Math.log2(points.buyables.buyable1Amount)))
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
      Math.pow(2, points.buyables.buyable1Amount * (1 + Math.log2(points.buyables.buyable1Amount)))
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
        points.buyables.buyable2Amount * (1 + Math.log2(points.buyables.buyable2Amount)),
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
        points.buyables.buyable2Amount * (1 + Math.log2(points.buyables.buyable2Amount)),
      )
    pointsStatsCalculated.buyables.buyable2.effects.effectOnPoints.multiplier =
      (1 + points.buyables.buyable2Amount) *
      Math.max(1, 2 * Math.floor(points.buyables.buyable2Amount / 25))
  }
}
</script>
