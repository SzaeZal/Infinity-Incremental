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
            }"
        >
            <div class="notificationTitle">
                {{ notification.title }}
            </div>
            <div class="notificationDescription">
                {{ notification.description }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

const HideNotification = (id) => {
    notificationStore.notifications[id].hidden = true
}
</script>
