<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Write a new note</ion-title>
      <ion-buttons slot="end">
        <ion-button color="medium" @click="closeModals()">
          <XCircle/>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">

    <form class="login">

      <ion-list inset>
        <ion-item>
          <ion-input required color="primary" @input="name = $event.target.value" :value="name" type="text" placeholder="Turn on washing machine"></ion-input>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item>
          <ion-textarea auto-grow required color="primary" @input="content = $event.target.value" :value="content" placeholder="# Dule support markdown rich syntax">

          </ion-textarea>
        </ion-item>
      </ion-list>

      <ion-button expand="full" type="button" @click="addNote()">Add</ion-button>

    </form>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle } from "@ionic/vue";
import { XCircle } from "lucide-vue-next";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals"

export default {
  data() {
    return {
      name: "",
      content: ""
    }
  },
  methods: {
    addNote () {
      console.log(this.name, this.content)
    },
    closeModals
  },
}
</script>
