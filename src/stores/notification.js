import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', () => {
    const notifications=ref([])

    const NewNotification=(title, decription, style)=>{
        let nextId=notifications.value.length
        notifications.value.push({
            id: nextId,
            title: title,
            decription: decription,
            style: style,
            hidden:false
        })
        setTimeout(HideNotification, 5000, nextId);        
    }

    const HideNotification=(id)=>{
        notifications.value[id].hidden=true
    }

    return {notifications, NewNotification}
})
