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

    const onSendNotification = () => {
        notify('/', "Title", "Body")
    }

    return (
        <div className="App">
            <h1>Pushy</h1>
            <img className="logo" alt="Logo" src="./logo.webp"/>
        </div>
    );
}

export default App;
