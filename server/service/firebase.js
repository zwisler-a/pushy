import admin from "firebase-admin";
import * as fs from "fs";
import {getMessaging} from "firebase-admin/messaging";


var serviceAccount = JSON.parse(fs.readFileSync(process.env['FCM_KEY_PATH'] ?? './key.json').toString());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const messaging = getMessaging()