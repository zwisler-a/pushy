importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyASTP04kG7HvpQrKHyl5Eil0P244AyFCB4",
    authDomain: "pushy-e4f65.firebaseapp.com",
    projectId: "pushy-e4f65",
    storageBucket: "pushy-e4f65.appspot.com",
    messagingSenderId: "787549263818",
    appId: "1:787549263818:web:ed157fb7d59a5bed4aa133"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    // Customize notification here
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: './logo.webp'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});