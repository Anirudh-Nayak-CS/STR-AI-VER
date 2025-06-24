import { useAuth0 } from "@auth0/auth0-react"
import { Navbars } from "./Navbars"
import { QnA } from "./QnA"
import { Loading } from "./Loading"

export const Savedquestion=()=> {
   const {isLoading,error}=useAuth0()
 
 return( <>
    {(error) && <p>Error rendering the page</p>}
    {!error && isLoading && <Loading/>}
     {!error && !isLoading && 
     <>
     <Navbars/>
        <QnA/>
        </>
        }
        
   </>)

}