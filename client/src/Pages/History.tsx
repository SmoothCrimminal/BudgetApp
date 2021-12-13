import { useEffect, useState } from 'react'

export default function History() {

    const login = localStorage.getItem("login");
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch("http://" + process.env.REACT_APP_IP + ":5000/Users/" + login)
            .then((response) => response.json(),
                (error) => {
                    if (error) {
                        console.log(error)
                    }
                })
        // .then((data) => {setUser(data)});
    }, [login]);

    const load = <div className="animated-background-history"></div>

    const loadingHistory = () => {
        const result = []
        for (let i = 1; i < 10; i++) {
            result.push(<div key={i}>{load}</div>)
        }
        return result
    }

    return (
        <>
            {history.length > 1 ? <>
                <h1>PROFILE {login}</h1>
            </> : <>
                <h1>HISTORY:</h1>
                {loadingHistory()}
            </>}
        </>
    )
}