<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Create a reminder</ion-title>
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
          <ion-input color="primary" :value="name" @input="name = $event.target.value" type="text" placeholder="Turn on washing machine"></ion-input>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item>
          <ion-label>
            <p>Rings at</p>
          </ion-label>
          <ion-datetime-button mode="ios" datetime="datetime-start"></ion-datetime-button>
        </ion-item>
      </ion-list>
      <ion-modal :keep-contents-mounted="true">
        <ion-datetime mode="ios" :value="date" @ionChange="date = $event.detail.value" id="datetime-start"></ion-datetime>
      </ion-modal>

      <ion-button expand="full" type="button" @click="addNewReminder()">Add</ion-button>

    </form>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle, IonDatetimeButton, IonDatetime } from "@ionic/vue";
import { XCircle } from "lucide-vue-next";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals"
import { IonDatetime } from "@ionic/vue"
import {addReminder} from "@/functions/reminders";

const minStartDate = new Date()



export default {
  data() {
    return {
      name: "",
      date: new Date().toISOString(),
      minStartDate: minStartDate
    }
  },
  methods: {
    addNewReminder () {
      addReminder(this.date, this.name)
      closeModals()
    },
    closeModals
  },
  components: { IonDatetime }
}
</script>
