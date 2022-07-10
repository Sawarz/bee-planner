import { React, useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/shared/protectedRoute/ProtectedRoute';
import DesktopRouteWrapper from './components/desktop/desktopRouteWrapper/DesktopRouteWrapper';
import Login from './components/shared/login/Login';
import Register from './components/shared/register/Register';
import Dashboard from './components/desktop/dashboard/Dashboard';
import Calendar from './components/desktop/calendar/Calendar'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import loadTasksFromDB from './firebase/firebaseLoad';
import loadUsername from './firebase/usernameLoad';
import { addTask } from './redux/tasksSlice';
import { setUsername } from './redux/usernameSlice';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks)

  let timeout = () => {
    setTimeout(() => {
      navigate("/login", {replace: true})
    }, 500)
  };

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(auth, (user) => {
        if (user) {
          timeout = () => {
            return null
          };
          setLoggedIn(true);
          async function loadDBToRedux() {
            let usernameFromDB = await loadUsername();
            let tasksFromDB = await loadTasksFromDB();
            dispatch(setUsername(usernameFromDB));
            if (tasksFromDB) {
              tasksFromDB.forEach((taskDB) => {
                let taskLoaded = tasks.some((task) => {
                  return task.id === taskDB.id
                });
                if (taskLoaded === false) {
                  dispatch(addTask(taskDB))
                }
                
              })
              }
            }
        
          loadDBToRedux();
        } else {
          timeout = () => {
            setTimeout(() => {
              return <Navigate to="/login" replace />;
            }, 500)
          };
          setLoggedIn(false);
        }
      });
    return () => {
      unsubscribe();
    }
  }, [])
  
  
  

  return (
    <div className="App">
        <Routes>
          <Route path="/login" element={loggedIn ? <Navigate to="/" replace />: <Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute loggedIn={loggedIn} timeout={timeout}
              children={<DesktopRouteWrapper component={<Dashboard />} />}>
          </ProtectedRoute>} />
          <Route path="/calendar" element={
            <ProtectedRoute loggedIn={loggedIn} timeout={timeout}
              children={<DesktopRouteWrapper component={<Calendar />} />}>
          </ProtectedRoute>} />
          <Route path="/calendar/:day" element={
            <ProtectedRoute loggedIn={loggedIn} timeout={timeout}
              children={<DesktopRouteWrapper component={<Dashboard />} />}>
          </ProtectedRoute>}/>
        </Routes>
    </div>
  );
}

export default App;
