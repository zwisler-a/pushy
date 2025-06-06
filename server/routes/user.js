import express from "express";

import {getDb, SQL} from "../service/db.js";


const router = express.Router();

router.post('/register', async function (req, res, next) {
    if (!req.body.token) throw new Error('Token required!');
    if (!req.body.name) throw new Error('Device name required!');
    const db = await getDb();

    const existingDevice = await db.get(SQL.GET_DEVICE_BY_TOKEN, [req.body.token])
    if (existingDevice) return res.send({success: true})

    console.debug(`Registering ${req.body.name} - ${req.body.token}`)
    await db.run(SQL.ADD_DEVICE, [req.body.name, req.body.token]);
    const device = await db.get(SQL.GET_DEVICE_BY_TOKEN, [req.body.token])

    const subscriptions = await db.all(SQL.GET_SUBSCRIPTIONS_BY_DEVICE, [device.id])
    if (subscriptions.length === 0) {
        await db.run(SQL.ADD_SUBSCRIPTION, [device.id, '/'])
    }
    res.send({success: true})
});


router.get('/subscriptions', async function (req, res, next) {
    if (!req.query.token) throw new Error('Token required!');
    const db = await getDb();

    const existingDevice = await db.get(SQL.GET_DEVICE_BY_TOKEN, [req.query.token])
    if (!existingDevice) throw new Error('Unknown device! Please register first')

    const subs = await db.all(SQL.GET_SUBSCRIPTIONS_BY_DEVICE, [existingDevice.id])

    res.send(subs)
});

router.post('/subscribe', async function (req, res, next) {
    if (!req.body.token) throw new Error('Token required!');
    if (!req.body.topic) throw new Error('Topic required!');

    const db = await getDb();

    const existingDevice = await db.get(SQL.GET_DEVICE_BY_TOKEN, [req.body.token])
    if (!existingDevice) throw new Error('Unknown device! Please register first')

    await db.run(SQL.ADD_SUBSCRIPTION, [existingDevice.id, req.body.topic])

    res.send({success: true})
});

router.post('/unsubscribe', async function (req, res, next) {
    if (!req.body.token) throw new Error('Token required!');
    if (!req.body.topic) throw new Error('Topic required!');
    const db = await getDb();

    const existingDevice = await db.get(SQL.GET_DEVICE_BY_TOKEN, [req.body.token])
    if (!existingDevice) throw new Error('Unknown device! Please register first')

    await db.run(SQL.REMOVE_SUBSCRIPTION, [existingDevice.id, req.body.topic])

    res.send({success: true})
});


export default router;
