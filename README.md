# Pushy
A simple web application which integrates to FCM to send push notifications through rest api calls.

``` bash
curl -s 'https://<host>/admin/notify' -H 'Content-Type: application/json' -H "Authorization: Basic xxx" --data-raw '{"topic":"/","title":"test","body":"body"}'  
```

# Templates
Can use a "template" by specifying the "bodyTemplate" query parameter. (Uses javascript template string format). The values in the body will be used for substitution 
