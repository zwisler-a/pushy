export async function registerToken(token: string) {
    await fetch(`/api/register`, {
        method: 'POST',
        body: JSON.stringify({token, name: 'test'}),
        headers: {'Content-Type': 'application/json'}
    })
}

export async function getSubscriptions(token: string) {
    return await fetch(`/api/subscriptions?token=${token}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
}

export async function subscribeDevice(token: string, topic: string) {
    await fetch(`/api/subscribe`, {
        method: 'POST',
        body: JSON.stringify({token, topic}),
        headers: {'Content-Type': 'application/json'}
    })
}

export async function unsubscribeDevice(token: string, topic: string) {
    await fetch(`/api/unsubscribe`, {
        method: 'POST',
        body: JSON.stringify({token, topic}),
        headers: {'Content-Type': 'application/json'}
    })
}

export async function notify(topic: string, title: string, body: string) {
    await fetch(`/api/admin/notify`, {
        method: 'POST',
        body: JSON.stringify({topic, title, body}),
        headers: {'Content-Type': 'application/json'}
    })
}