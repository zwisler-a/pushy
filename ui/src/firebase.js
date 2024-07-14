import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from "firebase/messaging";


export const app = initializeApp({
    apiKey: "AIzaSyASTP04kG7HvpQrKHyl5Eil0P244AyFCB4",
    authDomain: "pushy-e4f65.firebaseapp.com",
    projectId: "pushy-e4f65",
    storageBucket: "pushy-e4f65.appspot.com",
    messagingSenderId: "787549263818",
    appId: "1:787549263818:web:ed157fb7d59a5bed4aa133"
});

const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
    alert(JSON.stringify(payload))
});

export async function requestNotificationPermission() {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
        const token = getToken(messaging, {vapidKey: "BHN6TU0aCWp4lkcczwGaYFwNEaf0UDbBfWk8_1i48UDBa999cnNNY8VCTRZI3-ZLlCrppQVm0-hFjE_AEhMRVrc"});
        if (!token) throw new Error('No Notification token ...')
        return token;
    }
}