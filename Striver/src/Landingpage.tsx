import { Features } from "./Features2";
import { HeroSection } from "./Herosection";
import Pricing from "./Pricing";
import { Testimonials } from "./Testimonials";
import {Footer} from "./Footer" 
import { Navbarl } from "./Navbarl";
export function Landingpage() {
  return (
    <>
     <Navbarl/>
     <HeroSection/>
     <Features/>
     <Pricing/>
     <Testimonials/>
     <Footer/>
    </>
  )
}