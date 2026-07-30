<template>
    <v-form
        @submit.prevent="submitArticle"
        class="flex flex-col shrink-0 fixed left-1/2 top-1/2 -translate-1/2 w-120 h-fit p-4 bg-zinc-900 rounded-xl"
    >
        <v-text-field
            v-model="form.title"
            placeholder="Enter title of the article"
            label="Title"
            type="text"
            clearable
        ></v-text-field>
        <v-textarea
            v-model="form.content"
            class="h-70"
            no-resize
            placeholder="Article's content"
        ></v-textarea>
        <div class="flex justify-between">
            <v-btn type="button" @click="cancelEditing">Cancel</v-btn>
            <v-btn type="submit">Confirm</v-btn>
        </div>
    </v-form>
</template>

<script setup>
import { reactive, defineEmits } from "vue";

const props = defineProps({
    article: {
        type: Object,
        default: null,
    },
    mode: {
        type: String,
        required: true,
        validator: (value) => ["edit", "create"].includes(value),
    },
});
console.log(props);
const emit = defineEmits(["cancel", "save"]);

const form = reactive({
    title: props.article.title || "",
    content: props.article.content || "",
});

function submitArticle() {
    if (props.mode === "create") {
        emit("save", {
            title: form.title,
            content: form.content,
        });
    } else {
        emit("save", {
            id: props.article.id,
            title: form.title,
            content: form.content,
        });
    }
}

async function cancelEditing() {
    emit("cancel");
}
</script>
