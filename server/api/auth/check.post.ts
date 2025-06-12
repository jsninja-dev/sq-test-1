export default defineEventHandler(async (event) => {
  // const config = useRuntimeConfig();
  const body = await readBody(event);
  console.log('body', body);
  // console.log('config', config);
  // Validate required fields
  if (!body.email) {
  }

  try {
    // const headers = {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${config.apiToken}`,
    // };

    // console.log('checkUser', body);
    // console.log('config.public.apiBaseUrl', config.public.apiBaseUrl);
    // console.log('config.apiToken', config.apiToken);
    // console.log('config.public.apiBaseUrl');
    // console.log('headers', headers);

    // const response = await $fetch(`${config.public.apiBaseUrl}/rest/users`, {
    //   method: 'POST',
    //   body: body,
    //   headers: headers,
    // });

    return {
      status: 'success',
      data: 'response',
    };
  } catch (error) {
  }
});
