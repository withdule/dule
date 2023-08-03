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
          <DuleFaceIcon slot="start" />
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
        Today
      </div>
      <ion-list inset>
        <ion-item>
          <CalendarClock slot="start" class="icon-icon ion-color-danger"/>
          <ion-label>
            <p>in 2 hours</p>
            <h2>Meeting with contributors</h2>
          </ion-label>
        </ion-item>
        <ion-item>
          <AlarmClock slot="start" class="icon-icon ion-color-danger"/>
          <ion-label>
            <p>in 3 hours</p>
            <h2>Turn on washing machine</h2>
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
        <ion-item button @click="createModal(NewTaskModal, 'modalNewTask', refs)">
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
</script>

<script lang="ts">
import { ref } from "vue";
import { createModal } from "@/functions/modals";
import {getAccount} from "@/functions/fetch/account";

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
})

export default {
  data () {
    return {
      loggedIn: false,
      refs: refs,
      user: {
        fullname: "",
        email: "",
        createdAt: ""
      }
    }
  },
  mounted() {
    refs['page'] = this.$refs.page
    if (localStorage.getItem('userToken') && localStorage.getItem('userCredentials')) {
      this.loggedIn = true
      getAccount().then(user => this.user = user)
    }
  },
  methods: {
    open(url: string) {
      window.open(url)
    },
    goTo(href: string) {
      this.$router.push(href)
    },
    createModal
  },
}
</script>
