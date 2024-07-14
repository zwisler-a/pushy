const BASE_URL = "http://localhost:3000"

export async function setToken(token) {
    await fetch(BASE_URL + `/register`, {
        method: 'POST',
        body: JSON.stringify({token, name: 'test'}),
        headers: {'Content-Type': 'application/json'}
    })
}

export async function notify(topic, title, body, imageUrl) {
    return await fetch(BASE_URL + '/admin/notify', {
        method: 'post',
        body: JSON.stringify({
            topic,
            title,
            body,
            imageUrl
        }),
        headers: {'Content-Type': 'application/json'}
    })
}