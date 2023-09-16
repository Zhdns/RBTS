
import AppHeader from '../AppHeader/AppHeader'
import {useEffect, useCallback } from 'react';
import { getData } from '../../services/appSlice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage'
import PrivateRoute from '../PriveteRoute';
import IngredientsDetails from '../IngredientsDetails/IngredientsDetails';
import RegistrationPage from '../../pages/RegistrationPages';
import ProfilePage from '../../pages/ProfilePage'
import ForgotPasswordPage from '../../pages/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage';
import LoginPage from '../../pages/LoginPage';
import FeedPage from '../../pages/FeedPage/FeedPage';
import ProfileFeedPage from '../../pages/ProfileFeedPage/ProfileFeedPage';
import OrderDetailsPage from '../../pages/OrderDetailPage/OrderDetailPage';
import { useDispatch, useSelector } from '../../index';
import { wsConnecting, wsDisconnected } from '../../services/middlewareReducer'
import { TOKEN } from '../../utility/constants'



type IsLogin = { 
  isLogin: {
      isLogin: boolean;
      user: {
          name: string | '' ; 
          email: string | '' ;
      }
      resetPasswordState: boolean;
      isModal: boolean;
      error: any;
  }
}


function App() {

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin.isLogin);
  const resetPass = useSelector((state) => state.isLogin.resetPasswordState)
  const location = useLocation()
  const background = location.state && location.state.background
  const pathname: string = location.pathname
  

  useEffect(() => {
    if (pathname.startsWith('/feed')) {
        dispatch(wsDisconnected())
        dispatch(wsConnecting('wss://norma.nomoreparties.space/orders/all'))
    }
    else if (pathname.startsWith('/profile/orders/')) {
        let token: string | null = localStorage.getItem(TOKEN)
        if (token === null) {
        } else {
            token = token.replace('Bearer ', '')
            const url = `wss://norma.nomoreparties.space/orders?token=${token}`
            dispatch(wsDisconnected())
            dispatch(wsConnecting(url))
        }
    }
    else {
        dispatch(wsDisconnected())
    }
}, [pathname])

  
  
    useEffect(() => {
      dispatch(getData())
    }, [dispatch])

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
      {/* <BrowserRouter> */}
      <AppHeader/>
      <Routes location={background || location}>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={
        <PrivateRoute condition={!isLogin} redirectTo='/'>
          <LoginPage/>
        </PrivateRoute>
        }/>
        <Route path='/register' element={
        <PrivateRoute condition={!isLogin} redirectTo='/profile'>
          <RegistrationPage/>
        </PrivateRoute>
        }/>
        <Route path='/password-reset' element={
        <PrivateRoute condition={!isLogin} redirectTo='/profile'>
          <ForgotPasswordPage/>
        </PrivateRoute>
        }/>
        <Route path='/password-reset/reset' element={
        <PrivateRoute condition={resetPass} redirectTo='/profile'>
          <ResetPasswordPage/>
        </PrivateRoute>
        }/>
        <Route path='/profile' element={
            <PrivateRoute condition={isLogin} redirectTo='/login'>
              <ProfilePage/>
            </PrivateRoute>
          }/>
          <Route path='/profile/orders' element={
            <PrivateRoute condition={isLogin} redirectTo='/login'>
              <ProfileFeedPage/>
            </PrivateRoute>
          }/>
          <Route path='/profile/orders/:id' element={
            <PrivateRoute condition={isLogin} redirectTo='/login'>
              <OrderDetailsPage/>
            </PrivateRoute>
          }/>
          <Route path='/ingredients/:id' element={<IngredientsDetails/>} />
          {background && <Route path='/ingredients/:id' element={<HomePage/>} />}
          <Route path='/feed' element={<FeedPage/>}/>
          <Route path='/feed/:id' element={<OrderDetailsPage/>}/>
          {background && <Route path='/feed/:id' element={<FeedPage/>} />}
      </Routes>
      {/* </BrowserRouter> */}
      </DndProvider>
    </div>
  );
}

export default App;
