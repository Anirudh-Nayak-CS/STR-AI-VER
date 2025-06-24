import { Button } from "./components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import dbms from './assets/dbms.webp'
import sd from './assets/systemdesign.png'
import oops from './assets/oops.jpeg'
import dsa from './assets/dsa.jpg'
export function Courses() {
  return (
    <>
   <div id="courses">
 <h2 className="text-4xl font-bold text-center text-black m-20">Learn today, lead tomorrow</h2> 
      
    <div className="grid m-[125px]  grid-cols-2 justify-evenly justify-items-center gap-16 ">
                 
    

      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>DSA Course</CardTitle>
       
      </CardHeader>
      <CardDescription>
        <img src={dsa} alt="dsaicon"   className="max-w-80 ml-8" />
      </CardDescription>
       <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Buy now @ Rs9999
        </Button>
        <Button variant="outline" className="w-full">
          Timeline
        </Button>
      </CardFooter>
    </Card>
    
       <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>OOPS Course</CardTitle>
       
      </CardHeader>
     <CardDescription>
        <img src={oops} alt="oopsicon" />
      </CardDescription>
       <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Buy now @ Rs3999
        </Button>
        <Button variant="outline" className="w-full">
          Timeline
        </Button>
      </CardFooter>
    </Card>
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>System Design Course</CardTitle>
       
      </CardHeader>
     <CardDescription>
        <img src={sd} alt="sdicon" />
      </CardDescription>
       <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Buy now @ Rs6999
        </Button>
        <Button variant="outline" className="w-full">
          Timeline
        </Button>
      </CardFooter>
    </Card>
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>DBMS Course</CardTitle>
       
      </CardHeader>
     <CardDescription>
        <img src={dbms} alt="dbmsicon"  className="max-w-80 ml-10"/>
      </CardDescription>
       <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Buy now @ Rs2999
        </Button>
        <Button variant="outline" className="w-full">
          Timeline
        </Button>
      </CardFooter>
    </Card>
   </div>
  
   </div>
    
    </>

  )
}
