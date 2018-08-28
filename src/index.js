import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// render our app in the BrowserRouter 
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))
