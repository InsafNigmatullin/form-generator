import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import ContactFormView from './views/ContactFormView.vue';
import SurveyFormView from './views/SurveyFormView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactFormView,
    },
    {
        path: '/survey',
        name: 'survey',
        component: SurveyFormView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;