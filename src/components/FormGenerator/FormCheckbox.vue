<template>
  <div v-if="field.options" class="checkbox-group">

    <div v-for="option in field.options" :key="option.value" class="checkbox-item">
      <label class="checkbox-container">
        <input
            type="checkbox"
            :name="field.name"
            :value="option.value"
            :checked="isChecked(option.value)"
            @change="handleCheckboxChange(option.value)"
            :disabled="option.disabled"
            class="form-checkbox"
            v-bind="field.attrs"
        />
        <span class="checkmark"></span>
        <span class="checkbox-label">{{ option.label }}</span>
      </label>
    </div>
  </div>

  <label v-else class="checkbox-container">
    <input
        type="checkbox"
        :name="field.name"
        :checked="!!modelValue"
        @change="handleCheckboxChange(true)"
        class="form-checkbox"
        v-bind="field.attrs"
    />
    <span class="checkmark"></span>
    <span v-if="field.label" class="checkbox-label">{{ field.label }}</span>
  </label>
</template>

<script setup lang="ts">
interface Option {
  value: string | number | boolean; // Добавляем boolean
  label: string;
  disabled?: boolean;
}

interface Props {
  modelValue: (string | number)[] | boolean;
  field: {
    name: string;
    options?: Option[];
    label?: string;
    required?: boolean;
    attrs?: Record<string, any>;
  };
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const handleCheckboxChange = (optionValue: string | number | boolean) => {
  if (props.field.options) {
    const currentValue = Array.isArray(props.modelValue)
        ? [...props.modelValue]
        : [];

    if (typeof optionValue !== 'boolean') {
      const index = currentValue.indexOf(optionValue);
      if (index === -1) {
        currentValue.push(optionValue);
      } else {
        currentValue.splice(index, 1);
      }
      emit('update:modelValue', currentValue);
    }
  } else {
    emit('update:modelValue', !props.modelValue);
  }
};

const isChecked = (optionValue: string | number | boolean) => {
  if (Array.isArray(props.modelValue)) {
    // Утверждаем тип для includes
    return (props.modelValue as (string | number)[]).includes(optionValue as string | number);
  }
  return props.modelValue;
};
</script>



<style scoped lang="scss">
.checkbox-group {
  margin-bottom: 15px;

  .group-label {
    display: block;
    margin-bottom: 10px;
    font-weight: 500;
    color: #333;
  }

  .checkbox-item {
    margin-bottom: 8px;
  }
}

.checkbox-container {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
  padding-left: 30px;
  margin: 5px 0;

  .form-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:after {
      content: "";
      position: absolute;
      display: none;
      left: 7px;
      top: 3px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  .form-checkbox:checked ~ .checkmark {
    background-color: #3498db;

    &:after {
      display: block;
    }
  }

  .checkbox-label {
    margin-left: 10px;
  }
}
</style>