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
      <v-btn @click="cancelEditing">Cancel</v-btn> <v-btn @click="updateArticle">Confirm</v-btn>
    </div>
  </v-form>
</template>

<script setup>
import { reactive, defineEmits } from 'vue'
import axios from 'axios'

const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['cancel', 'save'])

const form = reactive({
  title: props.mode == 'edit' ? props.data.title : '',
  content: props.mode == 'edit' ? props.data.content : '',
  id: props.mode === 'edit' ? props.data.id : null,
})

/* function submitArticle() {
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
} */

async function updateArticle() {
  emit('save', article)
}
async function cancelEditing() {
  emit('cancel')
}
</script>
