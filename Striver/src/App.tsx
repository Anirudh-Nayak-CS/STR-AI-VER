
 import {Navbarl} from "./Navbarl"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Homepage } from "./Homepage"


function App() {
  return (
   <>
   <Router>
   <Navbarl/>
   <Routes>
    <Route path="/" element={<Homepage/>}/>
   
   </Routes>
   </Router>
   
   </>
   
   
  )
}
 
export default App