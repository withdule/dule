<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tasks</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list inset>
        <ion-item button @click="createModal(NewTaskListModal, 'modalNewTasklist', refs)">
          <Plus slot="start"/>
          <ion-label>
            New tasklist
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-list class="ion-border" inset v-for="list in tasklists">
        <ion-item-divider>
          <ion-label style="margin-top: 8px; margin-bottom: 8px;" slot="start">
            <h2>{{ list.name }}</h2>
          </ion-label>
          <Plus slot="end"/>
        </ion-item-divider>
        <ion-item v-for="task in list.tasks">
          <CheckSquare v-if="task.checked" class="ion-color-success" slot="start" @click="toggleTaskStatus(task)"/>
          <BoxSelect v-else class="ion-color-medium" slot="start" @click="toggleTaskStatus(task)"/>
          <ion-label>
            {{ task.content }}
          </ion-label>
          <Trash2 class="ion-color-danger" slot="end" @click="deleteTask(task.id)"/>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import '@/theme/globals.css'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { Plus, CheckSquare, BoxSelect, Trash2 } from "lucide-vue-next"
import {createModal} from "@/functions/modals";
import NewTaskListModal from "@/components/NewTaskListModal.vue";
</script>

<script lang="ts">

import {get, del, patch} from "@/functions/fetch/tools";
import {DuleTask, DuleTasklist} from "@/functions/interfaces";
import {ref} from "vue";

let refs = {
  modalNewTask: ref(null),
  modalNewTasklist: ref(null)
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
      tasklists: [] as DuleTasklist[],
      refs: refs
    }
  },
  mounted () {
    refs['page'] = this.$refs.page
    window.addEventListener('reload', this.fetchTasks)
  },
  created () {
    this.fetchTasks()
  },
  methods: {
    async fetchTasks() {
      const url = import.meta.env.VITE_API_URL + '/tasks'
      const events = await get(url)
      if (events) {
        this.events = events.data
        this.events.forEach(event => {
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
    async deleteTask(id: string) {
      const url = import.meta.env.VITE_API_URL + '/tasks/' + id
      await del(url)
      await this.fetchTasks()
    },
    async toggleTaskStatus(task: DuleTask) {
      const url = import.meta.env.VITE_API_URL + '/tasks/' + task.id
      task.checked = !task.checked
      await patch(url, task)
      await this.fetchTasks()
    }
  }
}
</script>

