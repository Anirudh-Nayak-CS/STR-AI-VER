import { useAuth0 } from "@auth0/auth0-react"
import {
  Card,  
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const ProfileInfo =() => {
   const {user,isAuthenticated}=useAuth0()
   return  (
      <>
       { isAuthenticated && (
      
    <Card className="max-w-[20rem]  text-center">
  <CardHeader >
    <div   className="flex justify-center items-center" >
    <Avatar className="w-24 h-24 ">
   
   
      <AvatarImage src={user?.picture} alt={user?.name} />
      <AvatarFallback> {user?.nickname}</AvatarFallback>
    </Avatar>
     </div>
  </CardHeader>
  <CardContent>
    <h2 className="text-2xl font-semibold">{user?.nickname || user?.name}</h2>
    <p className="text-gray-400  text-xl">{user?.email}</p>
  </CardContent>
</Card>
  )
}
 </>
      
        )}
     
 
