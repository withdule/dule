interface DuleEvent {
    name: string
    startsAt: string
    endsAt: string
    updatedAt: string
    displayStartsAt?: string
    displayEndsAt?: string
    id?: string
}

interface DuleNote {
    name: string
    content: string
    updatedAt: string
    id?: string
}

interface DuleTask {
    tasklist: string
    content: string
    updatedAt: string
    checked: boolean
    id?: string
}

interface DuleTasklist {
    name: string
    tasks: DuleTask[]
    id?: string
}

export type {
    DuleEvent,
    DuleNote,
    DuleTask,
    DuleTasklist
}
