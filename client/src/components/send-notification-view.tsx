import {notify} from "../service/api.ts";

function SendNotificationView() {
    const send = async (event: any) => {
        const formData = new FormData(event.currentTarget);
        const topic = formData.get("topic") as string;
        const title = formData.get("title") as string;
        const body = formData.get("body") as string;
        const imageUrl = formData.get("imageUrl") as string;
        const iconUrl = formData.get("iconUrl") as string;
        event.preventDefault();
        setTimeout(() => {
            notify(topic, title, body, imageUrl, iconUrl);
        }, 1000)
    }

    return <form onSubmit={(ev) => send(ev)} className="form">
        <h2>Send Notification</h2>
        <input name="topic" placeholder="Topic"/>
        <input name="title" placeholder="Title"/>
        <input name="body" placeholder="Body"/>
        <input name="imageUrl" placeholder="ImageUrl"/>
        <input name="iconUrl" placeholder="IconUrl"/>
        <button>Send</button>
    </form>
}

export default SendNotificationView
