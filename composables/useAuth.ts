
// const checkData = {
//   email: string,
// }

// const RegisterData = {
//   email: string,
//   password: string,
//   firstName: string,
//   lastName: string,
//   phone: string,
// }

export const useAuth = () => {
  const checkUser = async (data) => {
    console.log('checkUser', data);
    // try {
      const response = await $fetch('/api/auth/check', {
        method: 'POST',
        body: data,
      });
      return response;
    // } catch (err) {
    //   throw err;
    // }
  };

  const registerUser = async (data) => {
    // try {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: data,
      });
      return response;
    // } catch (err) {
    //   throw err;
    // }
  };

  return {
    checkUser,
    registerUser,
  };
};
