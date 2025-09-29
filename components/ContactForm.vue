<script setup lang="ts">
import { reactive, ref, watch, nextTick, defineOptions } from 'vue'

// Pomenujeme komponent, aby sa nebil s názvom form interface
defineOptions({ name: 'ContactForm' })

// ✅ Premenované: nekoliduje s názvom komponentu
interface ContactFormData {
  name: string
  email: string
  message: string
}

const form = reactive<ContactFormData>({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)
const success = ref(false)

// Live validácia
watch(() => form.name, (val) => {
  errors.name = val.trim().length < 2 ? 'Zadaj aspoň 2 znaky.' : ''
})
watch(() => form.email, (val) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  errors.email = emailRegex.test(val) ? '' : 'Zadaj platný e-mail.'
})
watch(() => form.message, (val) => {
  errors.message = val.trim().length < 10 ? 'Správa musí mať aspoň 10 znakov.' : ''
})

const resetForm = async () => {
  form.name = ''
  form.email = ''
  form.message = ''
  await nextTick()
  errors.name = ''
  errors.email = ''
  errors.message = ''
}

const submitForm = async () => {
  loading.value = true
  success.value = false

  if (errors.name || errors.email || errors.message) {
    loading.value = false
    return
  }

  try {
    const res = await $fetch('/api/send-contact', {
      method: 'POST',
      body: { name: form.name, email: form.email, message: form.message }
    })

    if ((res as { success: boolean }).success) {
      success.value = true
      await resetForm()
    }
  } catch (err) {
    console.error('Chyba pri odosielaní:', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <!-- ✅ jediný root element -->
  <v-container class="my-12" fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" >
        <v-form aria-label="Kontaktný formulár" role="form" @submit.prevent="submitForm">
          <v-text-field
            v-model="form.name"
            label="Meno"
            placeholder="Tvoje meno"
            :error-messages="errors.name"
            required
            outlined
            class="mb-4"
            aria-label="Meno"
          />

          <v-text-field
            v-model="form.email"
            label="Email"
            placeholder="tvoj@email.com"
            :error-messages="errors.email"
            required
            type="email"
            outlined
            class="mb-4"
            aria-label="Emailová adresa"
            autocomplete="email"
            inputmode="email"
          />

          <v-textarea
            v-model="form.message"
            label="Správa"
            placeholder="Napíš svoju správu..."
            :error-messages="errors.message"
            rows="4"
            required
            outlined
            class="mb-4"
            aria-label="Správa"
          />

          <v-btn
            :loading="loading"
            color="secondary"
            class="mt-4"
            type="submit"
            aria-label="Odoslať správu"
          >
            Odoslať
          </v-btn>

          <v-alert
            v-if="success"
            type="success"
            class="mt-4"
            role="alert"
            aria-live="polite"
          >
            Správa bola úspešne odoslaná!
          </v-alert>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
