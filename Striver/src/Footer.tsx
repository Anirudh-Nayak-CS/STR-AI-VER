import bot from "./assets/logo.png" 

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-black p-8">
      
      <hr className="my-8 border-blue-gray-50" />
      <div color="blue-gray" className="text-center font-normal">
   <span>&copy; 2025 AlgoBuddy </span>  <img src={bot} alt="bot-logo" className="w-12 inline " />  
      </div>
    </footer>
  );
}