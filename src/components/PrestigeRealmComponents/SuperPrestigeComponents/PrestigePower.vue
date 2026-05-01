<template>

</template>
<script setup>
import { usePrestigeRealmStatsStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStats';
import { usePrestigeRealmStatsCalculatedStore } from '@/stores/Player/PrestigeRealm/prestigeRealmStatsCalculated';

const prestigeRealmStats=usePrestigeRealmStatsStore()
const prestigeRealmStatsCalculated=usePrestigeRealmStatsCalculatedStore()


</script>