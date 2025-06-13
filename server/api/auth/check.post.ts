export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

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

    const response = await $fetch<any[]>(
      `${config.public.apiBaseUrl}/rest/users`,
      {
        method: 'POST',
        body: body,
        headers: headers,
      },
    );

    return {
      status: 'success',
      data: response.length === 0,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: 'Check failed',
      data: error?.response,
    });
  }
});
