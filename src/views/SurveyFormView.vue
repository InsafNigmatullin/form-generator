<template>
  <div class="survey-form-view">
    <h1>Форма опроса</h1>

    <FormGenerator
        :config="surveyFormConfig"
        :modelValue="formData"
        @update:modelValue="updateFormData"
        @submit="submitForm"
        @cancel="cancelForm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import FormGenerator from '@/components/FormGenerator/FormGenerator.vue';


export default defineComponent({
  name: 'SurveyFormView',
  components: {
    FormGenerator,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const formData = reactive({
      age: store.state.surveyForm.age,
      gender: store.state.surveyForm.gender,
      interests: [...store.state.surveyForm.interests] || [],
      feedback: store.state.surveyForm.feedback,
    });

    const surveyFormConfig: FormConfig = {
      submitText: 'Отправить опрос',
      cancelText: 'Отмена',
      fields: [
        {
          type: 'select',
          name: 'age',
          label: 'Ваш возраст',
          required: true,
          options: [
            { value: '', label: 'Выберите возраст', disabled: true },
            { value: '18-25', label: '18-25 лет' },
            { value: '26-35', label: '26-35 лет' },
            { value: '36-45', label: '36-45 лет' },
            { value: '46+', label: '46 лет и старше' },
          ],
        },
        {
          type: 'select',
          name: 'gender',
          label: 'Ваш пол',
          required: true,
          options: [
            { value: '', label: 'Выберите пол', disabled: true },
            { value: 'male', label: 'Мужской' },
            { value: 'female', label: 'Женский' },
            { value: 'other', label: 'Другой' },
          ],
        },
        {
          type: 'checkbox',
          name: 'interests',
          label: 'Ваши интересы (выберите несколько):',
          attrs: {
            multiple: true,
          },
          options: [
            { value: 'sports', label: 'Спорт' },
            { value: 'music', label: 'Музыка' },
            { value: 'movies', label: 'Кино' },
            { value: 'reading', label: 'Чтение' },
            { value: 'travel', label: 'Путешествия' },
            { value: 'cooking', label: 'Кулинария' },
            { value: 'photography', label: 'Фотография' }
          ],
        },
        {
          type: 'textarea',
          name: 'feedback',
          label: 'Ваши предложения',
          placeholder: 'Что мы можем улучшить?',
          attrs: {
            rows: 4,
          },
        },
      ],
    };

    const updateFormData = (newData: any) => {
      Object.assign(formData, newData);
    };

    const submitForm = async () => {
      try {
        await store.dispatch('submitSurveyForm', formData);
        alert('Спасибо за участие в опросе!');
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
      surveyFormConfig,
      updateFormData,
      submitForm,
      cancelForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.survey-form-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    color: #2c3e50;
    margin-bottom: 30px;
    text-align: center;
  }
}
</style>