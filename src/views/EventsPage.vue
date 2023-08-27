<template>
  <ion-page ref="page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Events</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <br>
      <VCalendar style="display: block; width: 95.5%; margin: auto; border-color: transparent; border-radius: 11px" :attributes="calendarConfig" :rows="2" @dayclick="handleDayClick($event)" :isDark="{ selector: 'body', darkClass: 'dark' }" ref="calendar">
        <template #footer>
          <hr>
          <ion-list class="ion-border" inset>
            <ion-item-divider>
              <ion-label style="margin-top: 8px; margin-bottom: 8px;" slot="start">
                <h2>Events</h2>
              </ion-label>
              <ion-label slot="end" v-if="currentEvents.length > 0">
                <p>the {{ new Date(currentEvents[0].startsAt).toLocaleDateString() }}</p>
              </ion-label>
            </ion-item-divider>
            <ion-item v-if="currentEvents.length <= 0">
              <BoxSelect slot="start"/>
              <ion-label>
                <p>No events this day, relax !</p>
                <h2>Nothing to see here</h2>
              </ion-label>
            </ion-item>
            <div v-for="event in currentEvents">
              <ion-item>
                <Calendar slot="start"/>
                <ion-label>
                  <h2>{{ event.name }}</h2>
                </ion-label>
                <!--              <Settings2 @click="createModal(New)" slot="end"/>-->
              </ion-item>
              <ion-item>
                <ion-label slot="start">
                  <p>Starts</p>
                </ion-label>
                <ion-label slot="end">
                  {{ event.startsAt }}
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-label slot="start">
                  <p>Ends</p>
                </ion-label>
                <ion-label slot="end">
                  {{ event.endsAt }}
                </ion-label>
              </ion-item>
            </div>
          </ion-list>
        </template>
      </VCalendar>
      <br>
      <ion-list inset>
        <ion-item button @click="createModal(NewEventModal, 'modalNewEvent', refs)">
          <Plus slot="start"/>
          <ion-label>
            New event
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-list inset>
        <ion-item button @click="openToday()">
          <Sun slot="start"/>
          <ion-label>
            Open today events
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { Calendar, Plus, Settings2, Sun, BoxSelect } from "lucide-vue-next"
import {createModal} from "@/functions/modals";
import NewEventModal from "@/components/NewEventModal.vue";
</script>

<script lang="ts">

import {get} from "@/functions/fetch/tools";
import {CalendarDay} from "v-calendar/dist/types/src/utils/page";
import {DuleEvent} from "@/functions/interfaces";
import {ref} from "vue";

let refs = {
  modalNewEvent: ref(null)
} as any

window.addEventListener('closeModals', () => {
  Object.keys(refs).forEach(key => {
    if (refs[key].value) refs[key].value.dismiss()
  })
  window.dispatchEvent(new Event('reload'))
})

export default {
  data () {
    return {
      events: [],
      calendarConfig: [] as any[],
      currentEvents: [] as DuleEvent[],
      refs: refs
    }
  },
  mounted () {
    refs['page'] = this.$refs.page
    window.addEventListener('reload', this.fetchEvents)
  },
  created () {
    this.fetchEvents()
  },
  methods: {
    openToday() {
      this.$refs.calendar.move(new Date())
      this.$refs.calendar.focusDate(new Date())
    },
    async fetchEvents() {
      const url = import.meta.env.VITE_API_URL + '/events'
      const events = await get(url)
      if (events) {
        this.events = events.data
        this.events.forEach(event => {
          console.log(event)
          this.calendarConfig.push({
            highlight: 'green',
            key: event._id,
            customData: event,
            dates: [
                [new Date(event.startsAt), new Date(event.endsAt)]
            ],
            popover: {
              label: event.name,
            },
            order: 0
          })
        })
      }
    },
    handleDayClick(day: CalendarDay) {
      this.currentEvents = []
      if (day.attributes) {
        const events = day.attributes as DuleEvent[]
        events.forEach((event) => {
          event = event.customData
          event.startsAt = event.startsAt.slice(0, 16).replaceAll('-', '/').replace('T', ' ')
          event.endsAt = event.endsAt.slice(0, 16).replaceAll('-', '/').replace('T', ' ')
          this.currentEvents.push(event)
        })
      }
    }
  }
}
</script>
<style>
ion-item:last-child {
  --inner-border-width: 0 0 0 0
}
</style>
