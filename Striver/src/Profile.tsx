import { useAuth0 } from '@auth0/auth0-react'
import { Navbarp } from './Navbarp'
import { Lamp } from './Lamp'
import { Loading } from './Loading'

export const Profile=()=> {
const {isLoading,error}=useAuth0()
return(
  <>
    {
      error && <p> Authentication error</p>
    }
    {
      !error && isLoading && <Loading/>
    }
     {
      !error && !isLoading &&  <>
      <Navbarp/>
  <Lamp/>
  </>
    }
   
  </>

)

}