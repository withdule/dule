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
          <ion-input required color="primary" :value="email" @input="email = $event.target.value" type="email" placeholder="me@dule.com"></ion-input>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item>
          <ion-input required :value="password" @input="password = $event.target.value" type="password" placeholder="*******"></ion-input>
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
import { closeModals } from "@/functions/modals";
import {getToken, hashPassword} from "@/functions/fetch/account";
import {displayToast} from "@/functions/toasts";

export default {
  methods: {
    data() {
      return {
        email: "",
        password: ""
      }
    },
    async login () {
      const password = await hashPassword(this.password)
      const token = await getToken(this.email, password)
      if (token) {
        localStorage.setItem('userCredentials', JSON.stringify({
          email: this.email,
          password: password
        }))
        localStorage.setItem('userToken', token)
        await displayToast('Connected', 'Authenticated successfully', 2000, 'primary')
        setTimeout(() => {
          location.reload()
        }, 2000)
      }
    },
    closeModals
  }
}
</script>
