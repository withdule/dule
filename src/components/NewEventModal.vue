<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Create an event</ion-title>
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
          <ion-input :value="name" color="primary" @input="name = $event.target.value" type="text" placeholder="Meeting with John"></ion-input>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item>
          <ion-label>
            <p>Starts</p>
          </ion-label>
          <ion-datetime-button mode="ios" datetime="datetime-start"></ion-datetime-button>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>Ends</p>
          </ion-label>
          <ion-datetime-button mode="ios" datetime="datetime-end"></ion-datetime-button>
        </ion-item>
      </ion-list>
      <ion-modal :keep-contents-mounted="true">
        <ion-datetime mode="ios" :value="date" @ionChange="date = $event.detail.value"  :min="minStartDate.toISOString()" :hour-values="minStartsDateHoursSelection" :minute-values="minStartsDateMinutesSelection" id="datetime-start"></ion-datetime>
      </ion-modal>

      <ion-modal :keep-contents-mounted="true">
        <ion-datetime mode="ios" :value="dateEnd" @ionChange="dateEnd = $event.detail.value" :min="minEndsDate.toISOString()" id="datetime-end"></ion-datetime>
      </ion-modal>

      <ion-button expand="full" type="button" @click="addEvent()">Add</ion-button>

    </form>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle, IonDatetimeButton } from "@ionic/vue";
import { XCircle } from "lucide-vue-next";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals"
import { IonDatetime } from "@ionic/vue"

const minStartDate = new Date()
const minEndsDate = new Date()
minEndsDate.setMinutes(minStartDate.getMinutes() + 1)

const minutesSelection = Array.from(Array(60).keys())
const minStartsDateMinutesSelection = minutesSelection.slice(minStartDate.getMinutes(), minutesSelection.length)

const hoursSelection = Array.from(Array(24).keys())
const minStartsDateHoursSelection = hoursSelection.slice(minStartDate.getHours(), hoursSelection.length)


export default {
  data() {
    return {
      name: "",
      date: new Date().toISOString(),
      dateEnd: new Date().toISOString(),
      minStartDate: minStartDate,
      minEndsDate: minEndsDate,
      minStartsDateMinutesSelection: minStartsDateMinutesSelection,
      minStartsDateHoursSelection: minStartsDateHoursSelection,
    }
  },
  methods: {
    addEvent () {
      console.log(this.name, this.date)
    },
    closeModals
  },
  components: { IonDatetime }
}
</script>
