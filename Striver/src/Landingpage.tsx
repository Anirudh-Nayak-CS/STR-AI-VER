import { Features } from "./Features2";
import { HeroSection } from "./Herosection";
import Pricing from "./Pricing";
import { Testimonials } from "./Testimonials";
import {Footer} from "./Footer" 
import { Navbarl } from "./Navbarl";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "./Loading"


export function Landingpage() {
  const {isLoading,error}=useAuth0()
  return (
    <>
       {(error) && <p>Error rendering the page</p>}
    {!error && isLoading && <Loading/>}
      {!error && !isLoading && 
      <>
        <Navbarl/>
   
     <HeroSection/>
     <Features/>
     <Pricing/>
     <Testimonials/>
     <Footer/>
      </>
}
    </>
  )
}