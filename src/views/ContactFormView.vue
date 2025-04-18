<template>
  <div class="contact-form-view">
    <h1>Контактная форма</h1>

    <FormGenerator
        :config="contactFormConfig"
        :modelValue="formData"
        @update:modelValue="updateFormData"
        @submit="submitForm"
        @cancel="cancelForm"
    >
      <template #field-email="{ field, value }">
        <div class="custom-email-field">
          <input
              :id="field.name"
              type="email"
              v-model="formData.email"
              :placeholder="field.placeholder"
              :required="field.required"
              class="custom-input"
          />
          <small>Мы никогда не передадим ваш email третьим лицам</small>
        </div>
      </template>
    </FormGenerator>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import FormGenerator from '@/components/FormGenerator/FormGenerator.vue';

export default {
  name: 'ContactFormView',
  components: {
    FormGenerator,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const formData = reactive({
      name: store.state.contactForm.name,
      email: store.state.contactForm.email,
      message: store.state.contactForm.message,
      subscribe: store.state.contactForm.subscribe,
    });

    const contactFormConfig = {
      submitText: 'Отправить сообщение',
      cancelText: 'Отмена',
      fields: [
        {
          type: 'input',
          name: 'name',
          label: 'Ваше имя',
          placeholder: 'Введите ваше имя',
          required: true,
        },
        {
          type: 'input',
          name: 'email',
          label: 'Email',
          placeholder: 'Введите ваш email',
          required: true,
          validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Пожалуйста, введите корректный email',
          },
        },
        {
          type: 'textarea',
          name: 'message',
          label: 'Сообщение',
          placeholder: 'Введите ваше сообщение',
          required: true,
          attrs: {
            rows: 5,
          },
        },
        {
          type: 'checkbox',
          name: 'subscribe',
          label: 'Подписаться на рассылку',
        },
      ],
    };

    const updateFormData = (newData) => {
      Object.assign(formData, newData);
    };

    const submitForm = async () => {
      try {
        await store.dispatch('submitContactForm', formData);
        alert('Форма успешно отправлена!');
        router.push('/');
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
      }
    };

    const cancelForm = () => {
      if (confirm('Вы уверены, что хотите отменить заполнение формы?')) {
        router.push('/');
      }
    };

    return {
      formData,
      contactFormConfig,
      updateFormData,
      submitForm,
      cancelForm,
    };
  },
};
</script>

<style scoped>
.contact-form-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    color: #2c3e50;
    margin-bottom: 30px;
    text-align: center;
  }

  .custom-email-field {
    .custom-input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      margin-top: 5px;
    }

    small {
      display: block;
      margin-top: 5px;
      color: #7f8c8d;
      font-size: 0.8rem;
    }
  }
}
</style>