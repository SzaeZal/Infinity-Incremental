import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDialogBoxStore = defineStore('dialogBox', () => {
    const isDialogBoxShown=ref(false)
    const dialogBoxType=ref("none")
    const dialogBoxTitle=ref("")
    const dialogBoxContent=ref(``)
    const dialogBoxActions=ref(``)

    return {isDialogBoxShown, dialogBoxType, dialogBoxTitle, dialogBoxContent, dialogBoxActions}
})
