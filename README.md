# Twitch Typescript Library (IN DEVELOPMENT)

This is a lightweight Typescript-based library designed to interface with the
Twitch API and EventSub via webhook. The library primarily focuses on types.

## API

Note: This library is still in development. Not all events or API calls
are supported.
Note: User authentication NOT supported. Only app authentication is supported.

### Send a chat message

Send a message to the given broadcaster's chat as the given sender. Make sure you
have the appropriate permissions to send messages.

```js
const myApiClient = apiClient({
    clientId: ..., // Your ID here.
    clientSecret: ..., // Your secret here.
})
await myApiClient.post('chat/messages', {
    broadcaster_id: '123456789', // Replace with the channel ID.
    sender_id: '123456789', // Replace with the bot's ID.
    message: 'Hello, world!',
})
```

### Subscribe to an EventSub event

Subscribe to the follow event for the given broadcaster. Make sure you have the
appropriate permissions to subscribe to events.

Note: Websocket events are NOT supported. Only webhook events are supported.

```js
const myApiClient = apiClient({
    clientId: ..., // Your ID here.
    clientSecret: ..., // Your secret here.
})
const users = await myApiClient.post('eventsub/subscriptions', {
    type: 'channel.follow',
    version: '1',
    condition: {
        broadcaster_user_id: '123456789', // Replace with the channel ID.
    },
    transport: {
        method: 'webhook',
        callback: 'https://my.securewebsite.com/eventsub', // Replace with your callback URL.
        secret: 'MySuperSecretValue', // Replace with your secret.
    },
})
```

### Get User(s)

Retrieves a user with the login name 'someaccount'.

```js
const myApiClient = apiClient({
    clientId: ..., // Your ID here.
    clientSecret: ..., // Your secret here.
})
const users = await myApiClient.get('users', { login: ['someaccount'] })
```

## EventSub

The library includes an EventSub client to easily set up notification and
revocation event handlers. Additionally, the library includes an Express
middleware to handle incoming EventSub events.

### Follow Example

Use the Express middleware to subscribe follow events.

```js
// Setup the EventSub client and listener for follow events.
const myEventClient = eventSubClient()
myEventClient.addNotificationEventListener('channel.follow', (notification) => {
    // Your action here...
})

// Setup the server and json middleware.
const app = express()
app.use(express.raw({type: 'application/json'}))

// Link the EventSub client as middleware.
app.use(getExpressMiddleware('MySuperSecretValue', myEventClient))

// Start the server on port 8000.
app.listen(8000, () => {})
```
