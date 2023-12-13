import { BrowserRouter,Routes,Route } from 'react-router-dom';

import { Productsview } from "./components/Productsview/Productsview.jsx";
import { SessionLogin } from './components/SessionLogin/SessionLogin.jsx';
import { SessionRegister } from './components/SessionRegister/SessionRegister.jsx';
import { SessionProfile } from './components/SessionProfile/SessionProfile.jsx';
import { NavigationSession } from './components/Navigationsession/Navigationsession.jsx';
import { Header } from './components/Header/Header.jsx';
import { ProductDetail } from './components/ProductDetail/ProductDetail.jsx';
import { CartorProducts } from './components/CartorProducts/CartorProducts.jsx';
import { Cart } from './components/Cart/Cart.jsx';
import { Checkout } from './components/Checkout/Checkout.jsx';
import { Tickets } from './components/Tickets/Tickets.jsx';

function App() {
  return (
    <BrowserRouter>
       {/*  <NavBar />  */}
       {/*  <ToastContainer /> */}
       {<Header />}
        <Routes> 
            {/* Session */}
            <Route path='/api/session' element={<NavigationSession/>}/> 
            <Route path='/api/session/login' element={<SessionLogin/>}/> 
            <Route path='/api/session/profile' element={<SessionProfile/>}/> 
            <Route path='/api/session/register' element={<SessionRegister/>}/> 

            {/* <Route path='/category/:category' element={<ItemListContainer/>}/>  */}
            {/* Productos */}
            <Route path='/api/products' element={<Productsview/>}/> 
            <Route path='/api/products/:id' element={<ProductDetail/>}/> 

            {/* Cart */}
            <Route path='/api/cart' element={<Cart />}/> 
            <Route path='/api/cart/:cid/product/:pid/cant/:b' element={<CartorProducts/>}/> 
            

            {/* Checkout */}
            <Route path='/api/checkout'element={<Checkout />}/>

            {/* Ticket */}
            <Route path='/api/tickets'element={<Tickets />}/>
            <Route path='*' element={<h1>404 Not Found</h1>}/> 

        </Routes>   
      </BrowserRouter>
  );
}

export default App;
