
  import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Markdown from 'react-markdown'
import  supabase  from "./utils/supabase.ts"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import {Button} from "./components/ui/button"
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'


export function QnA() {
   const {user}=useAuth0()
   const [data,setData]=useState<Array<{ question: string|undefined; solution: string|undefined }>>([])

   useEffect(()=> {
    if(!user?.sub) return
    const getSaved=async ()=> {

    let {data:Userdata,error:Usererror}=await supabase.from('users').select('user_id').eq('id',user?.sub).single()
      if (!Userdata) {
  console.log("Userdata not found");
  return;
}
     else if(Usererror)
        console.log(Usererror)
  let uid=Userdata?.user_id

   
  const {data:Data,error}=await supabase.from('saved_questions').select('question,solution').eq('user_id',uid).not('question','is','null').not('solution','is','null')
  
    if(Data){
  
    setData(Data)
}
  else {
    console.log(error)
  }
   
    }
    getSaved()
  },[user,data])
 
const handleDelete=async (solution:string|undefined)=> {
  await supabase.from('saved_questions').delete().eq('solution',solution)

  setData(data => data.filter((el)=> el.solution!==solution))
}


  return (
    <>
 <div className="flex max-w-[75vw] ml-[12.5vw] justify-center">
     <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
     
       {data?.map((el,x)=> (
            <AccordionItem key={x} value={`item-${x}`}>
        <AccordionTrigger>{el?.question}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance whitespace-pre-wrap">
          <div className="overflow-x-auto ">
           <Markdown remarkPlugins={[remarkGfm]}
    children={el?.solution}
    components={{
      code(props) {
        const {children, className, node, ...rest} = props
        const match = /language-(\w+)/.exec(className || '')
        return match ? (
          <SyntaxHighlighter
            {...rest}
            PreTag="div"
            children={String(children).replace(/\n$/, '')}
            language={match[1]}
            style={dark}
          />
        ) : (
          <code {...rest} className={className}>
            {children}
          </code>
        )
      }
    }}
  /> 
      
          </div>
      
        </AccordionContent>
        <Button className="mb-2" onClick={()=>handleDelete(el?.solution)}>Delete</Button>
      </AccordionItem>)
       )}
    
   
    </Accordion>
  

 </div>
   
    </>
    
  )
}

