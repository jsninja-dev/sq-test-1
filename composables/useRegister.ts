import { ref } from 'vue';
import { useRequest } from './useRequest';

interface checkData {
  email: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export const useRegister = () => {
  const checkLoading = ref(false);
  const registerLoading = ref(false);
  const checkError = ref<string | null>(null);
  const registerError = ref<string | null>(null);

  const checkUser = async (data: checkData) => {
    checkLoading.value = true;
    checkError.value = null;

    try {
      const response = await useRequest('/register/check', {
        method: 'POST',
        body: data,
      });
      return response;
    } catch (err: any) {
      checkError.value = err.message || 'Registration failed';
      throw err;
    } finally {
      checkLoading.value = false;
    }
  };

  const registerUser = async (data: RegisterData) => {
    registerLoading.value = true;
    registerError.value = null;

    try {
      const response = await useRequest('/register/register', {
        method: 'POST',
        body: data,
      });
      return response;
    } catch (err: any) {
      registerError.value = err.message || 'Registration failed';
      throw err;
    } finally {
      registerLoading.value = false;
    }
  };

  return {
    checkLoading,
    registerLoading,
    checkError,
    registerError,
    checkUser,
    registerUser,
  };
};
