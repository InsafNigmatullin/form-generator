<template>
  <input
      :id="field.name"
      :type="field.attrs?.type || 'text'"
      :placeholder="field.placeholder"
      :required="field.required"
      v-model="value"
      v-bind="field.attrs"
      class="form-input"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { FormField } from './types';

export default defineComponent({
  name: 'FormInput',
  props: {
    field: {
      type: Object as PropType<FormField>,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val),
    });

    return { value };
  },
});
</script>

<style lang="scss">
.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
}
</style>