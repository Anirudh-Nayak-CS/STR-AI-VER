
import { Landingpage } from "./Landingpage"
import { Homepage } from "./Homepage"
import { Profile } from './Profile'
import { Savedquestion } from './Savedquestion'
import { Others } from './Others'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ThemeProvider } from "./components/ui/theme-provider"
  
 function App () {
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
   <Router>
   
   <Routes>
    <Route path="/" element={<Landingpage/>}/>
    <Route path="/home" element={<Homepage/>}/>
    <Route path="/profile" element={<Profile/>}/>
     <Route path="/saved" element={<Savedquestion/>}/>
      <Route path="*" element={<Others/>}/>
   </Routes>
   </Router>
   

   </ThemeProvider>
    </>
  )
 }
export default App
 
