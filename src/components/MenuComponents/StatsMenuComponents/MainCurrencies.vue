<template>
    <div class="statGroup" :class="{'closedStatGroup' : !statGroupsToggled[0], 'openStatGroup' : statGroupsToggled[0]}">
        <div class="statGroupTitle" @click="ToggleStatGroup(0)">
            <h2>Prestige realm</h2>
            <div class="statGroupToggler">

            </div>
        </div>
        <div class="stat">
            <h4 class="statName">
                Points
            </h4>
            <h4 class="statAmount">
                {{ FormatNumber(playerStore.prestigeRealm.points.amount) }}
            </h4>
            <div class="automationToggler">

            </div>
            <div class="statPinToggler">

            </div>
        </div>
        <div class="stat">
            <h4 class="statName">
                Prestige Points
            </h4>
            <h4 class="statAmount">
                {{ FormatNumber(playerStore.prestigeRealm.points.amount) }}
            </h4>
            <div class="automationToggler">

            </div>
            <div class="statPinToggler">

            </div>
        </div>
    </div>
</template>
<script setup>
import { FormatNumber } from '@/components/Scripts/formatters';
import { usePlayerStore } from '@/stores/player';
import { ref } from 'vue';


const playerStore=usePlayerStore()
const statGroupsToggled=ref([true])

const ToggleStatGroup=(index)=>{
    statGroupsToggled.value[index]=!statGroupsToggled.value[index]
}

</script>