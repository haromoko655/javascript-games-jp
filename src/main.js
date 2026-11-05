import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from './router.js'

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash }
      return { top: 0 }
    }
  },
  ({ router, isClient }) => {
    // Track page views on route change
    if (isClient) {
      router.afterEach((to) => {
        // Send page view to Google Analytics
        if (typeof gtag !== 'undefined') {
          gtag('config', 'G-BH3P7R68Z6', {
            page_path: to.fullPath
          })
        }
      })
    }
  }
)
