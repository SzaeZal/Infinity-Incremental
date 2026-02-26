<template>
  <div>
    <h2 class="mainCurrencyDisplay">You have {{ FormatNumber(0) }} Prestige Points</h2>
    <div class="layerMenu">
      <div class="layerSubMenu">
        <div class="subMenuItem selectedSubMenuItem">
          <h2>Upgrades</h2>
        </div>
        <div class="subMenuItem">
          <h2>Milestones</h2>
        </div>
      </div>
      <div class="main">
          <PrestigeUpgrades />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/components/Scripts/formatters'
import { usePlayerStore } from '@/stores/player'
import PrestigeUpgrades from './PrestigeComponents/PrestigeUpgrades.vue';

const playerStore = usePlayerStore()


</script>
