<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Edit event "{{ name }}"</ion-title>
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
          <ion-input :value="newName" color="primary" @input="newName = $event.target.value" type="text" placeholder="Meeting with John"></ion-input>
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
        <ion-datetime mode="ios" :value="date" @ionChange="date = $event.detail.value" id="datetime-start"></ion-datetime>
      </ion-modal>

      <ion-modal :keep-contents-mounted="true">
        <ion-datetime mode="ios" :value="dateEnd" @ionChange="dateEnd = $event.detail.value"  id="datetime-end"></ion-datetime>
      </ion-modal>

      <ion-button expand="full" type="button" @click="saveEvent()">Save</ion-button>
      <ion-button color="danger" expand="full" type="button" @click="deleteEvent()">Delete event</ion-button>

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
import {del, patch} from "@/functions/fetch/tools";


export default {
  props: {
    name: String,
    startsAt: String,
    endsAt: String,
    id: String
  },
  data() {
    return {
      newName: this.name,
      date: this.startsAt,
      dateEnd: this.endsAt,
    }
  },
  methods: {
    async saveEvent () {
      const url = import.meta.env.VITE_API_URL + '/events/' + this.id
      const data = {
        name: this.newName,
        startsAt: this.date,
        endsAt: this.dateEnd
      }
      const event = await patch(url, data)
      if (event) {
        closeModals()
      }
    },
    async deleteEvent() {
      const url = import.meta.env.VITE_API_URL + '/events/' + this.id
      await del(url)
      closeModals()
    },
    closeModals
  },
  components: { IonDatetime }
}
</script>
