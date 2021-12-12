import './Styles/App.css';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import useAuth from "./useAuth";
import Navbar from "./Components/Navbar";
import Home from './Pages/Home'
import History from './Pages/History'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Start from './Pages/Start'
import Profile from './Pages/Profile'
import { useState } from "react";
import BudgetApp from './Pages/BudgetApp'

function RequireAuth({ children }: any) {
  const { authed }: any = useAuth();
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default function App() {

  const [error, setError] = useState(false)
  const location = useLocation();

  //Check if server is working
  fetch("http://" + process.env.REACT_APP_IP + ":5000/")
    .then((response) => { response.json() },
      (error) => {
        if (error) {
          // setError(true)
        }
      })

  return (

    <>
      {error ? <h1> SERVER IS NOT WORKING </h1> :
        <div>
          <Navbar />
          <Routes>
            <Route path="/start" element={<Start />} />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/history"
              element={
                <RequireAuth>
                  <History />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/budget-app"
              element={
                <RequireAuth>
                  <BudgetApp />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="*"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      }
    </>
  );
}
