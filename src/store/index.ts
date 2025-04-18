import { createStore } from 'vuex';

interface State {
    contactForm: {
        name: string;
        email: string;
        message: string;
        subscribe: boolean;
    };
    surveyForm: {
        age: string;
        gender: string;
        interests: string[];
        feedback: string;
    };
}

export default createStore<State>({
    state: {
        contactForm: {
            name: '',
            email: '',
            message: '',
            subscribe: false,
        },
        surveyForm: {
            age: '',
            gender: '',
            interests: [],
            feedback: '',
        },
    },
    mutations: {
        updateContactForm(state, payload) {
            state.contactForm = { ...state.contactForm, ...payload };
        },
        updateSurveyForm(state, payload) {
            state.surveyForm = { ...state.surveyForm, ...payload };
        },
        resetForms(state) {
            state.contactForm = {
                name: '',
                email: '',
                message: '',
                subscribe: false,
            };
            state.surveyForm = {
                age: '',
                gender: '',
                interests: [],
                feedback: '',
            };
        },
    },
    actions: {
        submitContactForm({ commit }, formData) {
            commit('updateContactForm', formData);
            return true;
        },
        submitSurveyForm({ commit }, formData) {
            commit('updateSurveyForm', formData);
            return true;
        },
        resetForms({ commit }) {
            commit('resetForms');
        },
    },
    getters: {
        getContactForm: (state) => state.contactForm,
        getSurveyForm: (state) => state.surveyForm,
    },
});