import {useEffect, useState} from 'react'
import {requestNotificationPermission} from "./service/firebase.ts";
import {registerToken} from "./service/api.ts";
import {FirebaseToken} from "./token-context.ts";
import SubscriptionsView from "./components/subscriptions-view.tsx";
import SendNotificationView from "./components/send-notification-view.tsx";

function App() {
    const [token, setToken] = useState<undefined | string>(undefined);
    useEffect(() => {
        register();
    }, [])

    async function register() {
        const token = await requestNotificationPermission();
        if (!token) throw new Error("Token not found");
        await registerToken(token);
        setToken(token);
    }

    return (
        <FirebaseToken value={{
            token: token,
            valid: token !== undefined
        }}>
            <h1>Pushy</h1>
            <SubscriptionsView></SubscriptionsView>
            <SendNotificationView></SendNotificationView>
        </FirebaseToken>

    );
}

export default App
