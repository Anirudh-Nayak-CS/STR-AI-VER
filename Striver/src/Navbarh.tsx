
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useEffect,useState } from "react";
import { ModeToggle } from "./Mode-toggle";
import { useAuth0 } from "@auth0/auth0-react";
import  supabase  from "./utils/supabase";

export function Navbarh() {
  const {loginWithRedirect,isAuthenticated,logout,user} = useAuth0();
 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
useEffect(()=> {
if(isAuthenticated && user) {
  const putData=async () => {
  console.log(user)
  const {data,error}=await supabase.from('users').upsert([{Email:user?.email,Username:user?.nickname ||user?.name ,id:user.sub}])
  if(error) 
    console.log(error)
  else
  console.log(data)
  }
putData()
}
  
},[])


  return (
    <div className="relative w-full">
      <Navbar>
       
        <NavBody>
          <NavbarLogo />
         
 
<div className="ml-auto flex items-center gap-4 z-50 cursor-pointer">
  {isAuthenticated ? (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className="px-4 py-2 bg-red-600 text-white rounded"
    >
      Log Out
    </button>
  ) : (
    <button
      onClick={async () => await loginWithRedirect()} 
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Log In
    </button>
  )}
</div>
 
  <ModeToggle />

        </NavBody>

      
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
      
              {
          isAuthenticated ? <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>: <button onClick={() => loginWithRedirect()}>Log In</button>
         }
         <ModeToggle/>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    
    </div>
  );
}