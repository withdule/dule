interface DuleEvent {
    name: string,
    startsAt: string,
    endsAt: string,
    updatedAt: string
    displayStartsAt?: string
    displayEndsAt?: string
}

interface DuleNote {
    name: string,
    content: string,
    updatedAt: string
}

export type {
    DuleEvent,
    DuleNote
}
