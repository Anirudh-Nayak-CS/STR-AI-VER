import { Label } from "./components/ui/label"
import { Textarea } from "./components/ui/textarea"
import { Button } from "./components/ui/button"
export function Textareah() {
  return (
    <>
    <div className="h-screen flex items-center justify-center">
 <div className="grid max-w-150 gap-4 justify-self-center">
      <Label htmlFor="message" className="text-bold text-2xl font-serif text-center justify-self-center">How can i help you?</Label>
      <Textarea placeholder="Type your message here." id="message" />
       <Button className="cursor-pointer">Send message</Button>
    </div>
    </div>
    
    </>
   
  )
}