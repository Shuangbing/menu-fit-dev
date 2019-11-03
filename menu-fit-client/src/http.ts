import axios from 'axios'
import Vue from 'vue'
import router from './router'
import { Dialog } from 'mand-mobile'

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '',
})

http.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
})

http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Dialog.alert({
            title: 'エラー',
            content: err.response.data.message,
            confirmText: 'はい',
        });
    }
    if (err.response.status === 401) router.push('/auth/login')


    return Promise.reject(err)
})

export default http