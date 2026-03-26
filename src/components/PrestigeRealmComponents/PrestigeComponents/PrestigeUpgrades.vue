<template>
    <div>
        <div
            class="layerResetButton"
            :class="{
                prestigeResetButton:
                    prestigePointsOnReset > 0 && playerStore.prestigeRealm.points.amount >= 500,
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
        </div>
        <div class="upgradeRow">
            <div
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 1,
                    purchasedUpgrade: prestige.upgrades.row1.upgrade1Bought,
                }"
                @click="PurchasePrestigeUpgradeR1C1"
            >
                <div class="upgradeTitle">Point doubler</div>
                <div class="upgradeDescription">x2 points</div>
                <div class="upgradeCost">Cost: 1 prestige point</div>
                <div class="upgradeNumber">1-1</div>
            </div>
            <div
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 3,
                    purchasedUpgrade: prestige.upgrades.row1.upgrade2Bought,
                }"
                @click="PurchasePrestigeUpgradeR1C2"
            >
                <div class="upgradeTitle">Point tripler</div>
                <div class="upgradeDescription">x3 points</div>
                <div class="upgradeCost">Cost: 3 prestige points</div>
                <div class="upgradeNumber">1-2</div>
            </div>
            <div
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 5,
                    purchasedUpgrade: prestige.upgrades.row1.upgrade3Bought,
                }"
                @click="PurchasePrestigeUpgradeR1C3"
            >
                <div class="upgradeTitle">Prestige booster</div>
                <div class="upgradeDescription">x1.5 prestige points</div>
                <div class="upgradeCost">Cost: 5 prestige points</div>
                <div class="upgradeNumber">1-3</div>
            </div>
            <div
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 10,
                    purchasedUpgrade: prestige.upgrades.row1.upgrade4Bought,
                }"
                @click="PurchasePrestigeUpgradeR1C4"
            >
                <div class="upgradeTitle">Even more points</div>
                <div class="upgradeDescription">x5 points</div>
                <div class="upgradeCost">Cost: 10 prestige points</div>
                <div class="upgradeNumber">1-4</div>
            </div>
            <div
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 25,
                    purchasedUpgrade: prestige.upgrades.row1.upgrade5Bought,
                }"
                @click="PurchasePrestigeUpgradeR1C5"
            >
                <div class="upgradeTitle">Pointed self synergy</div>
                <div class="upgradeDescription">points boost themselves</div>
                <div class="upgradeFormula">formula: 1 + log<sub>10</sub>(points)</div>
                <div class="upgradeEffect">
                    currently: x{{
                        FormatNumber(
                            playerStore.prestigeRealmStatsCalculated.prestige.upgrades.row1
                                .upgrade5Effects.effectOnPoints,
                        )
                    }}
                </div>
                <div class="upgradeCost">Cost: 25 prestige points</div>
                <div class="upgradeNumber">1-5</div>
            </div>
        </div>
        <div class="upgradeRow" v-show="prestige.milestones.milestone4Unlocked">
            <div
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 400,
                    purchasedUpgrade: prestige.upgrades.row2.upgrade1Bought,
                }"
                @click="PurchasePrestigeUpgradeR2C1"
            >
                <div class="upgradeTitle">Duplicate upgrade</div>
                <div class="upgradeDescription">x5 points</div>
                <div class="upgradeCost">Cost: 400 prestige point</div>
                <div class="upgradeNumber">2-1</div>
            </div>
            <div
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 1000,
                    purchasedUpgrade: prestige.upgrades.row2.upgrade2Bought,
                }"
                @click="PurchasePrestigeUpgradeR2C2"
            >
                <div class="upgradeTitle">Prestige doubler</div>
                <div class="upgradeDescription">x2 prestige points</div>
                <div class="upgradeCost">Cost: 1000 prestige points</div>
                <div class="upgradeNumber">2-2</div>
            </div>
            <div
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 2500,
                    purchasedUpgrade: prestige.upgrades.row2.upgrade3Bought,
                }"
                @click="PurchasePrestigeUpgradeR2C3"
            >
                <div class="upgradeTitle">2 in 1 upgrade</div>
                <div class="upgradeDescription">x3 points <br />x1.5 prestige points</div>
                <div class="upgradeCost">Cost: 2500 prestige points</div>
                <div class="upgradeNumber">2-3</div>
            </div>
            <div
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 7500,
                    purchasedUpgrade: prestige.upgrades.row2.upgrade4Bought,
                }"
                @click="PurchasePrestigeUpgradeR2C4"
            >
                <div class="upgradeTitle">Points tenfold</div>
                <div class="upgradeDescription">x10 points</div>
                <div class="upgradeCost">Cost: 7500 prestige points</div>
                <div class="upgradeNumber">2-4</div>
            </div>
            <div
                class="upgrade"
                :class="{
                    upgradePurchaseable: prestige.amount >= 5e4,
                    purchasedUpgrade: prestige.upgrades.row2.upgrade5Bought,
                }"
                @click="PurchasePrestigeUpgradeR2C5"
            >
                <div class="upgradeTitle">Prestiged points</div>
                <div class="upgradeDescription">prestige points boost points</div>
                <div class="upgradeFormula">formula: 1 + log<sub>10</sub>(prestige points)</div>
                <div class="upgradeEffect">
                    currently: x{{
                        FormatNumber(
                            playerStore.prestigeRealmStatsCalculated.prestige.upgrades.row2
                                .upgrade5Effects.effectOnPoints,
                        )
                    }}
                </div>
                <div class="upgradeCost">Cost: 5e4 prestige points</div>
                <div class="upgradeNumber">2-5</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/components/Scripts/formatters'
