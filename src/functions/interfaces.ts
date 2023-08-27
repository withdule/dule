interface DuleEvent {
    name: string,
    startsAt: string,
    endsAt: string,
    updatedAt: string
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
