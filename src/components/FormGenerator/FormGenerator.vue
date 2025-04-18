<template>
  <form @submit.prevent="handleSubmit" class="form-generator">
    <div v-for="field in config.fields" :key="field.name" class="form-field">
      <label v-if="field.label" :for="field.name">{{ field.label }}</label>

      <slot :name="`field-${field.name}`" :field="field" :value="modelValue[field.name]">
        <component
            :is="getFieldComponent(field.type)"
            :field="field"
            v-model="modelValue[field.name]"
        />
      </slot>

      <div v-if="errors[field.name]" class="error-message">
        {{ errors[field.name] }}
      </div>
    </div>

    <div class="form-actions">
      <slot name="actions">
        <button type="submit" class="submit-button">
          {{ config.submitText || 'Submit' }}
        </button>
        <button type="button" @click="handleCancel" class="cancel-button">
          {{ config.cancelText || 'Cancel' }}
        </button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import FormInput from './FormInput.vue';
import FormSelect from './FormSelect.vue';
import FormCheckbox from './FormCheckbox.vue';
import FormTextarea from './FormTextarea.vue';

export default defineComponent({
  name: 'FormGenerator',
  components: {
    FormInput,
    FormSelect,
    FormCheckbox,
    FormTextarea,
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:modelValue', 'submit', 'cancel'],
  setup(props, { emit }) {
    const errors = ref<Record<string, string>>({});

    const getFieldComponent = (type: string) => {
      switch (type) {
        case 'input': return 'FormInput';
        case 'select': return 'FormSelect';
        case 'checkbox': return 'FormCheckbox';
        case 'textarea': return 'FormTextarea';
        default: return 'FormInput';
      }
    };

    const validateField = (field: any, value: any) => {
      if (field.required && !value) {
        return 'This field is required';
      }

      if (field.validation?.pattern && value && !field.validation.pattern.test(value)) {
        return field.validation.message || 'Invalid format';
      }

      return '';
    };

    const validateForm = () => {
      let isValid = true;
      const newErrors: Record<string, string> = {};

      props.config.fields.forEach((field: any) => {
        const error = validateField(field, props.modelValue[field.name]);
        if (error) {
          newErrors[field.name] = error;
          isValid = false;
        }
      });

      errors.value = newErrors;
      return isValid;
    };

    const handleSubmit = () => {
      if (validateForm()) {
        emit('submit', props.modelValue);
      }
    };

    const handleCancel = () => {
      emit('cancel');
    };

    watch(
        () => props.modelValue,
        (newValue) => {
          emit('update:modelValue', newValue);
        },
        { deep: true }
    );

    return {
      errors,
      getFieldComponent,
      handleSubmit,
      handleCancel,
    };
  },
});
</script>

<style lang="scss">
.form-generator {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .form-field {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 5px;
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 30px;

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;

      &.submit-button {
        background-color: #3498db;
        color: white;

        &:hover {
          background-color: #2980b9;
        }
      }

      &.cancel-button {
        background-color: #e0e0e0;
        color: #333;

        &:hover {
          background-color: #bdbdbd;
        }
      }
    }
  }
}
</style>