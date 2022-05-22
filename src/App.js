import { React, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/shared/protectedRoute/ProtectedRoute';
import DesktopRouteWrapper from './components/desktop/desktopRouteWrapper/DesktopRouteWrapper';
import Login from './components/shared/login/Login';
import Register from './components/shared/register/Register';
import Dashboard from './components/desktop/dashboard/Dashboard';
import { Provider } from 'react-redux';
import store from './redux/Store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  let timeout = () => {
    setTimeout(() => {
      navigate("/login", {replace: true})
    }, 500)
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      timeout = () => {
        return null
      };
      setLoggedIn(true);
    } else {
      timeout = () => {
        setTimeout(() => {
          return <Navigate to="/login" replace />;
        }, 500)
      };
      setLoggedIn(false);
    }
  });

  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={loggedIn ? <Navigate to="/" replace />: <Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute loggedIn={loggedIn} timeout={timeout}
              children={<DesktopRouteWrapper component={<Dashboard />} />}>
          </ProtectedRoute>}/>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
