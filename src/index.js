import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./styles/theme";
import { EventType, PublicClientApplication } from '@azure/msal-browser';
import { BrowserRouter } from "react-router-dom";

import App from './App';
import { Message } from '@mui/icons-material';

const pca = new PublicClientApplication({
    auth:{
        clientId:"5145e092-ec32-4edc-bee7-7f8bfa0cb2b1",
        authority:"https://login.microsoftonline.com/common/",
        redirectUri:"http://localhost:3000/"
    }, 
    cache:{
        cacheLocation:"localStorage",
        storeAuthStateInCookie:"false",
    },
    system:{
        loggerOptions:{
            loggerCallback: (level, message, containsPII) =>{
                console.log(message)
            },
            logLevel: "Verbose",
        }
    }
});

pca.addEventCallback(event  =>{
    if(event.eventType === EventType.LOGIN_SUCCESS){
        console.log(event);
        pca.setActiveAccount(event.payload.account);
    
    }
});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App msalInstance={pca} />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
