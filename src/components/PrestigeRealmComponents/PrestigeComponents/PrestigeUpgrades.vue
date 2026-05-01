<template>
    <div>
        <button
            class="layerResetButton"
            :class="{
                prestigeResetButton:
                    prestigePointsOnReset > 0 && prestigeRealmStatsStore.points.amount >= 500,
            }"
            @click="PrestigeReset"
        >
            <span v-if="prestigePointsOnReset < 1e3">
                <h3 class="currencyOnReset">+ {{ FormatNumber(prestigePointsOnReset) }} PP</h3>
                <h5 class="plusOneAt">
                    +1 at {{ FormatNumber(pointsToPlusOnePrestigePointOnReset) }} points
                </h5>
            </span>
            <span v-else>
                <h3 class="currencyOnReset">+ {{ FormatNumber(prestigePointsOnReset) }} PP</h3>
            </span>
        </button>
        <div class="upgradeRow">
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 1,
                    purchasedUpgrade: prestige.upgrades.row1.upgrade1Bought,
                }"
                @click="PurchasePrestigeUpgradeR1C1"
            >
                <h4 class="upgradeTitle">Point doubler</h4>
                <p class="upgradeDescription">x2 points</p>
                <p class="upgradeCost">Cost: 1 prestige point</p>
                <h3 class="upgradeNumber">1-1</h3>
            </button>
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 3,
                    purchasedUpgrade: prestige.upgrades.row1.upgrade2Bought,
                }"
                @click="PurchasePrestigeUpgradeR1C2"
            >
                <h4 class="upgradeTitle">Point tripler</h4>
                <p class="upgradeDescription">x3 points</p>
                <p class="upgradeCost">Cost: 3 prestige points</p>
                <h3 class="upgradeNumber">1-2</h3>
            </button>
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 5,
                    purchasedUpgrade: prestige.upgrades.row1.upgrade3Bought,
                }"
                @click="PurchasePrestigeUpgradeR1C3"
            >
                <h4 class="upgradeTitle">Prestige booster</h4>
                <p class="upgradeDescription">x1.5 prestige points</p>
                <p class="upgradeCost">Cost: 5 prestige points</p>
                <h3 class="upgradeNumber">1-3</h3>
            </button>
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 10,
                    purchasedUpgrade: prestige.upgrades.row1.upgrade4Bought,
                }"
                @click="PurchasePrestigeUpgradeR1C4"
            >
                <h4 class="upgradeTitle">Even more points</h4>
                <p class="upgradeDescription">x5 points</p>
                <p class="upgradeCost">Cost: 10 prestige points</p>
                <h3 class="upgradeNumber">1-4</h3>
            </button>
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 25,
                    purchasedUpgrade: prestige.upgrades.row1.upgrade5Bought,
                }"
                @click="PurchasePrestigeUpgradeR1C5"
            >
                <h4 class="upgradeTitle">Pointed self synergy</h4>
                <p class="upgradeDescription">points boost themselves</p>
                <p class="upgradeFormula">formula: 1 + log<sub>10</sub>(points)</p>
                <p class="upgradeEffect">
                    currently: x{{
                        FormatNumber(
                            prestigeRealmStatsCalculatedStore.prestige.upgrades.row1.upgrade5Effects
                                .effectOnPoints,
                        )
                    }}
                </p>
                <p class="upgradeCost">Cost: 25 prestige points</p>
                <h3 class="upgradeNumber">1-5</h3>
            </button>
        </div>
        <div class="upgradeRow" v-show="prestige.milestones.milestone4Unlocked">
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 400,
                    purchasedUpgrade: prestige.upgrades.row2.upgrade1Bought,
                }"
                @click="PurchasePrestigeUpgradeR2C1"
            >
                <h4 class="upgradeTitle">Duplicate upgrade</h4>
                <p class="upgradeDescription">x5 points</p>
                <p class="upgradeCost">Cost: 400 prestige point</p>
                <h3 class="upgradeNumber">2-1</h3>
            </button>
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 1000,
                    purchasedUpgrade: prestige.upgrades.row2.upgrade2Bought,
                }"
                @click="PurchasePrestigeUpgradeR2C2"
            >
                <h4 class="upgradeTitle">Prestige doubler</h4>
                <p class="upgradeDescription">x2 prestige points</p>
                <p class="upgradeCost">Cost: 1000 prestige points</p>
                <h3 class="upgradeNumber">2-2</h3>
            </button>
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 2500,
                    purchasedUpgrade: prestige.upgrades.row2.upgrade3Bought,
                }"
                @click="PurchasePrestigeUpgradeR2C3"
            >
                <h4 class="upgradeTitle">2 in 1 upgrade</h4>
                <p class="upgradeDescription">x3 points <br />x1.5 prestige points</p>
                <p class="upgradeCost">Cost: 2500 prestige points</p>
                <h3 class="upgradeNumber">2-3</h3>
            </button>
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 7500,
                    purchasedUpgrade: prestige.upgrades.row2.upgrade4Bought,
                }"
                @click="PurchasePrestigeUpgradeR2C4"
            >
                <h4 class="upgradeTitle">Points tenfold</h4>
                <p class="upgradeDescription">x10 points</p>
                <p class="upgradeCost">Cost: 7500 prestige points</p>
                <h3 class="upgradeNumber">2-4</h3>
            </button>
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 5e4,
                    purchasedUpgrade: prestige.upgrades.row2.upgrade5Bought,
                }"
                @click="PurchasePrestigeUpgradeR2C5"
            >
                <h4 class="upgradeTitle">Prestiged points</h4>
                <p class="upgradeDescription">prestige points boost points</p>
                <p class="upgradeFormula">formula: 1 + log<sub>10</sub>(prestige points)</p>
                <p class="upgradeEffect">
                    currently: x{{
                        FormatNumber(
                            prestigeRealmStatsCalculatedStore.prestige.upgrades.row2.upgrade5Effects
                                .effectOnPoints,
                        )
                    }}
                </p>
                <p class="upgradeCost">Cost: 5e4 prestige points</p>
                <h3 class="upgradeNumber">2-5</h3>
            </button>
        </div>
        <div class="upgradeRow" v-show="prestigeRealmStatsStore.superPrestige.milestones.milestone3Unlocked">
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 5e11,
                    purchasedUpgrade: prestige.upgrades.row3.upgrade1Bought,
                }"
                @click="PurchasePrestigeUpgradeR3C1"
            >
                <h4 class="upgradeTitle">Super row</h4>
                <p class="upgradeDescription">x100 points</p>
                <p class="upgradeCost">Cost: 5e11 prestige point</p>
                <h3 class="upgradeNumber">3-1</h3>
            </button>
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 1e13,
                    purchasedUpgrade: prestige.upgrades.row3.upgrade2Bought,
                }"
                @click="PurchasePrestigeUpgradeR3C2"
            >
                <h4 class="upgradeTitle">Super points</h4>
                <p class="upgradeDescription">x5000 points</p>
                <p class="upgradeCost">Cost: 1e13 prestige points</p>
                <h3 class="upgradeNumber">3-2</h3>
            </button>
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 1e16,
                    purchasedUpgrade: prestige.upgrades.row3.upgrade3Bought,
                }"
                @click="PurchasePrestigeUpgradeR3C3"
            >
                <h4 class="upgradeTitle">Super prestige</h4>
                <p class="upgradeDescription">x50 prestige points</p>
                <p class="upgradeCost">Cost: 1e16 prestige points</p>
                <h3 class="upgradeNumber">3-3</h3>
            </button>
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 1e20,
                    purchasedUpgrade: prestige.upgrades.row3.upgrade4Bought,
                }"
                @click="PurchasePrestigeUpgradeR3C4"
            >
                <h4 class="upgradeTitle">Super<sup>2</sup> prestige</h4>
                <p class="upgradeDescription">x4 super prestige points</p>
                <p class="upgradeCost">Cost: 1e20 prestige points</p>
                <h3 class="upgradeNumber">3-4</h3>
            </button>
            <button
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 1e50,
                    purchasedUpgrade: prestige.upgrades.row3.upgrade5Bought,
                }"
                @click="PurchasePrestigeUpgradeR3C5"
            >
                <h4 class="upgradeTitle">Prestiged prestige</h4>
                <p class="upgradeDescription">prestige points boost themselves</p>
                <p class="upgradeFormula">formula: 1 + log<sub>10</sub>(prestige points)</p>
                <p class="upgradeEffect">
                    currently: x{{
                        FormatNumber(
                            prestigeRealmStatsCalculatedStore.prestige.upgrades.row3.upgrade5Effects
                                .effectOnPrestigePoints,
                        )
                    }}
                </p>
                <p class="upgradeCost">Cost: 1e50 prestige points</p>
                <h3 class="upgradeNumber">3-5</h3>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/Scripts/formatters'
