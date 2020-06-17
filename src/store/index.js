import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLogin: false, //用来显示是否登陆
        currentuser: {}, //用来显示用户信息是否显示
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
    },
    getters: {
        getIsLogin: state => state.isLogin,
        getCurrentuser: state => state.currentuser
    },
    mutations: {
        // 修改token，并将token存入localStorage
        changeLogin(state, user) {
            state.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);
        },
        //用来更改数据状态
        //更改用户的状态信息  如果用户信息没有则保存，如果有则进行清空
        userSatus(state, user) {
            if (user) {
                state.currentuser = user;
                state.isLogin = true
            } else {
                state.currentuser = null;
                state.isLogin = false
            }
        }
    },
    actions: { //应用mutations
        setUser({ commit }, user) {
            commit("userSatus", user);
        }
    }
});

export default store;