const BASE_URL = "http://localhost:3000"

export async function setToken(token) {
    await fetch(BASE_URL + `/register`, {
        method: 'POST',
        body: JSON.stringify({token, name: 'test'}),
        headers: {'Content-Type': 'application/json'}
    })
}