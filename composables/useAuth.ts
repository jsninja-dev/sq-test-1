interface CheckData {
  email: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export const useAuth = () => {
  const checkUser = async (data: CheckData) => {
    const response = await $fetch<{ data: boolean }>('/api/auth/check', {
      method: 'POST',
      body: data,
    });
    return response.data ? response.data : false;
  };

  const registerUser = async (data: RegisterData) => {
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: data,
    });
    return response;
  };

  return {
    checkUser,
    registerUser,
  };
};
