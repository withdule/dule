<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Create an account</ion-title>
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
          <ion-input color="primary" :value="fullname" @input="fullname = $event.target.value" type="text" placeholder="John Dule"></ion-input>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item>
          <ion-input color="primary" :value="email" @input="email = $event.target.value" type="email" placeholder="john@dule.com"></ion-input>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item>
          <ion-input :value="password" @input="password = $event.target.value" type="password" placeholder="*******"></ion-input>
        </ion-item>
      </ion-list>

      <ion-button expand="full" type="button" @click="register()">Register</ion-button>

    </form>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle } from "@ionic/vue";
import { XCircle } from "lucide-vue-next";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals";
import {hashPassword} from "@/functions/fetch/account";
import {post} from "@/functions/fetch/tools";
import {displayToast} from "@/functions/toasts";


export default {
  data () {
    return {
      fullname: "",
      email: "",
      password: ""
    }
  },
  methods: {
    async register () {
      const url = import.meta.env.VITE_API_URL + '/me/register'
      const password = await hashPassword(this.password)
      const data = {
        fullname: this.fullname,
        email: this.email,
        password: password
      }
      const response = await post(url, data)
      localStorage.setItem('userToken', response.token)
      localStorage.setItem('userCreds', JSON.stringify({
        email: this.email,
        password: password
      }))
      await displayToast('Registered', 'Your account have been created successfully', 2000, 'primary')
      setTimeout(() => {
        location.reload()
      }, 2000)
    },
    closeModals
  }
}
</script>
