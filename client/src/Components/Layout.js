import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from '../Pages/Login/Login'
import App from '../Pages/App'
import Home from '../Pages/Home'
import Register from '../Pages/Login/Register'
import Profile from '../Pages/Profile'
import { useState } from "react";


function Layout() {

    let token = localStorage.getItem("token");
    const [error,setError] = useState(false)
    fetch("http://192.168.1.25:5000/")
        .then((response) => { response.json() },
            (error) => {
                if (error) {
                    console.log("a")
                    setError(true)
                    console.log(error)
                }
            })

    return (
        <>
            {error ? <h1> SERWER NIE DZIALA </h1> :

                <div className="App">
                    <Router>
                        {token ? (
                            <Routes>
                                <Route exact path="/" element={<Home />} />
                                <Route exact path="app" element={<App />} />
                                <Route exact path="profile" element={<Profile />} />
                                <Route path="*" element={<Home />} />
                            </Routes>
                        ) : (
                            <Routes>
                                <Route exact path="register" element={<Register />} />
                                <Route path="*" element={<Login />} />
                            </Routes>
                        )}
                    </Router>

                </div>
            }

        </>
    );
}

export default Layout;