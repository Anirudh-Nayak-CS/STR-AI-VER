import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Navbars} from './Navbars'
import { HeroSection } from './HeroSection'
import { MarqueeLanding} from './Marquee'
import {Courses} from './Courses'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {
  

  return (
    <>
        <Router>
       
           <Navbars/>
           
           <HeroSection/>
           <MarqueeLanding/>
           <Courses/>
       
             <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
          </Router>
    </>
  )
}

export default App
