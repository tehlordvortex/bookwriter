import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'welcome-view',
      component: require('@/components/WelcomeView').default
    },
    {
      path: '/create/book',
      name: 'create-book',
      component: require('@/components/CreateBook').default
    },
    {
      path: '/books',
      name: 'books',
      component: require('@/components/Books').default
    },
    {
      path: '/book/:bookId',
      name: 'book',
      component: require('@/components/BookInfoView').default,
      props: true
    },
    {
      path: '/book/:bookId/chapter/:mode/:chapterId?',
      name: 'add-chapter',
      component: require('@/components/ChapterView').default,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
router.beforeEach((to, from, next) => {
  store.commit('RESTORE_TITLE')
  store.commit('RESTORE_ACTIONS')
  return next()
})
export default router
