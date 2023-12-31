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
        <DuleFaceIconDark v-if="darkTheme" slot="start" />
        <DuleFaceIcon v-else slot="start" />
        <ion-label>
          <h2><span>{{ user.fullname }}</span></h2>
          <p>{{ user.email }}</p>
        </ion-label>
        <Cog class="focusable" slot="end" @click="createModal(SettingsModal, 'modalSettings', refs, { email: user.email, fullname: user.fullname })"/>
      </ion-item>
      <ion-item>
        <ion-label slot="start">
          <p>Registered since</p>
        </ion-label>
        <ion-label slot="end">
          <h2>{{ user.createdAt }}</h2>
        </ion-label>
      </ion-item>
      <ion-item button @click="disconnectAccount()">
        <LogOut slot="start" class="ion-icon ion-color-danger"/>
        <ion-label>
          <p>Logout</p>
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
          <h2>{{ stats.tasksCompleted }} / {{ stats.tasks }}</h2>
          <ion-progress-bar :value="stats.tasksCompleted / stats.tasks"></ion-progress-bar>
        </ion-label>
      </ion-item>
      <ion-item>
        <BookMarked slot="start" class="icon-icon ion-color-tertiary"/>
        <ion-label>
          <p>Notes taken</p>
          <h2>{{ stats.notes }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <CalendarCheck slot="start" class="icon-icon ion-color-tertiary"/>
        <ion-label>
          <p>Event scheduled</p>
          <h2>{{ stats.events }}</h2>
        </ion-label>
      </ion-item>
    </ion-list>
    <ion-note style="display: block; width: max-content; margin: auto" v-if="isMobile">
      Using {{ app.name }} version {{ app.version }}, build {{ app.build }}
    </ion-note>
  </ion-content>
</template>

<script setup lang="ts">
import {IonTitle} from "@ionic/vue";
import {BookMarked, CalendarCheck, CheckSquare, Cog, LogOut, XCircle} from "lucide-vue-next";
import DuleFaceIcon from "@/components/DuleFaceIcon.vue";
import DuleFaceIconDark from "@/components/DuleFaceIconDark.vue";
import {createModal} from "@/functions/modals"
import SettingsModal from "@/components/SettingsModal.vue";
</script>

<script lang="ts">
import {closeModals} from "@/functions/modals";
import {getAccount, logOut} from "@/functions/fetch/account";
import {ref} from "vue";
import {get} from "@/functions/fetch/tools";
import {APIResponse} from "@/functions/fetch/interfaces";
import {Device} from "@capacitor/device";
import {App} from "@capacitor/app";
import {AppInfo} from "@capacitor/app/dist/esm/definitions";

let refs = {
  modalSettings: ref(null)
} as any

window.addEventListener('closeModalsDeep1', () => {
  Object.keys(refs).forEach(key => {
    if (refs[key].value) refs[key].value.dismiss()
  })
})

export default {
  data () {
    return {
      user: {
        fullname: "",
        email: "",
        createdAt: "",
      },
      stats: {
        notes: 0,
        events: 0,
        tasks: 0,
        tasksCompleted: 0
      } as any & APIResponse,
      refs: refs,
      darkTheme: false,
      app: {} as AppInfo,
      isMobile: false
    }
  },
  mounted () {
    refs['page'] = this.$el
  },
  created () {
    getAccount().then(user => this.user = user)
    this.darkTheme = this.isDarkTheme()
    this.fetchStats()
    this.getAppInfo()
    this.getIsMobile()
  },
  methods: {
    closeModals,
    disconnectAccount() {
      logOut()
      location.reload()
    },
    isDarkTheme() {
      return localStorage.getItem('userAppearance') === 'dark'
    },
    async fetchStats() {
      const url = import.meta.env.VITE_API_URL + '/me/stats'
      const response = await get(url)
      this.stats = response.data
    },
    async getIsMobile() {
      this.isMobile = ['ios', 'android'].includes((await Device.getInfo()).platform)
    },
    async getAppInfo() {
      this.app = await App.getInfo()
    }
  }
}
</script>
