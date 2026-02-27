<template>
    <div class="dialogBoxContainer" v-show="dialogBoxStore.isDialogBoxShown">
        <div class="dialogBoxMain" :class="{
            'dialogBoxDanger' : isDialogBoxTypeDanger
        }">
            <div class="dialogBoxHeader" @click="CloseDialogBox">
                <h3 class="dialogBoxTitle"> {{ dialogBoxStore.dialogBoxTitle }} </h3>
                <img src="./icons/menuClose.png" alt="close dialog box" >
            </div>
            <div class="dialogBoxContent" v-html="dialogBoxStore.dialogBoxContent"></div>
            <div class="dialogBoxActions" v-if="dialogBoxStore.dialogBoxActions=='hardReset'">
                <button @click="HardReset">
                    Confirm
                </button>
                <button @click="CloseDialogBox">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useDialogBoxStore } from '@/stores/dialogBox';
import { usePlayerStore } from '@/stores/player';
import { reactive, ref } from 'vue';

const dialogBoxStore=useDialogBoxStore()
const playerStore=usePlayerStore()
const isDialogBoxTypeDanger=ref()

const CloseDialogBox=()=>{
    dialogBoxStore.isDialogBoxShown=false
    console.log("here");
}

const HardReset=()=>{
    console.log("here");
    
    playerStore.hardResetActivate=true;
}

setInterval(() => {
    isDialogBoxTypeDanger.value=dialogBoxStore.dialogBoxType=="Danger"
}, 25);

</script>