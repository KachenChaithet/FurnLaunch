import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BrowseTheRange from './components/Landing/BrowseTheRange'
import Footer from './components/Landing/Footer'
import FuniroFurniture from './components/Landing/FuniroFurniture'
import Hero from './components/Landing/Hero'
import OurProducts from './components/Landing/OurProducts'
import RoomsInspiration from './components/Landing/RoomsInspiration'
import Cart from './components/page/CartPage'
import CheckoutPage from './components/page/CheckoutPage'
import ContactPage from './components/page/ContactPage'
import DetailProductPage from './components/page/DetailProductPage'
import Landingpage from './components/page/Landingpage'
import ShopPage from './components/page/ShopPage'
import './index.css'
import { useLocation } from "react-router-dom";
import { useEffect } from 'react'
import CardShowLandingPage from './components/Card/CardShowLandingPage'
import ProductManager from './components/page/AddProductPage'
import { useProducts } from './components/useProducts '
import ProductComparisonPage from './components/page/ProductComparisonPage'
import Layout from './components/Layout/LayoutCard'
import ShowOrder from './components/page/ShowOrder'

function App() {

  return (
    <>


      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Landingpage />} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/detailproduct/:id' element={<DetailProductPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/comparison' element={<ProductComparisonPage />} />
          </Route>
            <Route path='/addproduct' element={<ProductManager />} />
            <Route path='/order' element={<ShowOrder />} />
        </Routes>

      </BrowserRouter>
      {/* <CheckoutPage /> */}
    </>
  )
}

export default App

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
