<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { countries } from 'countries-list';
import parsePhoneNumber from 'libphonenumber-js';

const emit = defineEmits(['update:modelValue', 'validation']);

const isOpen = ref(false);
const searchQuery = ref('');
const phoneNumber = ref('+357');
const isFocused = ref(false);
const isValid = ref(true);
const isInitialMount = ref(true);
const selectedOption = ref({
  value: 'CY',
  label: 'Cyprus',
  flag: `https://flagicons.lipis.dev/flags/4x3/cy.svg`,
  phoneCode: '+357',
});

const validate = () => {
  return validatePhoneNumber(phoneNumber.value);
};

// Transform countries data into our format
const countryOptions = computed(() => {
  return Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
    flag: `https://flagicons.lipis.dev/flags/4x3/${code.toLowerCase()}.svg`,
    phoneCode: '+' + country.phone[0],
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
            phoneNumber.value = userCountry.phoneCode;
            emit('update:modelValue', userCountry.phoneCode);
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
        phoneNumber.value = userCountry.phoneCode;
        emit('update:modelValue', userCountry.phoneCode);
      }
    }
  } catch (error) {
    // console.error('Error detecting country:', error);
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
  phoneNumber.value = selectedOption.value.phoneCode;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.ui-phone-select')) {
    isOpen.value = false;
    searchQuery.value = '';
  }
};

// Validate phone number format
const validatePhoneNumber = (number) => {
  // Remove any non-digit characters except '+'
  const cleanedNumber = number.toString().replace(/[^\d+]/g, '');

  // Check if number has at least 8 digits after the country code
  const digitsAfterPlus = cleanedNumber.slice(1).replace(/\D/g, '');
  if (digitsAfterPlus.length < 8) {
    isValid.value = false;
    emit('validation', isValid.value);
    return;
  }

  try {
    const phone = parsePhoneNumber(number);
    const candidateCountry = countryOptions.value.find(
      (option) => option.value === phone.country,
    );
    if (candidateCountry) {
      selectedOption.value = candidateCountry;
    }
  } catch (error) {
    isValid.value = false;
    emit('validation', isValid.value);
  }

  isValid.value = true;
  emit('validation', isValid.value);
};

// Watch for changes in phoneNumber to update selected country and validate
watch(phoneNumber, (newValue) => {
  if (!newValue) {
    return;
  }

  // Extract the phone code from the input
  let phoneStr = newValue.toString().replace(/[^0-9+]/g, '');
  if (phoneStr.charAt(0) !== '+') {
    phoneStr = '+' + phoneStr;
    phoneNumber.value = phoneStr;
  }

  // Skip country update during initial mount
  emit('update:modelValue', phoneStr);

  if (isInitialMount.value) {
    isInitialMount.value = false;
    return;
  }

  const phoneCodeLength = phoneStr.length > 5 ? 5 : phoneStr.length;

  for (let i = phoneCodeLength; i > 1; i--) {
    const phoneToCode = phoneStr.slice(0, i);

    // Find the country that matches this phone code
    const matchingCountry = countryOptions.value.find(
      (option) => option.phoneCode === phoneToCode,
    );

    if (matchingCountry) {
      selectedOption.value = matchingCountry;
      break;
    }
  }

  // Validate the phone number
  validatePhoneNumber(newValue);
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  detectUserCountryByGeolocation();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleFocus = () => {
  isFocused.value = true;
  isValid.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
  validatePhoneNumber(phoneNumber.value);
};

// Expose the validate method to parent components
defineExpose({
  validate,
});
</script>

<template>
  <div>
    <div
      class="input-field ui-phone-select"
      :class="{
        'ui-phone-select--focused': isFocused || isOpen,
        'ui-phone-select--error': !isValid,
      }"
    >
      <div class="ui-phone-select__title">
        <span class="ui-phone-select__font--title">
          {{ $t('common.form.phone') }}
        </span>
      </div>
      <div class="ui-phone-select__country">
        <div
          class="ui-phone-select__header"
          :class="{ 'ui-phone-select__header--hover': isOpen }"
          @click="toggleDropdown"
        >
          <img
            :src="selectedOption.flag"
            alt="Flag"
            class="ui-phone-select__flag-icon"
          />
          <span>
            <svg
              class="ui-phone-select__arrow"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="#C2C2C2" stroke-width="2" d="M18 9l-6 6-6-6" />
            </svg>
          </span>
        </div>
        <div v-if="isOpen" class="ui-phone-select__options">
          <div class="ui-phone-select__options-list">
            <div
              v-for="option in filteredOptions"
              :key="option.value"
              class="ui-phone-select__option"
              @click="handleOptionClick(option, $event)"
            >
              <img
                :src="option.flag"
                alt="Flag"
                class="ui-phone-select__flag-icon"
                loading="lazy"
              />
              <span class="ui-phone-select__font--label">
                {{ option.label }} {{ option.phoneCode }}
              </span>
            </div>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('common.form.searchCountry')"
            class="ui-phone-select__search-input ui-phone-select__font--label"
          />
        </div>
      </div>
      <div class="ui-phone-select__input-wrapper">
        <input
          type="tel"
          class="ui-phone-select__input ui-phone-select__font--label"
          v-model="phoneNumber"
          pattern="[+]?[0-9]*"
          inputmode="tel"
          autocomplete="tel"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
    </div>
    <span v-if="!isValid" class="ui-phone-select__error-message">
      {{ $t('common.error.phoneInvalid') }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.ui-phone-select {
  background: $color-white;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: em(13);
  flex-direction: row;

  &--focused {
    border-color: #3b82f6;
  }

  &--error {
    border-color: $color-red-700;
  }

  @include media-breakpoint-down(sm) {
  }

  &__title {
    position: absolute;
    top: em(-8);
    left: em(20);
    background: $color-white;
    padding-inline: em(2);
  }

  &__country {
    flex-shrink: 0;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 0;

    @include media-breakpoint-down(sm) {
      justify-content: end;
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
    padding: em(12) em(13) em(12) em(13);
    border-top: em(1) solid #d3d3d3;
    outline: none;

    &:focus {
      border-color: #3b82f6;
    }
  }

  &__options {
    position: absolute;
    left: em(-1);
    bottom: em(48);
    width: calc(100% + em(2));
    background: $color-white;
    z-index: 1;
    border: em(1) solid #3b82f6;
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

  &__input-wrapper {
    flex-grow: 1;
    position: relative;
  }

  &__input {
    width: 100%;
  }

  &__error-message {
    color: $color-red-700;
    font-size: em(14);
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

.ui-phone-select__header--hover .ui-phone-select__arrow {
  transform: rotate(180deg);
}
</style>
