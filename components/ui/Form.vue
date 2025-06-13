<script setup>
import { useAuth } from '@/composables/useAuth';
import { ref, watch } from 'vue';
import links from '@/constants/links';
import { useUtm } from '@/composables/useUtm';
import debounce from 'lodash/debounce';

const EmailStatus = {
  UNDEFINED: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: 3,
};

const { checkUser, registerUser } = useAuth();

const { getUrlWithUtm, hasUtmParameters } = useUtm();

const email = ref('');
const isEmailValid = ref(false);
const emailStatus = ref(EmailStatus.UNDEFINED);

// Create debounced email check function outside of watch
const debouncedEmailCheck = debounce(async (emailToCheck) => {
  try {
    emailStatus.value = EmailStatus.LOADING;
    const response = await checkUser({ email: emailToCheck });
    emailStatus.value = response ? EmailStatus.SUCCESS : EmailStatus.ERROR;
  } catch (error) {
    // console.error('Email check failed:', error);
    emailStatus.value = EmailStatus.ERROR;
  }
}, 500);

// Watch for email changes and validate after 500ms of no typing
watch(email, (newEmail) => {
  if (newEmail && isEmailValid.value) {
    debouncedEmailCheck(newEmail);
  } else {
    emailStatus.value = EmailStatus.UNDEFINED;
  }
});

const name = ref('');
const isNameValid = ref(false);
const phone = ref('');
const isPhoneValid = ref(false);
const partnerType = ref('');
const country = ref('');

const emailInputRef = ref(null);
const nameInputRef = ref(null);
const phoneInputRef = ref(null);

const handleSubmit = async () => {
  // Trigger validation for all inputs
  emailInputRef.value?.validate();
  nameInputRef.value?.validate();
  phoneInputRef.value?.validate();

  if (isEmailValid.value && isNameValid.value && isPhoneValid.value) {
    // Create URL with form data as parameters
    const registerURL = getUrlWithUtm(links.REGISTER);
    const params = new URLSearchParams({
      email: email.value,
      name: name.value,
      phone: phone.value,
      partnerType: partnerType.value,
      country: country.value,
    });

    const formData = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
    };

    try {
      const response = await register(formData);
      // Handle successful registration
      console.log('Registration successful:', response);
    } catch (err) {
      // Error is already handled in the composable
      console.error('Registration failed:', err);
    }
  }
};
</script>

<template>
  <div class="ui-form">
    <UiGradientText class="ui-form__header">
      <span class="ui-form__font--header">
        {{ $t('common.form.header') }}
      </span>
      <span class="square-dot ui-form__dot" />
    </UiGradientText>
    <UiSelectInput
      v-model="partnerType"
      class="ui-form__partner"
      :title="$t('common.form.partner')"
    />
    <UiInput
      ref="nameInputRef"
      v-model="name"
      class="ui-form__name"
      @validation="isNameValid = $event"
    />
    <UiCountrySelect v-model="country" class="ui-form__country" />
    <UiEmailInput
      ref="emailInputRef"
      v-model="email"
      class="ui-form__email"
      :status="emailStatus"
      @validation="isEmailValid = $event"
    />
    <UiPhoneInput
      ref="phoneInputRef"
      v-model="phone"
      class="ui-form__phone"
      @validation="isPhoneValid = $event"
    />
    <UiButton
      theme="red"
      class="ui-form__button"
      :text="$t('common.button')"
      @click="handleSubmit"
    />
  </div>
</template>

<style scoped lang="scss">
.ui-form {
  width: em(498);
  padding: em(33) em(53) em(34);
  display: flex;
  flex-direction: column;
  gap: em(14);
  background-color: $color-white;

  @include media-breakpoint-down(sm) {
    width: 100%;
    padding: em(36) 0 em(20);
    gap: em(18);
  }

  &__header {
    text-align: center;
    padding-bottom: em(20);

    @include media-breakpoint-down(sm) {
      padding-bottom: em(16);
    }
  }

  &__dot {
    width: em(17);
    height: em(17);
    margin-left: em(4);
  }

  &__button {
    width: 100%;
    margin-top: em(24);

    @include media-breakpoint-down(sm) {
      width: calc(100% - em(2));
      margin-top: 0;
      margin-inline: em(1);
    }
  }

  &__font {
    &--header {
      font-size: em(32);
      font-weight: $font-weight-semi-bold;
      line-height: 100%;

      @include media-breakpoint-down(sm) {
        font-size: em(24);
      }
    }

    &--button {
      font-weight: $font-weight-medium;
      line-height: 1.1;

      @include media-breakpoint-down(sm) {
        font-weight: $font-weight-regular;
      }
    }
  }
}
</style>
@/composables/useAuth
