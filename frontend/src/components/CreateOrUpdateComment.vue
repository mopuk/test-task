<template>
  <div>
    <v-form
      @submit.prevent="submitComment"
      class="flex flex-col shrink-0 fixed left-1/2 top-1/2 -translate-1/2 w-120 h-fit p-4 bg-zinc-900 rounded-xl"
    >
      <v-textarea
        v-model="form.content"
        class="h-70"
        no-resize
        placeholder="Comment's content"
      ></v-textarea>
      <div class="flex justify-between">
        <v-btn type="button" @click="cancelEditing">Cancel</v-btn>
        <v-btn type="submit">Confirm</v-btn>
      </div>
    </v-form>
  </div>
</template>
<script setup>
import { reactive } from "vue";

const props = defineProps({
  comment: {
    type: Object,
    default: null,
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ["edit", "create"].includes(value),
  },
});

const emit = defineEmits(["cancel", "save"]);

const form = reactive({
  content: props.comment.content || "",
});

function submitComment() {
  if (props.mode === "create") {
    emit("save", {
      content: form.content,
    });
  } else {
    emit("save", {
      id: props.comment.id,
      content: form.content,
    });
  }
}

async function cancelEditing() {
  emit("cancel");
}
</script>
