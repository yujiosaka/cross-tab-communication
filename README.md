# cross-tab-communication
Demo for cross tab communication

![cross-tab-communication-demo](https://user-images.githubusercontent.com/2261067/83458582-b911e580-a49d-11ea-8320-d120cc496654.gif)

## Instruction

1. Start server

```sh
$ git clone git@github.com:yujiosaka/cross-tab-communication.git
$ npm run build
$ npm run start
```

2. Open http://localhost:8080 in multiple tabs

## Comparison

|                   | Broadcast Channel | Shared Worker | LocalStorage | WebSocket (SocketIO) |
|:-----------------:|:-----------------:|:-------------:|:------------:|:--------------------:|
| Code simplicity   | ◎                 | ○             | ○            | ○                    |
| Server load       | ◎                 | ◎             | ◎            | △                    |
| Client load       | ◎                 | ◎             | △            | ○                    |
| Chrome            | 54                | 4             | 4            | 10.13                |
| Edge              | <=79              | 79            | 12           | ? (working)          |
| Firefox           | 38                | 29            | 3.5          | 10.11                |
| Internet Explorer | ×                 | ×             | 8            | 7                    |
| Opera             | 41                | 10.6          | 10.5         | ? (working)          |
| Safari            | ×                 | ×             | 4            | 10.13                |

## Resources

- [Broadcast Channel](https://developer.mozilla.org/docs/Web/API/Broadcast_Channel_API)
- [SharedWorker](https://developer.mozilla.org/docs/Web/API/SharedWorker)
- [LocalStorage](https://developer.mozilla.org/docs/Web/API/Window/localStorage)
- [SocketIO](https://socket.io/docs/server-api/)
