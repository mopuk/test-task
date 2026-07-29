<template>
  <v-form
    class="flex flex-col shrink-0 absolute left-1/2 top-1/2 -translate-1/2 w-120 h-fit p-4 bg-zinc-900 rounded-xl"
  >
    <v-text-field
      v-model="form.title"
      placeholder="Enter title of the article"
      label="Title"
      type="text"
      clearable
    ></v-text-field>
    <v-textarea v-model="form.content" class="h-70" no-resize></v-textarea>
    <div class="flex justify-between">
      <v-btn>Cancel</v-btn> <v-btn @click="submitArticle">Confirm</v-btn>
    </div>
  </v-form>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: (value) => ['create', 'edit'].includes(value),
  },
  data: {
    type: Object,
    default: null,
  },
})

const initialData = mode === 'edit' ? props.data : null

const form = reactive({
  title: props.mode == 'edit' ? props.data.title : '',
  content: props.mode == 'edit' ? props.data.content : '',
  id: props.mode === 'edit' ? props.data.id : null,
})

function submitArticle() {
  if (props.mode === 'edit') {
    createArticle()
  } else {
    updateArticle()
  }
}
async function createArticle() {
  const article = {
    title: form.title,
    content: form.content,
  }
  const response = await createArticle(article)
}

async function updateArticle() {
  const newArticle = {
    title: form.title,
    content: form.content,
  }

  const response = await updateArticle(form.id, article)
}
</script>
