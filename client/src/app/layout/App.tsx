import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
import ServerError from '../api/errors/ServerError';
import NotFound from '../api/errors/NotFound';
import BasketPage from '../../features/basket/BasketPage';
//import { useStoreContext } from '../api/context/StoreContext';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import LoadingComponent from './loadingComponent';
import CheckoutPage from '../../features/checkout/CheckoutPage';
import { useAppDispatch } from '../store/configureStore';
import { setBasket } from '../../features/basket/basketSlice';

function App() {
  //const {setBasket} = useStoreContext();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then((basket: any) => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    } else {
      // We don't need to show the loading if we don't have buyerId
      setLoading(false);
    }
  }, [dispatch])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message='Initialising app...' />

  return (
    //this is jsx
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' theme='colored' hideProgressBar />
      {/* Use this Material UI component to get away of the padding that the browser lives arround */}
      <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      {/* Container is a material ui component */}
      <Container>
        {/* The Switch makes any of this component exclusive. They can be downlod only one time */}
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/catalog' component={Catalog} />
          <Route path='/catalog/:id' component={ProductDetails} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/server-error' component={ServerError} />
          <Route path='/basket' component={BasketPage} />
          <Route path='/checkout' component={CheckoutPage} />
          {/* If any of the above match I need to return this component */}
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
