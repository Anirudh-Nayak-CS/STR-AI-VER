import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

const audience = import.meta.env.VITE_AUTH0_AUDIENCE
const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const uri=import.meta.env.VITE_REDIRECT_URI
if (import.meta.env.DEV) {
  console.log({ domain, clientId, audience, uri });
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
 <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri:uri,
       audience: audience,
   scope: "openid profile email",
       prompt:"consent"
    }}
  cacheLocation="localstorage" 
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>
)