<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Modify your profile</ion-title>
      <ion-buttons slot="end">
        <ion-back-button></ion-back-button>
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
          <ion-input required color="primary" :value="name" @input="name = $event.target.value" type="text" placeholder="John"></ion-input>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item>
          <ion-input required color="primary" :value="email" @input="email = $event.target.value" type="email" placeholder="john@dule.com"></ion-input>
        </ion-item>
      </ion-list>

      <ion-button expand="full" type="button" @click="editAccount()">Save</ion-button>

    </form>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle, IonBackButton } from "@ionic/vue";
import { XCircle } from "lucide-vue-next";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals";


export default {
  methods: {
    editAccount () {
      closeModals()
    },
    closeModals
  },
  data() {
    return {
      name: "",
      email: ""
    }
  }
}
</script>
