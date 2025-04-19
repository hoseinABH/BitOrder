export type Method = 'PUT' | 'POST' | 'DELETE' | 'GET';

export interface clientProps<F> {
  endpoint: string;
  method?: Method;
  request?: F;
}

export async function client<T = null, F = null>({
  method = 'GET',
  endpoint,
  request,
}: clientProps<F>): Promise<T> {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const response = await result.json();
  return response;
}
