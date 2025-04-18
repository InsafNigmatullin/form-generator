<template>
  <select
      :id="field.name"
      v-model="value"
      :multiple="field.multiple"
      :required="field.required"
      class="form-select"
      v-bind="field.attrs"
  >
    <option
        v-if="field.placeholder"
        value=""
        disabled
        selected
    >
      {{ field.placeholder }}
    </option>
    <option
        v-for="option in field.options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface Props {
  modelValue: string | number | Array<string | number>;
  field: {
    name: string;
    options: Option[];
    placeholder?: string;
    required?: boolean;
    multiple?: boolean;
    attrs?: Record<string, any>;
  };
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

<style scoped lang="scss">
.form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1em;

  &:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }

  &[multiple] {
    background-image: none;
    padding: 8px;
    min-height: 100px;

    option {
      padding: 8px;
      margin: 2px 0;
      border-radius: 2px;
      background-color: #f5f5f5;

      &:checked {
        background-color: #3498db;
        color: white;
      }
    }
  }
}
</style>