import {LocalNotifications} from '@capacitor/local-notifications'
import {displayToast} from "@/functions/toasts";
import {Reminder, Reminders} from "@/functions/interfaces";

const Notifications = LocalNotifications

async function hasPermission() {
    return (await Notifications.checkPermissions()).display == 'granted'
}

async function checkAndAskPermission() {
    if (!await hasPermission()) {
        await Notifications.requestPermissions()
    }
}

function getReminders(): Reminders {
    return JSON.parse(localStorage.getItem('userReminders') || "{}")
}

function saveReminders(reminders: Reminders) {
    localStorage.setItem('userReminders', JSON.stringify(reminders))
}

async function deleteReminder(uid: string) {
    const reminders = getReminders()
    if (uid in reminders) {
        const toDelete = reminders[uid]
        delete reminders[uid]
        await Notifications.cancel({
            notifications: [
                {
                    id: toDelete.notificationDescriptor
                }
            ]
        })
    }
    saveReminders(reminders)
}

async function addReminder(ringsAt: Date | string, name: string) {
    await checkAndAskPermission()
    if (await hasPermission()) {
        const reminders = getReminders()
        const uid = `id${new Date().getTime()}`
        const notificationDescriptor = (await Notifications.schedule({
            notifications: [
                {
                    title: `Reminder '${name}'`,
                    body: `You have set the reminder '${name}' for ${ringsAt}`,
                    extra: {
                        id: uid
                    },
                    id: Math.random(),
                    schedule: {
                        at: new Date(ringsAt)
                    }
                }
            ]
        })).notifications[0].id
        reminders[uid] = {
            ringsAt: ringsAt,
            name: name,
            isReminder: true,
            notificationDescriptor: notificationDescriptor
        } as Reminder
        saveReminders(reminders)
    } else {
        await displayToast('Operation aborted', 'Reminder cannot be added because notifications permission cannot be acquired.', 4000, 'danger')
    }
}

export {
    addReminder,
    deleteReminder,
    getReminders
}

