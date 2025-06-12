<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

interface Props {
  modelValue: string;
  status?: number;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue', 'validation']);

const inputValue = ref(props.modelValue);
const isFocused = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const errorStr = ref('');

const hasValue = computed(() => props.modelValue.length > 0);

const statusIcon = computed(() => {
  switch (props.status) {
    case 1: // LOADING
      return '/images/form/loading.svg';
    case 2: // SUCCESS
      return '/images/form/success.svg';
    case 3: // ERROR
      return '/images/form/error.svg';
    default:
      return '';
  }
});

const showStatusIcon = computed(
  () => props.status !== undefined && props.status !== 0,
);

const validate = () => {
  validateInput();
};

const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) return t('common.error.emailRequired');
  if (!emailRegex.test(value)) return t('common.error.emailInvalid');
  return true;
};

const validateInput = () => {
  const result = validateEmail(inputValue.value);
  if (typeof result === 'string') {
    errorStr.value = result;
    emit('validation', false);
  } else {
    errorStr.value = '';
    emit('validation', true);
  }
};

const handleFocus = () => {
  isFocused.value = true;
  errorStr.value = '';
};

const handleBlur = () => {
  isFocused.value = false;
  validateInput();
};

watch(inputValue, (value) => {
  emit('update:modelValue', value);
  validateInput();
});

// Expose the validate method to parent components
defineExpose({
  validate,
});
</script>

<template>
  <div>
    <div class="input-wrapper">
      <label
        class="input-label"
        :class="{ 'is-active': isFocused || hasValue }"
      >
        <span class="input-label__font">{{ $t('common.form.email') }}</span>
      </label>

      <div class="input-container">
        <input
          ref="inputRef"
          v-model="inputValue"
          type="email"
          class="input-field input-field__font"
          :class="{
            'is-focused': isFocused,
            'has-error': errorStr,
          }"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <img
          v-if="showStatusIcon"
          :src="statusIcon"
          class="status-icon"
          :class="{ 'is-loading': props.status === 1 }"
          alt="status"
        />
      </div>
    </div>
    <span v-if="errorStr" class="error-message">{{ errorStr }}</span>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.status-icon {
  position: absolute;
  right: em(13);
  width: em(20);
  height: em(20);
  pointer-events: none;

  &.is-loading {
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.input-field {
  width: 100%;
  transition: all 0.2s ease;
  background: transparent;

  &__font {
    color: $color-black;
    font-size: em(18);
    font-weight: $font-weight-regular;

    @include media-breakpoint-down(sm) {
      font-size: em(16);
    }
  }
}

.input-wrapper .has-error {
  border-color: $color-red-700 !important;
}

.input-wrapper .is-focused {
  border-color: #3b82f6;
}

.input-label {
  position: absolute;
  left: em(13);
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s ease;
  pointer-events: none;
  background: white;
  padding: 0 em(4);
  color: $color-grey-500;
  z-index: 1;

  &__font {
    font-size: em(18);
    font-weight: $font-weight-regular;

    @include media-breakpoint-down(sm) {
      font-size: em(16);
    }
  }
}

.input-label.is-active {
  top: 0;
  transform: translateY(-50%) scale(0.67);
  color: $color-black;
}

.error-message {
  color: $color-red-700;
  font-size: em(14);

  @include media-breakpoint-down(sm) {
    font-size: em(14);
  }
}
</style>
