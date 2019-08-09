import { writable } from "svelte/store";

export const display = writable({
    home: true,
    dashboard: false,
    login: false,
    registration: false
}) 

export const user = writable({
    status: 'anon',
    token: null,
    data: {}
})

export const todos = writable([])