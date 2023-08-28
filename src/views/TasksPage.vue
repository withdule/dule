<template>
  <ion-page ref="page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Tasks</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list inset>
        <ion-item button @click="createModal(NewTaskListModal, 'modalNewTasklist', refs)">
          <Plus class="focusable" slot="start"/>
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

          <Trash2 v-if="list._id !== 'unordered'" @click="deleteTasklist(list._id)" class="focusable ion-color-danger ion-margin-end" slot="end"/>
          <Plus class="focusable" @click="createModal(NewTaskModal, 'modalNewTask', refs, { selectedTasklist: list._id, userTasklist })" slot="end"/>
        </ion-item-divider>
        <ion-item v-for="task in list.tasks">
          <CheckSquare v-if="task.checked" class="ion-color-success focusable" slot="start" @click="toggleTaskStatus(task)"/>
          <BoxSelect v-else class="ion-color-medium focusable" slot="start" @click="toggleTaskStatus(task)"/>
          <ion-label>
            {{ task.content }}
          </ion-label>
          <Trash2 class="ion-color-danger focusable" slot="end" @click="deleteTask(task._id)"/>
        </ion-item>
      </ion-list>
      <ion-list class="ion-border" inset v-if="tasklists.length == 0">
        <ion-item-divider>
          <ion-label style="margin-top: 8px; margin-bottom: 8px;" slot="start">
            <h2>Unordered</h2>
          </ion-label>
          <Plus class="focusable" @click="createModal(NewTaskModal, 'modalNewTask', refs, )" slot="end"/>
        </ion-item-divider>
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
import NewTaskModal from "@/components/NewTaskModal.vue";
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
      userTasklist: [] as DuleTasklist[],
      refs: refs
    }
  },
  mounted () {
    refs['page'] = this.$refs.page
    window.addEventListener('reload', () => {
      this.fetchTasks()
      this.fetchTasklist()
    })
  },
  created () {
    this.fetchTasks()
    this.fetchTasklist()
  },
  methods: {
    async fetchTasks() {
      const url = import.meta.env.VITE_API_URL + '/tasks'
      const tasks = await get(url)
      if (tasks) {
        this.tasklists = tasks.data
      }
    },
    async deleteTask(id: string) {
      const url = import.meta.env.VITE_API_URL + '/tasks/' + id
      await del(url)
      await this.fetchTasks()
    },
    async deleteTasklist(id: string) {
      const url = import.meta.env.VITE_API_URL + '/tasks/lists/' + id
      await del(url)
      await this.fetchTasks()
    },
    async toggleTaskStatus(task: DuleTask) {
      const url = import.meta.env.VITE_API_URL + '/tasks/' + task._id
      task.checked = !task.checked
      await patch(url, task)
      await this.fetchTasks()
    },
    async fetchTasklist() {
      const url = import.meta.env.VITE_API_URL + '/tasks/lists'
      const userTasklist = await get(url) as any & DuleTasklist[]
      if (userTasklist) {
        this.userTasklist = userTasklist.data
      }
    }
  }
}
</script>

