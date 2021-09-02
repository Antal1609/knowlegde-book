<template>
    <div class="row">
        <div class="col-md-6 offset-md-3 col-sm-12">
            <h1 class="text-center">Knowledge Cube</h1>
            <div>
                <input type="text" v-model="name" id="username" class="form-control" placeholder="Enter name">
                <div class="card">
                    <div class="card-body">
                        <ul>
                            <li v-for="(message, key) of messages" :key="key">
                                {{ message.name }}: {{ message.text }}
                            </li>
                        </ul>
                    </div>
                </div>
                <br>
                <textarea class="form-control" v-model="text"></textarea>
                <br>
                <button class="btn" @click.prevent="sendMessage">Send</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { io } from "socket.io-client";
import { server } from "@/helper";

interface Message {
    name: string
    text: string
}

export default defineComponent({
    name: "Chat",
    setup() {
        return {
            name: "",
            text: "",
            messages: ref<Message[]>([]),
            socket: io(server.baseURL + '/chat', {
                transports : ['websocket']
            })
        };
    },
    created() {
        this.socket.on("chatToClient", (message) => {
            this.receivedMessage(message);
        });
    },
    methods: {
        sendMessage() {
            if (this.validateInput()) {
                const message = {
                    name: this.name,
                    text: this.text
                };

                this.messages.push(message);
                this.socket.emit("chatToServer", message);
                this.text = "";
            }
        },
        receivedMessage(message: Message) {
            this.messages.push(message);
        },
        validateInput() {
            return this.name.length > 0 && this.text.length > 0;
        }
    }
});
</script>

<style lang="scss">

</style>
