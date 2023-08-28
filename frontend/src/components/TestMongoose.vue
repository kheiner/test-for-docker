<script setup>
import axios from 'axios'

import { onMounted, ref } from 'vue'

const notes = ref([])
const PORT = `${import.meta.env.VITE_API_PORT}`
const NOTE_API = `http://localhost:${PORT}/notes`

const newNote = ref('')

async function submit() {
  const note = {
    note: newNote.value
  }
  const result = await axios.post(NOTE_API, note)
  console.log(result)
  getNotes()
  newNote.value = ''
}

async function getNotes() {
  const result = await axios.get(NOTE_API)
  notes.value = result.data
}


onMounted(async () => {
  const result = await axios.get(NOTE_API)
  notes.value = result.data
})
</script>

<template>
  <input type="text" v-model="newNote" @keyup.enter="submit()">


  <h1 class="green">Latest 5 Notes Posted</h1>
  <div v-for="note in notes" class="greetings">
    <h1 class="white"> - {{ note.note }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
