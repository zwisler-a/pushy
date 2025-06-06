import {useContext, useEffect, useState} from 'react'
import {FirebaseToken} from "../token-context.ts";
import {getSubscriptions, subscribeDevice, unsubscribeDevice} from "../service/api.ts";

function SubscriptionView() {
    const tokenContext = useContext(FirebaseToken)
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [topic, setTopic] = useState<string>("/");

    useEffect(() => {
        load();
    }, [tokenContext]);

    async function load() {
        if (!tokenContext.token) return;
        const subs = await getSubscriptions(tokenContext.token)
        setSubscriptions(subs);
    }

    async function unsubscribe(topic: string) {
        if (!tokenContext.token) return;
        await unsubscribeDevice(tokenContext.token, topic);
        await load();
    }

    const subscribe = async () => {
        if (!tokenContext.token) return;
        await subscribeDevice(tokenContext.token, topic);
        await load();
    }

    return (
        <>
            <h2>Subscriptions</h2>
            <div>
                {subscriptions.map((subscription) => <div key={subscription.topic} className={"row"}>
                    Topic: {subscription.topic}
                    <button onClick={() => unsubscribe(subscription.topic)}>Unsubscribe</button>
                </div>)}
            </div>
            <h2>Subscribe</h2>
            <div className="row">
                <input onChange={(e) => setTopic(e.target.value)} value={topic} type="text" autoFocus/>
                <button onClick={() => subscribe()}>Subscribe</button>
            </div>
        </>
    );
}

export default SubscriptionView
