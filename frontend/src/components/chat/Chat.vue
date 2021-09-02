<template>
    <div class="row">
        <div class="col-md-6 offset-md-3 col-sm-12">
            <h1 class="text-center">Knowledge Cube</h1>
            <div class="form-group">
                <label for="name">Name</label>
                <input id="name" type="text" v-model="name" class="form-control" placeholder="Enter name">
            </div>
            <div class="form-group">
                <label for="text">Message</label>
                <textarea id="text" class="form-control" v-model="text"></textarea>
            </div>
            <button class="btn btn-outline-secondary" @click="sendMessage" :disabled="!isValid">Send</button>
        </div>
        <div class="col-md-6 offset-md-3 col-sm-12 mt-4">
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(message, key) of messages" :key="key">
                    <span class="text-muted">{{ message.time.format('DD/MM/YY HH:mm') }}</span> {{ message.name }}: {{ message.text }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { io } from "socket.io-client";
import { server } from "@/helper";
import dayjs from "dayjs";

interface Message {
    name: string
    text: string
    time: dayjs.Dayjs
}

export default defineComponent({
    name: "Chat",
    setup() {
        const name = ref('');
        const text = ref('');

        const isValid = computed(() => name.value.length > 0 && text.value.length > 0);

        return {
            name,
            text,
            isValid,
            messages: ref<Message[]>([]),
            socket: io(server.baseURL + '/chat', {
                transports : ['websocket']
            })
        };
    },
    created() {
        this.socket.on("chatToClient", (message) => {
            message.time = dayjs();
            this.receivedMessage(message);
        });
    },
    methods: {
        sendMessage() {
            if (this.isValid) {
                const message = {
                    name: this.name,
                    text: this.text,
                    time: dayjs()
                };

                this.messages.push(message);
                this.socket.emit("chatToServer", message);
                this.text = "";
            }
        },
        receivedMessage(message: Message) {
            this.messages.push(message);
        }
    }
});
</script>

<style lang="scss">

</style>
