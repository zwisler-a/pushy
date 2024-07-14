import './App.css';
import {useEffect} from "react";
import {requestNotificationPermission} from "./firebase";
import {notify, setToken} from "./api";

function App() {
    useEffect(() => {

        register();

    }, [])

    async function register() {
        const token = await requestNotificationPermission();
        await setToken(token)
    }

    return (
        <div className="App">
            <img className="logo" alt="Logo" src="./logo.webp"/>
            <h1>Pushy</h1>
        </div>
    );
}

export default App;
