import { Outlet } from 'react-router-dom'
import './App.css'
import { Hero } from './components/Hero/Hero'

function App() {

  return (
    <>
      <Hero />
      <Outlet />
      <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
