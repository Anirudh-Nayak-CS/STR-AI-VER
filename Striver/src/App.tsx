

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Landingpage } from "./Landingpage"
import { Homepage } from "./Homepage"


function App() {
  return (
   <>
   <Router>
   
   <Routes>
    <Route path="/" element={<Landingpage/>}/>
    <Route path="/home" element={<Homepage/>}/>
   </Routes>
   </Router>
   
   </>
   
   
  )
}
 
export default App