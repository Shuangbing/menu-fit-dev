import { response } from "express"

export default function ({ $axios, redirect, store }) {
    $axios.onRequest(config => {
        store.commit('updateLoading', true)
    })

    $axios.onResponse(response => {
        store.commit('updateLoading', false)
    })

    $axios.onError(error => {
        store.commit('updateLoading', false)
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })
}