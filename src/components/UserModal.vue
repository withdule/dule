<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Your account</ion-title>
      <ion-buttons slot="end">
        <ion-button color="medium" @click="closeModals()">
          <XCircle/>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding" ref="presentingElement">
    <ion-list inset>
      <ion-item>
        <DuleFaceIcon slot="start" class="ion-color-tertiary"/>
        <ion-label>
          <h2><span>{{ user.fullname }}</span></h2>
          <p>{{ user.email }}</p>
        </ion-label>
        <Cog slot="end"/>
      </ion-item>
      <ion-item>
        <ion-label slot="start">
          <p>Registered since</p>
        </ion-label>
        <ion-label slot="end">
          <h2>{{ user.createdAt }}</h2>
        </ion-label>
      </ion-item>
      <ion-item button @click="disconnectAccount()">
        <LogOut slot="start" class="ion-icon ion-color-danger"/>
        <ion-label>
          <p>Logout</p>
        </ion-label>
      </ion-item>
    </ion-list>

    <div class="list-title">
      Stats
    </div>
    <ion-list inset>
      <ion-item>
        <CheckSquare slot="start" class="icon-icon ion-color-tertiary"/>
        <ion-label>
          <p>Tasks completed</p>
          <h2>50</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <BookMarked slot="start" class="icon-icon ion-color-tertiary"/>
        <ion-label>
          <p>Notes taken</p>
          <h2>32</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <CalendarCheck slot="start" class="icon-icon ion-color-tertiary"/>
        <ion-label>
          <p>Event scheduled</p>
          <h2>8</h2>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle } from "@ionic/vue";
import {XCircle, Cog, BookMarked, CalendarCheck, CheckSquare, LogOut} from "lucide-vue-next";
import DuleFaceIcon from "@/components/DuleFaceIcon.vue";
</script>

<script lang="ts">
import {closeModals} from "@/functions/modals";
import {getAccount, logOut} from "@/functions/fetch/account";

export default {
  data () {
    return {
      user: {
        fullname: "",
        email: "",
        createdAt: "",
      }
    }
  },
  created () {
    getAccount().then(user => this.user = user)
  },
  methods: {
    closeModals,
    disconnectAccount() {
      logOut()
      location.reload()
    }
  }
}
</script>
