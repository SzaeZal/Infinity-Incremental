<template>
    <div class="notifications">
        <div
            class="notification"
            v-for="notification in notificationStore.notifications"
            @click="HideNotification(notification.id)"
            :class="{
                notificationDisappear: notification.hidden,
                prestigeMilestone: notification.style == 'prestigeMilestone',
                superPrestigeMilestone: notification.style == 'superPrestigeMilestone',
                notificationInfo: notification.style=='Info',
                notificationSuccess: notification.style=='Success'
            }"
        >
            <h2 class="notificationTitle">
                {{ notification.title }}
            </h2>
            <p class="notificationDescription" v-show='notification.description!=""'>
                {{ notification.description }}
            </p>
        </div>
    </div>
</template>
<script setup>
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

const HideNotification = (id) => {
    notificationStore.notifications[id].hidden = true
    console.log(notificationStore.notifications[id].description=="");
    
}
</script>
