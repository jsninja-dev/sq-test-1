export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  // Validate required fields
  if (!body.email) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields',
    });
  }

  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiToken}`,
    };

    const response = await $fetch(`${config.public.apiBaseUrl}/rest/users`, {
      method: 'POST',
      body: body,
      headers: headers,
    });

    return {
      status: 'success',
      data: response,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: 'Registration failed',
      data: error?.response,
    });
  }
});
