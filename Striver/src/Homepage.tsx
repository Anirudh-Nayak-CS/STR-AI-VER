
import { Navbarh} from "./Navbarh";
import {Sidebarh} from "./Sidebarh"
import { useAuth0 } from '@auth0/auth0-react'
import { Loading } from "./Loading"
import { Toaster } from "./components/ui/sonner";
export function Homepage() {
  const {isLoading,error}=useAuth0()
 return (
  <>
   {
        error && <p> Authentication error</p>
      }
      {
        !error && isLoading && <Loading/>
      }
       {
        !error && !isLoading &&  <>
        <Navbarh/>
<Sidebarh/>
  <Toaster/>
    </>
      }


  </>
 )


}

