<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
  modelValue: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue', 'validation']);

const inputValue = ref(props.modelValue);
const isFocused = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const errorStr = ref('');

const hasValue = computed(() => props.modelValue.length > 0);

const validate = () => {
  validateInput();
};

const validateName = (value) => {
  if (!value) return t('common.error.nameRequired');
  if (value.length < 2) return t('common.error.nameTooShort');
  return true;
};

const validateInput = () => {
  const result = validateName(inputValue.value);
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

defineExpose({
  validate,
});
</script>

<template>
  <div>
    <div
      class="input-wrapper"
    >
      <label
        class="input-label"
        :class="{ 'is-active': isFocused || hasValue }"
      >
        <span class="input-label__font">{{ $t('common.form.name') }}</span>
      </label>

      <input
        ref="inputRef"
        type="text"
        v-model="inputValue"
        class="input-field input-field__font"
        @focus="handleFocus"
        @blur="handleBlur"
        :class="{
          'is-focused': isFocused,
          'has-error': errorStr,
        }"
      />
    </div>
    <span v-if="errorStr" class="error-message">{{ errorStr }}</span>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  width: 100%;
}

.input-field {
  width: 100%;
  transition: all 0.2s ease;

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
  bottom: em(-20);
  color: $color-red-700;
  font-size: em(14);

  @include media-breakpoint-down(sm) {
    font-size: em(14);
  }
}
</style>
