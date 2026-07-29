<template>
  <v-form
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
      <v-btn @click="cancelEditing">Cancel</v-btn> <v-btn @click="updateArticle">Confirm</v-btn>
    </div>
  </v-form>
</template>

<script setup>
import { reactive, defineEmits } from 'vue'

const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['cancel', 'save'])

const form = reactive({
  title: props.article.title || '',
  content: props.article.content || '',
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
  const newArticle = {
    id: props.article.id,
    title: form.title,
    content: form.content,
  }
  emit('save', newArticle)
}
async function cancelEditing() {
  emit('cancel')
}
</script>
