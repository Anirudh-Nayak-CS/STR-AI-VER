import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Navbars} from './Navbars'
import { HeroSection } from './HeroSection'
function App() {
  

  return (
    <>
        <Router>
         
           <Navbars/>
           <HeroSection/>
          </Router>
    </>
  )
}

export default App
