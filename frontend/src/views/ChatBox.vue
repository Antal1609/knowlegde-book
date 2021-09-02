<template>
    <div class="chat">
        <Chat />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chat from "@/components/chat/Chat.vue";

export default defineComponent({
    name: "ChatBox",
    components: {
        Chat
    }
});
</script>
