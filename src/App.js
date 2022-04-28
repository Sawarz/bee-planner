import './App.css';
import { Routes, Route } from 'react-router-dom';
import DesktopRouteWrapper from './components/desktop/desktopRouteWrapper/DesktopRouteWrapper';
import Dashboard from './components/desktop/dashboard/Dashboard';
import { Provider } from 'react-redux';
import Store from './redux/Store';

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <Routes>
          <Route path="/" element={<DesktopRouteWrapper component={<Dashboard />}></DesktopRouteWrapper>}></Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
