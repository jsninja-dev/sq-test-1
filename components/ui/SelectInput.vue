<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const { tm, rt } = useI18n();

const partnerTypes = computed(() => {
  return tm('common.form.partnerTypes').map(rt);
});

const isOpen = ref(false);
const selectedOption = ref(props.modelValue || partnerTypes.value[0] || { value: '', label: '' });

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleOptionClick = (option, event) => {
  event.stopPropagation();
  isOpen.value = false;
  selectedOption.value = option;
  emit('update:modelValue', option.value);
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.ui-select-bar')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="ui-select-bar">
    <div class="ui-select-bar__title">
      <span class="ui-select-bar__font--title">
        {{ title }}
      </span>
    </div>
    <div
      class="input-field ui-select-bar__header"
      :class="{ 'ui-select-bar__header--hover': isOpen }"
      @click="toggleDropdown"
    >
      <span class="ui-select-bar__font--label">{{ selectedOption }}</span>
      <span>
        <svg
          class="ui-select-bar__arrow"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path stroke="#D30044" stroke-width="2" d="M18 9l-6 6-6-6" />
        </svg>
      </span>
    </div>
    <div v-if="isOpen" class="ui-select-bar__options">
      <div class="ui-select-bar__options-list">
        <div
          v-for="option in partnerTypes"
          :key="option"
          class="ui-select-bar__option"
          @click="handleOptionClick(option, $event)"
        >
          <span class="ui-select-bar__font--label">
            {{ option }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-select-bar {
  background: $color-white;
  position: relative;
  cursor: pointer;

  @include media-breakpoint-down(sm) {
  }

  &__title {
    position: absolute;
    top: em(-8);
    left: em(20);
    background: $color-white;
    padding-inline: em(2);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: em(5);

    @include media-breakpoint-down(sm) {
      justify-content: end;
      gap: 0;
    }

    &--hover {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-color: #3b82f6;
    }
  }

  &__arrow {
    width: em(24);
    height: em(24);

    @include media-breakpoint-down(sm) {
      width: em(20);
      height: em(20);
    }
  }

  &__options {
    position: absolute;
    width: 100%;
    background: $color-white;
    z-index: 1;
    border: em(1) solid #3b82f6;
    border-top: none;
    border-bottom-left-radius: em(3);
    border-bottom-right-radius: em(3);
  }

  &__options-list {
    max-height: em(280);
    overflow-y: auto;

    @include media-breakpoint-down(sm) {
      max-height: em(200);
    }
  }

  &__option {
    padding: em(12) em(13);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: em(5);

    &:hover {
      background: #f3f4f6;
    }
  }

  &__font {
    &--title {
      color: $color-black;
      font-weight: $font-weight-regular;
      font-size: em(12);
      line-height: 1;
    }

    &--label {
      color: $color-black-900;
      font-weight: $font-weight-regular;
      font-size: em(18);
      line-height: 1;
      flex-grow: 1;
      @include media-breakpoint-down(sm) {
        font-size: em(16);
      }
    }
  }
}

.ui-select-bar__header--hover .ui-select-bar__arrow {
  transform: rotate(180deg);
}
</style>
