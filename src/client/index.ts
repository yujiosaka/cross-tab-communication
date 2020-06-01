import * as io from "socket.io-client";

const CHANNEL_NAME = 'demo';
const WORKER_LOCATION = 'worker.js';
const CHECK_INTERVAL = 200;

const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const broadcastChannelSendMessage: HTMLInputElement = document.querySelector('#broadcast-channel-send-message');
  const broadcastChannelSendButton: HTMLButtonElement = document.querySelector('#broadcast-channel-send-button');
  const broadcastChannelReceivedMessage: HTMLInputElement = document.querySelector('#broadcast-channel-received-message');

  const sharedWorkerSendMessage: HTMLInputElement = document.querySelector('#shared-worker-send-message');
  const sharedWorkerSendButton: HTMLButtonElement = document.querySelector('#shared-worker-send-button');
  const sharedWorkerReceivedMessage: HTMLInputElement = document.querySelector('#shared-worker-received-message');

  const localStorageSendMessage: HTMLInputElement = document.querySelector('#local-storage-send-message');
  const localStorageSendButton: HTMLButtonElement = document.querySelector('#local-storage-send-button');
  const localStorageReceivedMessage: HTMLInputElement = document.querySelector('#local-storage-received-message');

  const websocketSendMessage: HTMLInputElement = document.querySelector('#websocket-send-message');
  const websocketSendButton: HTMLButtonElement = document.querySelector('#websocket-send-button');
  const websocketReceivedMessage: HTMLInputElement = document.querySelector('#websocket-received-message');

  if (window.BroadcastChannel) {
    const channel = new window.BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (e) => {
      const message = e.data;
      broadcastChannelReceivedMessage.value = message;
    };
    broadcastChannelSendButton.addEventListener('click', e => {
      const message = broadcastChannelSendMessage.value;
      channel.postMessage(message);
    });
  }

  if (window.SharedWorker) {
    const worker = new window.SharedWorker(WORKER_LOCATION);
    worker.port.onmessage = (e) => {
      const message = e.data;
      sharedWorkerReceivedMessage.value = message;
    };
    sharedWorkerSendButton.addEventListener('click', e => {
      const message = sharedWorkerSendMessage.value;
      worker.port.postMessage(message);
    });
  }

  if (window.localStorage) {
    setInterval(() => {
      const message = window.localStorage.getItem(CHANNEL_NAME);
      if (message){
        localStorageReceivedMessage.value = message;
      }
    }, CHECK_INTERVAL);
    window.localStorage.removeItem(CHANNEL_NAME);
    localStorageSendButton.addEventListener('click', e => {
      const message = localStorageSendMessage.value;
      window.localStorage.setItem(CHANNEL_NAME, message);
    });
  }

  socket.on('connect', () => {
    socket.on('message', (message: string) => {
      websocketReceivedMessage.value = message;
    });
    websocketSendButton.addEventListener('click', e => {
      const message = websocketSendMessage.value;
      socket.emit('message', message);
    });
  });
});
