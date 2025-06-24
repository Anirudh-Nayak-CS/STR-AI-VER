import { Hourglass } from 'ldrs/react'
import 'ldrs/react/Hourglass.css'

export const  Loading=()=> {
  return (
    <>
    <div className='flex self-center justify-self-center mt-[30vh]'>
    <Hourglass
  size="240"
  bgOpacity="0.1"
  speed="1.75"
  color="blue" 
/>
</div>
    </>


  )
}