import ResetPointsLayer from '@/Scripts/PrestigeRealm/Points/ResetPointsLayer'

import { useNotificationStore } from '@/stores/notification'
import { usePrestigeRealmStatsStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStats'
import { usePrestigeRealmStatsCalculatedStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStatsCalculated'

const prestigeRealmStatsStore = usePrestigeRealmStatsStore()
const prestigeRealmStatsCalculatedStore = usePrestigeRealmStatsCalculatedStore()
const notificationStore = useNotificationStore()
let prestige = prestigeRealmStatsStore.prestige
let prestigeStatsCalculated = prestigeRealmStatsCalculatedStore.prestige

const prestigePointsOnReset = ref(
    Math.floor(
        Math.pow(
            (Math.pow(prestigeRealmStatsStore.points.amount / 500, 0.5) *
                prestigeRealmStatsCalculatedStore.prestige.gain.multiplier) /
                prestigeRealmStatsCalculatedStore.prestige.gain.challengeNerfs.divider,
            prestigeRealmStatsCalculatedStore.prestige.gain.exponent /
                prestigeRealmStatsCalculatedStore.prestige.gain.challengeNerfs.root,
        ),
    ),
)
const pointsToPlusOnePrestigePointOnReset = ref(
    Math.pow(
        (Math.pow(
            prestigePointsOnReset.value + 1,
            prestigeRealmStatsCalculatedStore.prestige.gain.challengeNerfs.root /
                prestigeRealmStatsCalculatedStore.prestige.gain.exponent,
        ) *
            prestigeRealmStatsCalculatedStore.prestige.gain.challengeNerfs.divider) /
            prestigeRealmStatsCalculatedStore.prestige.gain.multiplier,
        2,
    ) * 500,
)

const PrestigeReset = () => {
    if (prestigePointsOnReset.value > 0 && prestigeRealmStatsStore.points.amount >= 500) {
        prestige.amount += prestigePointsOnReset.value
        CheckForPrestigeMilestones()
        ResetPointsLayer(1)
    }
}

const CheckForPrestigeMilestones = () => {
    if (prestige.amount >= 2 && prestige.milestones.milestone1Unlocked == false) {
        prestige.milestones.milestone1Unlocked = true
        prestige.milestones.milestone2Unlocked = false
        notificationStore.NewNotification('Milestone unlocked', '2 PP', 'prestigeMilestone')
    }
    if (prestige.amount >= 8 && prestige.milestones.milestone2Unlocked == false) {
        prestige.milestones.milestone2Unlocked = true
        prestige.milestones.milestone3Unlocked = false
        notificationStore.NewNotification('Milestone unlocked', '8 PP', 'prestigeMilestone')
    }
    if (prestige.amount >= 50 && prestige.milestones.milestone3Unlocked == false) {
        prestige.milestones.milestone3Unlocked = true
        prestige.milestones.milestone4Unlocked = false
        notificationStore.NewNotification('Milestone unlocked', '50 PP', 'prestigeMilestone')
    }
    if (prestige.amount >= 150 && prestige.milestones.milestone4Unlocked == false) {
        prestige.milestones.milestone4Unlocked = true
        prestige.milestones.milestone5Unlocked = prestige.milestones.milestone5Unlocked==true ? true : false
        notificationStore.NewNotification('Milestone unlocked', '150 PP', 'prestigeMilestone')
    }    
    if (prestige.amount >= 1e5 && prestige.milestones.milestone5Unlocked == false) {
        prestige.milestones.milestone5Unlocked = true
        prestigeRealmStatsStore.superPrestige.unlocked = true
        //prestige.milestones.milestone6Unlocked=false
        notificationStore.NewNotification('Milestone unlocked', '1e5 PP', 'prestigeMilestone')
    }
}

setInterval(() => {
    prestigePointsOnReset.value = Math.floor(
        Math.pow(
            (Math.pow(prestigeRealmStatsStore.points.amount / 500, 0.5) *
                prestigeRealmStatsCalculatedStore.prestige.gain.multiplier) /
                prestigeRealmStatsCalculatedStore.prestige.gain.challengeNerfs.divider,
            prestigeRealmStatsCalculatedStore.prestige.gain.exponent /
                prestigeRealmStatsCalculatedStore.prestige.gain.challengeNerfs.root,
        ),
    )

    pointsToPlusOnePrestigePointOnReset.value =
        Math.pow(
            (Math.pow(
                prestigePointsOnReset.value + 1,
                prestigeRealmStatsCalculatedStore.prestige.gain.challengeNerfs.root /
                    prestigeRealmStatsCalculatedStore.prestige.gain.exponent,
            ) *
                prestigeRealmStatsCalculatedStore.prestige.gain.challengeNerfs.divider) /
                prestigeRealmStatsCalculatedStore.prestige.gain.multiplier,
            2,
        ) * 500
}, 25)

const PurchasePrestigeUpgradeR1C1 = () => {
    if (prestige.amount >= 1) {
        prestige.amount -= 1
        prestige.upgrades.row1.upgrade1Bought = true
        prestigeStatsCalculated.upgrades.row1.upgrade1Effects.effectOnPoints = 2
    }
}

const PurchasePrestigeUpgradeR1C2 = () => {
    if (prestige.amount >= 3) {
        prestige.amount -= 3
        prestige.upgrades.row1.upgrade2Bought = true
        prestigeStatsCalculated.upgrades.row1.upgrade2Effects.effectOnPoints = 3
    }
}

const PurchasePrestigeUpgradeR1C3 = () => {
    if (prestige.amount >= 5) {
        prestige.amount -= 5
        prestige.upgrades.row1.upgrade3Bought = true
        prestigeStatsCalculated.upgrades.row1.upgrade3Effects.effectOnPrestigePoints = 1.5
    }
}

const PurchasePrestigeUpgradeR1C4 = () => {
    if (prestige.amount >= 10) {
        prestige.amount -= 10
        prestige.upgrades.row1.upgrade4Bought = true
        prestigeStatsCalculated.upgrades.row1.upgrade4Effects.effectOnPoints = 5
    }
}

const PurchasePrestigeUpgradeR1C5 = () => {
    if (prestige.amount >= 25) {
        prestige.amount -= 25
        prestige.upgrades.row1.upgrade5Bought = true
        prestigeStatsCalculated.upgrades.row1.upgrade5Effects.effectOnPoints =
            1 + Math.log10(prestigeRealmStatsStore.points.amount)
    }
}

const PurchasePrestigeUpgradeR2C1 = () => {
    if (prestige.amount >= 400) {
        prestige.amount -= 400
        prestige.upgrades.row2.upgrade1Bought = true
        prestigeStatsCalculated.upgrades.row2.upgrade1Effects.effectOnPoints = 5
    }
}

const PurchasePrestigeUpgradeR2C2 = () => {
    if (prestige.amount >= 1000) {
        prestige.amount -= 1000
        prestige.upgrades.row2.upgrade2Bought = true
        prestigeStatsCalculated.upgrades.row2.upgrade2Effects.effectOnPrestigePoints = 2
    }
}

const PurchasePrestigeUpgradeR2C3 = () => {
    if (prestige.amount >= 2500) {
        prestige.amount -= 2500
        prestige.upgrades.row2.upgrade3Bought = true
        prestigeStatsCalculated.upgrades.row2.upgrade3Effects.effectOnPoints = 3
        prestigeStatsCalculated.upgrades.row2.upgrade3Effects.effectOnPrestigePoints = 1.5
    }
}

const PurchasePrestigeUpgradeR2C4 = () => {
    if (prestige.amount >= 7500) {
        prestige.amount -= 7500
        prestige.upgrades.row2.upgrade4Bought = true
        prestigeStatsCalculated.upgrades.row2.upgrade4Effects.effectOnPoints = 10
    }
}

const PurchasePrestigeUpgradeR2C5 = () => {
    if (prestige.amount >= 5e4) {
        prestige.amount -= 5e4
        prestige.upgrades.row2.upgrade5Bought = true
        prestigeStatsCalculated.upgrades.row2.upgrade5Effects.effectOnPrestigePoints = Math.max(
            1 + Math.log10(prestige.amount),
            1,
        )
    }
}

const PurchasePrestigeUpgradeR3C1 = () => {
    if (prestige.amount >= 1e11) {
        prestige.amount -= 1e11
        prestige.upgrades.row3.upgrade1Bought = true
        prestigeStatsCalculated.upgrades.row3.upgrade1Effects.effectOnPoints = 100
    }
}

const PurchasePrestigeUpgradeR3C2 = () => {
    if (prestige.amount >= 1e12) {
        prestige.amount -= 1e12
        prestige.upgrades.row3.upgrade2Bought = true
        prestigeStatsCalculated.upgrades.row3.upgrade2Effects.effectOnPoints = 5000
    }
}

const PurchasePrestigeUpgradeR3C3 = () => {
    if (prestige.amount >= 1e16) {
        prestige.amount -= 1e16
        prestige.upgrades.row3.upgrade3Bought = true
        prestigeStatsCalculated.upgrades.row3.upgrade3Effects.effectOnPrestigePoints = 50
    }
}

const PurchasePrestigeUpgradeR3C4 = () => {
    if (prestige.amount >= 1e20) {
        prestige.amount -= 1e20
        prestige.upgrades.row3.upgrade4Bought = true
        prestigeStatsCalculated.upgrades.row3.upgrade4Effects.effectOnSuperPrestigePoints = 4
    }
}

const PurchasePrestigeUpgradeR3C5 = () => {
    if (prestige.amount >= 1e50) {
        prestige.amount -= 1e50
        prestige.upgrades.row3.upgrade5Bought = true
        prestigeStatsCalculated.upgrades.row3.upgrade5Effects.effectOnPrestigePoints = Math.max(
            1 + Math.log10(prestige.amount),
            1,
        )
    }
}
</script>
