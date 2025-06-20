
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";




export function Navbarh() {
  const {loginWithRedirect,isAuthenticated,logout } = useAuth0();
 

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      onClick={() => loginWithRedirect()}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Log In
    </button>
  )}
</div>
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
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    
    </div>
  );
}