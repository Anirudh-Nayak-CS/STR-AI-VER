import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Navbars} from './Navbars'
import { HeroSection } from './HeroSection'
import { MarqueeLanding} from './Marquee'
function App() {
  

  return (
    <>
        <Router>
         
           <Navbars/>
           <HeroSection/>
           <MarqueeLanding/>
           <br />
           <br /><br /><br /><br />
          </Router>
    </>
  )
}

export default App
