<template>
  <ion-page ref="page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Resume</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-if="loggedIn">
      <ion-list inset>
        <ion-item>
          <DuleFaceIconDark v-if="darkTheme" slot="start" />
          <DuleFaceIcon v-else slot="start" />
          <ion-label>
            <h2>Hello, <span>{{ user.fullname }}</span></h2>
            <p>What are you doing today ?</p>
          </ion-label>
          <ion-button fill="clear" slot="end" @click="createModal(UserModal, 'modalUser', refs)">
            <MoreVertical slot="icon-only" />
          </ion-button>
        </ion-item>
      </ion-list>
      <div class="list-title">
        Incoming
      </div>
      <ion-list inset>
        <ion-item v-for="event in incomingEvents">
          <AlarmClock v-if="event.isReminder" slot="start" class="icon-icon ion-color-danger"/>
          <CalendarClock v-else slot="start" class="icon-icon ion-color-danger"/>
          <ion-label>
            <p>{{ event.label }}</p>
            <h2>{{ event.name }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <div class="list-title">
        Recently edited
      </div>
      <ion-list inset>
        <ion-item button>
          <ClipboardList slot="start" class="icon-icon ion-color-tertiary"/>
          <ion-label>
            <p>Tasks</p>
            <h2>1 / 2</h2>
            <ion-progress-bar color="tertiary" :value="1 / 2"></ion-progress-bar>
          </ion-label>
        </ion-item>
        <ion-item button>
          <ClipboardList slot="start" class="icon-icon ion-color-warning"/>
          <ion-label>
            <p>Release Dule</p>
            <h2>0 / 2</h2>
            <ion-progress-bar color="warning" :value="0 / 2"></ion-progress-bar>
          </ion-label>
        </ion-item>
        <ion-item button>
          <StickyNote slot="start" class="icon-icon"/>
          <ion-label>
            <p>Note</p>
            <h2>Films to watch</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <div class="list-title">
        Schedule
      </div>
      <ion-list inset>
        <ion-item button @click="createModal(NewEventModal, 'modalNewEvent', refs)">
          <CalendarPlus slot="start" class="icon-icon"/>
          <ion-label>
            <p>Event</p>
            <h2>Create an event</h2>
          </ion-label>
        </ion-item>
        <ion-item button @click="createModal(NewReminderModal, 'modalNewReminder', refs)">
          <AlarmPlus slot="start" class="icon-icon"/>
          <ion-label>
            <p>Reminder</p>
            <h2>Create a reminder</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <div class="list-title">
        Note
      </div>
      <ion-list inset>
        <ion-item button @click="createModal(NewNoteModal, 'modalNewNote', refs)">
          <PenLine slot="start" class="icon-icon"/>
          <ion-label>
            <p>Start writing</p>
            <h2>Create an new note</h2>
          </ion-label>
        </ion-item>
        <ion-item button @click="goTo('/dash/notes')">
          <Glasses slot="start" class="icon-icon"/>
          <ion-label>
            <p>Read</p>
            <h2>View notes</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <div class="list-title">
        Tasks
      </div>
      <ion-list inset>
        <ion-item button @click="createModal(NewTaskModal, 'modalNewTask', refs, { userTasklist })">
          <CheckCircle2 slot="start" class="icon-icon"/>
          <ion-label>
            <p>Plan your day tasks</p>
            <h2>Write a new task</h2>
          </ion-label>
        </ion-item>
        <ion-item button @click="createModal(NewTaskListModal, 'modalNewTasklist', refs)">
          <ListPlus slot="start" class="icon-icon"/>
          <ion-label>
            <p>Start a new objective</p>
            <h2>Create a new tasklist</h2>
          </ion-label>
        </ion-item>
        <ion-item button @click="goTo('/dash/tasks')">
          <Glasses slot="start" class="icon-icon"/>
          <ion-label>
            <p>Work</p>
            <h2>View tasklists</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <div class="list-title">
        Informations
      </div>
      <ion-list inset>
        <ion-item button @click="createModal(InfoModal, 'modalInfo', refs)">
          <Info slot="start" class="icon-icon"/>
          <ion-label>
            <p>Understand Dule</p>
            <h2>Informations</h2>
          </ion-label>
        </ion-item>
        <ion-item button @click="open('https://github.com/withdule/dule')">
          <Github slot="start" class="icon-icon"/>
          <ion-label>
            <p>Star us on github !</p>
            <h2>Github</h2>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-content v-else :fullscreen="true">
      <ion-list inset>
        <ion-item>
          <AlertTriangle class="icon ion-color-warning" slot="start" />
          <ion-label class="ion-text-wrap">
            <h2>Your are not logged in</h2>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-list inset>
        <ion-item button @click="createModal(LoginModal, 'modalLogin', refs)">
          <LogIn class="ion-icon ion-color-success" slot="start"/>
          <ion-label class="ion-text-wrap">
            <h2>Login</h2>
          </ion-label>
        </ion-item>
        <ion-item button @click="createModal(RegisterModal, 'modalRegister', refs)">
          <UserPlus class="ion-icon" slot="start"/>
          <ion-label class="ion-text-wrap">
            <h2>Create an account</h2>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import '@/theme/globals.css'
import { IonPage, IonHeader, IonToolbar, IonContent, IonTitle, IonList, IonLabel, IonButton, IonProgressBar, IonItem } from '@ionic/vue';
import { MoreVertical, AlertTriangle, LogIn, UserPlus, ClipboardList, CalendarPlus, AlarmPlus, Glasses, ListPlus, PenLine, CalendarClock, AlarmClock, CheckCircle2, Info, Github, StickyNote } from "lucide-vue-next";
import LoginModal from "@/components/LoginModal.vue";
import RegisterModal from "@/components/RegisterModal.vue";
import DuleFaceIcon from "@/components/DuleFaceIcon.vue";
import InfoModal from "@/components/InfoModal.vue";
import NewEventModal from "@/components/NewEventModal.vue";
import NewReminderModal from "@/components/NewReminderModal.vue";
import NewNoteModal from "@/components/NewNoteModal.vue";
import NewTaskModal from "@/components/NewTaskModal.vue";
import NewTaskListModal from "@/components/NewTaskListModal.vue";
import UserModal from "@/components/UserModal.vue";
import DuleFaceIconDark from "@/components/DuleFaceIconDark.vue";
</script>

<script lang="ts">
import { ref } from "vue";
import { createModal } from "@/functions/modals";
import {getAccount} from "@/functions/fetch/account";
import {get} from "@/functions/fetch/tools";
import {DuleEvent, DuleTasklist} from "@/functions/interfaces";

let refs = {
  modalLogin: ref(null),
  modalRegister: ref(null),
  modalInfo: ref(null),
  modalNewNote: ref(null),
  modalNewTask: ref(null),
  modalNewTasklist: ref(null),
  modalNewEvent: ref(null),
  modalNewReminder: ref(null),
  modalUser: ref(null)
} as any

window.addEventListener('closeModals', () => {
  Object.keys(refs).forEach(key => {
    if (refs[key].value) refs[key].value.dismiss()
  })
  window.dispatchEvent(new Event('reloadUser'))
})

export default {
  data () {
    return {
      loggedIn: false,
      refs: refs,
      darkTheme: false,
      user: {
        fullname: "",
        email: "",
        createdAt: ""
      },
      userTasklist: [],
      incomingEvents: [] as DuleEvent[]
    }
  },
  mounted() {
    window.addEventListener('reloadUser', this.refreshAccount)
    refs['page'] = this.$refs.page
    if (localStorage.getItem('userToken') && localStorage.getItem('userCredentials')) {
      this.loggedIn = true
      getAccount().then(user => this.user = user)
      this.fetchTasklist()
      this.fetchIncomingEvents()
      this.darkTheme = this.isDarkTheme()
    }
  },
  methods: {
    open(url: string) {
      window.open(url)
    },
    goTo(href: string) {
      this.$router.push(href)
    },
    refreshAccount() {
      getAccount().then(user => this.user = user)
      this.darkTheme = this.isDarkTheme()
    },
    async fetchTasklist() {
      const url = import.meta.env.VITE_API_URL + '/tasks/lists'
      const userTasklist = await get(url) as any & DuleTasklist[]
      if (userTasklist) {
        this.userTasklist = userTasklist.data
      }
    },
    async fetchIncomingEvents() {
      const url = import.meta.env.VITE_API_URL + '/activity/incoming'
      const response = await get(url)
      const incomingEventsParsed = []
      if (response) {
        const incomingEvents = response.data
        const now = new Date()
        for (const event of incomingEvents) {
          const eventStart = new Date(event.startsAt)
          const hours = Math.floor(Math.abs(eventStart - now) / 36e5)
          const minutes = Math.ceil(Math.abs(eventStart - now) / 60000)
          event.label = `in ${hours < 1 ? minutes: hours} ${hours < 1 ? 'minutes': 'hours'}`
          incomingEventsParsed.push(event)
        }
        this.incomingEvents = incomingEventsParsed
      }
    },
    isDarkTheme() {
      return localStorage.getItem('userAppearance') === 'dark'
    },
    createModal
  },
}
</script>
