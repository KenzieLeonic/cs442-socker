<template>
  <div class="mx-8">
    <button @click="sayHello()">
      Hello
    </button>
  </div>
</template>

<script>
import SocketioService from '@/services/socketio.js'
export default {
  created() {
    SocketioService.setupSocketConnection()
    SocketioService.getSocket().on('chatroom', this.listenChatroom)
  },
  beforeUnmount() {
    SocketioService.disconnect();
  },
  methods: {
    sayHello() {
      SocketioService.sendToServer('hello.message', {message: "Hello"})
    },
    listenChatroom(data) {
      console.log("LISTEN", data)
    }
  }
}
</script>