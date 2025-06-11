<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { countries } from 'countries-list';

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const searchQuery = ref('');
const selectedOption = ref({
  value: 'CY',
  label: 'Cyprus',
  flag: `https://flagicons.lipis.dev/flags/4x3/cy.svg`,
});

// Transform countries data into our format
const countryOptions = computed(() => {
  return Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
    flag: `https://flagicons.lipis.dev/flags/4x3/${code.toLowerCase()}.svg`,
  }));
});

// Get user's country from geolocation
const detectUserCountryByGeolocation = () => {
  if (!navigator.geolocation) {
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
        );
        const data = await response.json();

        if (data.countryCode) {
          const userCountry = countryOptions.value.find(
            (option) => option.value === data.countryCode,
          );
          if (userCountry) {
            selectedOption.value = userCountry;
            emit('update:modelValue', userCountry.value);
          }
        }
      } catch (error) {
        // console.error('Error getting country from coordinates:', error);
        // Fallback to browser language detection if geolocation fails
        detectUserCountry();
      }
    },
    (error) => {
      // console.error('Error getting location:', error);
      // Fallback to browser language detection if geolocation fails
      detectUserCountry();
    },
  );
};

// Get user's country from browser language
const detectUserCountry = () => {
  try {
    // Get browser language (e.g., 'en-US', 'fr-FR', etc.)
    const browserLang = navigator.language || navigator.languages[0];
    // Extract country code from language (e.g., 'US' from 'en-US')
    const countryCode = browserLang.split('-')[1]?.toUpperCase();

    if (countryCode) {
      // Find the country in our options
      const userCountry = countryOptions.value.find(
        (option) => option.value === countryCode,
      );
      if (userCountry) {
        selectedOption.value = userCountry;
        emit('update:modelValue', userCountry.value);
      }
    }
  } catch (error) {
    console.error('Error detecting country:', error);
  }
};

// Filter countries based on search query
const filteredOptions = computed(() => {
  if (!searchQuery.value) return countryOptions.value;
  const query = searchQuery.value.toLowerCase();
  return countryOptions.value.filter((option) =>
    option.label.toLowerCase().includes(query),
  );
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    searchQuery.value = '';
  }
};

const handleOptionClick = (option, event) => {
  event.stopPropagation();
  isOpen.value = false;
  selectedOption.value = option;
  searchQuery.value = '';
  emit('update:modelValue', option.value);
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.ui-country-select')) {
    isOpen.value = false;
    searchQuery.value = '';
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  detectUserCountryByGeolocation();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="ui-country-select">
    <div class="ui-country-select__title">
      <span class="ui-country-select__font--title">
        {{ $t('common.form.country') }}
      </span>
    </div>
    <div
      class="input-field ui-country-select__header"
      :class="{ 'ui-country-select__header--hover': isOpen }"
      @click="toggleDropdown"
    >
      <img
        :src="selectedOption.flag"
        alt="Flag"
        class="ui-country-select__flag-icon"
      />
      <span class="ui-country-select__font--label">{{
        selectedOption.label
      }}</span>
      <span>
        <svg
          class="ui-country-select__arrow"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path stroke="#D30044" stroke-width="2" d="M18 9l-6 6-6-6" />
        </svg>
      </span>
    </div>
    <div v-if="isOpen" class="ui-country-select__options">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('common.form.searchCountry')"
        class="input-field ui-country-select__search-input ui-country-select__font--label"
        @click.stop
      />
      <div class="ui-country-select__options-list">
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          class="ui-country-select__option"
          @click="handleOptionClick(option, $event)"
        >
          <img
            :src="option.flag"
            alt="Flag"
            class="ui-country-select__flag-icon"
            loading="lazy"
          />
          <span class="ui-country-select__font--label">
            {{ option.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-country-select {
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

  &__search-input {
    width: 100%;
    border-radius: 0;
    border-bottom: em(1) solid #d3d3d3;
    font-size: em(14);

    &:focus {
      border-color: #3b82f6;
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

  &__flag-icon {
    width: auto;
    height: em(20);
    border-radius: 20%;
    margin-right: em(13);
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

.ui-country-select__header--hover .ui-country-select__arrow {
  transform: rotate(180deg);
}
</style>
