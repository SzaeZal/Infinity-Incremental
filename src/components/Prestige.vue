<template>
  <div>
    <h2 class="mainCurrencyDisplay">You have {{ FormatNumber(0) }} Prestige Points</h2>
    <div class="layerMenu">
      <div class="subMenu">
        <div class="subMenuItem selectedSubMenuItem">
          <h2>Upgrades</h2>
        </div>
      </div>
      <div class="main">
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FormatNumber } from '@/components/Scripts/formatters'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()


</script>
