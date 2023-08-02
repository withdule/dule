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
          <ion-input color="primary" @ionChange="name = $event.detail.value" type="text" placeholder="Turn on washing machine"></ion-input>
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
        <ion-datetime mode="ios" :model-value="date"  @ionChange="alert(date.value)" :min="minStartDate.toISOString()" :hour-values="minStartsDateHoursSelection" :minute-values="minStartsDateMinutesSelection" id="datetime-start"></ion-datetime>
      </ion-modal>

      <ion-button expand="full" type="button" @click="addReminder()">Add</ion-button>

    </form>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle, IonDatetimeButton } from "@ionic/vue";
import { XCircle } from "lucide-vue-next";
</script>

<script lang="ts">
import { ref } from "vue"
import { closeModals } from "@/functions/modals"
import { IonDatetime } from "@ionic/vue"

const minStartDate = new Date()

const minutesSelection = Array.from(Array(60).keys())
const minStartsDateMinutesSelection = minutesSelection.slice(minStartDate.getMinutes(), minutesSelection.length)

const hoursSelection = Array.from(Array(60).keys())
const minStartsDateHoursSelection = hoursSelection.slice(minStartDate.getHours(), hoursSelection.length)


const name = ref(null) as string
const date = ref(null) as Date

export default {
  data() {
    return {
      name: name,
      date: date,
      minStartDate: minStartDate,
      minStartsDateMinutesSelection: minStartsDateMinutesSelection,
      minStartsDateHoursSelection: minStartsDateHoursSelection,
    }
  },
  methods: {
    addReminder () {
      console.log(name, date)
    },
    closeModals
  },
  components: { IonDatetime }
}
</script>
