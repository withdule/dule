<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Login</ion-title>
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
          <ion-input color="primary" @ionChange="emailInput = $event.detail.value" type="email" placeholder="me@dule.com"></ion-input>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item>
          <ion-input @ionChange="passwordInput = $event.detail.value" type="password" placeholder="*******"></ion-input>
        </ion-item>
      </ion-list>

      <ion-button expand="full" type="button" @click="login()">Login</ion-button>

    </form>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle } from "@ionic/vue";
import { XCircle } from "lucide-vue-next";
</script>

<script lang="ts">
import { ref } from "vue"
import { closeModals } from "@/functions/modals";

const emailInput = ref(null) as string
const passwordInput = ref(null) as string


export default {
  methods: {
    login () {
      console.log(emailInput)
      closeModals()
    },
    closeModals
  }
}
</script>
