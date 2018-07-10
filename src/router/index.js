import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Content from '@/page/content'
import Mine from '@/page/mine'
import SearchResult from '@/page/searchResult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      	path: '/',
      	component: Index
    },
    {
    		path: '/content/:id',
      	component: Content
    },
    {
        path: '/mine',
        component: Mine
    },
    {
        path: '/searchResult',
        component: SearchResult
    }
  ],
  mode:"history"
})
