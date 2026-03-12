const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
}

export default {
    get: <T,>(endpoint: string) => request<T>(endpoint),
    post: <T,>(endpoint: string, data: unknown) =>
        request<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }),
    put: <T,>(endpoint: string, data: unknown) =>
        request<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
    delete: <T,>(endpoint: string) =>
        request<T>(endpoint, { method: 'DELETE' }),
};