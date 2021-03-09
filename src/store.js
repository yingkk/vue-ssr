import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore(){
    return new Vuex.Store({
        state: {
            homeData:[],
            aboutData: []
        },
        mutations: {
            SET_HOME_DATA(state, payload){
               state.homeData = payload
            },
            SET_ABOUT_DATA(state, payload){
               state.aboutData = payload
            }
        },
        actions: {
            fetchHomeData({ commit }){
                const data = [1,2,3]
                commit('SET_HOME_DATA', data)
                console.log('home fetch')
            },
            fetchAboutData(){
                const data = [4,5,6]
                commit('SET_ABOUT_DATA', data)
                console.log('about fetch')
            }
        },
        
    })
}