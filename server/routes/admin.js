import express from "express";
import {messaging} from "../service/firebase.js";
import {getDb, SQL} from "../service/db.js";

const router = express.Router();

router.post('/notify', async function (req, res, next) {

    const topic = req.body.topic || req.query.topic || '/'
    const title = req.body.title || req.query.title || 'Notification'
    const body = req.body.body || req.query.body || 'No Body available'

    const db = await getDb();
    const tokens = await db.all(SQL.GET_TOKENS_BY_SUBSCRIPTION, [topic])
    console.log(`Sending to ${tokens.length} devices!`)

    const promises = tokens.map(token => messaging.send({
        token: token.token,
        notification: {
            title: title,
            body: body
        },

    }).catch(err => {
    }))
    await Promise.all(promises)
    res.send({success: true});
});

router.post('/notify-template', async function (req, res, next) {

    const topic = req.body.topic || req.query.topic || '/'
    const bodyTemplate = req.body.bodyTemplate || req.query.bodyTemplate || 'No Body'
    const titleTemplate = req.body.titleTemplate || req.query.titleTemplate || 'No Title'

    try {
        function substituteValues(template, context) {
            return new Function(...Object.keys(context), `return \`${template}\`;`)(...Object.values(context));
        }

        const title = substituteValues(titleTemplate, req.body);
        const body = substituteValues(bodyTemplate, req.body);
        console.log('Title Template:', titleTemplate)
        console.log('Title Template:', bodyTemplate)
        console.log('Available Body:', req.body)

        const db = await getDb();
        const tokens = await db.all(SQL.GET_TOKENS_BY_SUBSCRIPTION, [topic])
        console.log(`Sending to ${tokens.length} devices!`)

        const promises = tokens.map(token => messaging.send({
            token: token.token,
            notification: {
                title,
                body: body
            }
        }).catch(err => {
        }))
        await Promise.all(promises)
        res.send({success: true});
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }


});

router.get('/devices', async function (req, res, next) {
    const db = await getDb();
    const devices = await db.all(SQL.GET_ALL_DEVICES)
    res.send(devices);
});

router.get('/device/:id', async function (req, res, next) {
    const db = await getDb();
    const device = await db.get(SQL.GET_DEVICE_BY_ID, [req.params.id])
    res.send(device);
});

router.get('/subscriptions', async function (req, res, next) {
    const db = await getDb();
    const subs = await db.all(SQL.GET_SUBSCRIPTIONS)
    res.send(subs);
});

export default router;
