"use client"
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AuthProvider } from './context/context';
import { ChatProvider } from './context/chatContext';



const Providers = ({ children }) => {
 
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};


export const AuthProviders=({children})=>{
return (<AuthProvider>
    {children}
</AuthProvider>)
}
export const ChatProviders=({children})=>{
 return (<ChatProvider>{children}</ChatProvider>)
}
export default Providers;