import { usePlayerStore } from '@/stores/player'
import ResetPointsLayer from '@/components/Scripts/PrestigeRealm/PrestigeRealmResets/ResetPointsLayer'
import { useNotificationStore } from '@/stores/notification'

const playerStore = usePlayerStore()
const notificationStore = useNotificationStore()
let prestige = playerStore.prestigeRealm.prestige
let prestigeStatsCalculated = playerStore.prestigeRealmStatsCalculated.prestige

const prestigePointsOnReset = ref(
    Math.floor(
        Math.pow(
            (Math.pow(playerStore.prestigeRealm.points.amount / 500, 0.5) *
                playerStore.prestigeRealmStatsCalculated.prestige.gain.multiplier) /
                playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider,
            playerStore.prestigeRealmStatsCalculated.prestige.gain.exponent /
                playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.root,
        ),
    ),
)
const pointsToPlusOnePrestigePointOnReset = ref(
    Math.pow(
        (Math.pow(
            prestigePointsOnReset.value + 1,
            playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.root /
                playerStore.prestigeRealmStatsCalculated.prestige.gain.exponent,
        ) *
            playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider) /
            playerStore.prestigeRealmStatsCalculated.prestige.gain.multiplier,
        2,
    ) * 500,
)

const PrestigeReset = () => {
    if (prestigePointsOnReset.value > 0 && playerStore.prestigeRealm.points.amount >= 500) {
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
        prestige.milestones.milestone5Unlocked = false
        notificationStore.NewNotification('Milestone unlocked', '150 PP', 'prestigeMilestone')
    }
    if (prestige.amount >= 1e5 && prestige.milestones.milestone5Unlocked == false) {
        prestige.milestones.milestone5Unlocked = true
        playerStore.prestigeRealm.superPrestige.unlocked = true
        //prestige.milestones.milestone6Unlocked=false
        notificationStore.NewNotification('Milestone unlocked', '1e5 PP', 'prestigeMilestone')
    }
}

setInterval(() => {
    prestigePointsOnReset.value = Math.floor(
        Math.pow(
            (Math.pow(playerStore.prestigeRealm.points.amount / 500, 0.5) *
                playerStore.prestigeRealmStatsCalculated.prestige.gain.multiplier) /
                playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider,
            playerStore.prestigeRealmStatsCalculated.prestige.gain.exponent /
                playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.root,
        ),
    )

    pointsToPlusOnePrestigePointOnReset.value =
        Math.pow(
            (Math.pow(
                prestigePointsOnReset.value + 1,
                playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.root /
                    playerStore.prestigeRealmStatsCalculated.prestige.gain.exponent,
            ) *
                playerStore.prestigeRealmStatsCalculated.prestige.gain.challengeNerfs.divider) /
                playerStore.prestigeRealmStatsCalculated.prestige.gain.multiplier,
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
            1 + Math.log10(playerStore.prestigeRealm.points.amount)
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
</script>
