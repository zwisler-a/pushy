import express from "express";
import {messaging} from "../service/firebase.js";
import {getDb, SQL} from "../service/db.js";

const router = express.Router();

router.post('/notify', async function (req, res, next) {

    if (!req.body.topic) throw new Error('Topic required!');
    if (!req.body.title) throw new Error('Title required!');
    if (!req.body.body) throw new Error('Body required!');

    const db = await getDb();
    const tokens = await db.all(SQL.GET_TOKENS_BY_SUBSCRIPTION, [req.body.topic])
    console.log(`Sending to ${tokens.length} devices!`)

    const promises = tokens.map(token => messaging.send({
        token: token.token,
        data: {
            title: req.body.title,
            body: req.body.body
        }
    }).catch(err => {
    }))
    await Promise.all(promises)
    res.send({success: true});
});

router.get('/devices', async function (req, res, next) {
    const db = await getDb();
    const devices = await db.all(SQL.GET_ALL_DEVICES)
    res.send(devices);
});

router.get('/subscriptions', async function (req, res, next) {
    const db = await getDb();
    const subs = await db.all(SQL.GET_SUBSCRIPTIONS)
    res.send(subs);
});

export default router;
