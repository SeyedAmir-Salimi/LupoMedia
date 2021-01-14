import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { SocialMediaProvider } from './components/Context'
import 'bootstrap/dist/css/bootstrap.min.css'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ScrollIntoView from './components/ScrollIntoView'
JavascriptTimeAgo.addLocale(en)

ReactDOM.render(
  <SocialMediaProvider>
    <Router>
      <ScrollIntoView>
        <App />
      </ScrollIntoView>
    </Router>
  </SocialMediaProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
