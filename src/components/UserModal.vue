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
          <h2><span>Armand</span></h2>
          <p>armand@camponovo.xyz</p>
        </ion-label>
        <Cog slot="end"/>
      </ion-item>
      <ion-item>
        <ion-label slot="start">
          <p>Registered since</p>
        </ion-label>
        <ion-label slot="end">
          <h2>20/12/23</h2>
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
import {XCircle, Cog, BookMarked, CalendarCheck, CheckSquare} from "lucide-vue-next";
import DuleFaceIcon from "@/components/DuleFaceIcon.vue";
</script>

<script lang="ts">
import {closeModals, createModal} from "@/functions/modals";
import {ref} from "vue";
import EditAccountModal from "@/components/EditAccountModal.vue";

let refs = {
  modalEditAccount: ref(null),
}

export default {
  methods: {
    data() {
      return {
        email: "",
        password: ""
      }
    },
    login () {
      localStorage.setItem('userCredentials', JSON.stringify({
        email: this.emailInput,
        passwordInput: this.passwordInput
      }))
      console.log(this.emailInput)
      closeModals()
    },
    closeModals
  }
}
</script>
