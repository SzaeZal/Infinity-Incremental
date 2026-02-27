<template>
    <div class="notifications">
        <div class="notification" v-for="notification in notificationStore.notifications" @click="HideNotification(notification.id)" :class="{
            'notificationDisappear' : notification.hidden
        }">
            <div class="notificationTitle">
                {{ notification.title }}
            </div>
            <div class="notificationDecription">
                {{ notification.decription }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { useNotificationStore } from '@/stores/notification';

const notificationStore=useNotificationStore()

notificationStore.NewNotification("", "", "")
setTimeout(() => {
    notificationStore.NewNotification("", "", "")
}, 2500);

const HideNotification=(id)=>{
    notificationStore.notifications[id].hidden=true
}
</script>