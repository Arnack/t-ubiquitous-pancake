const API_URL = 'http://localhost:3030'; 

export const AuthService = {
    login: async (credentials: { username: string, password: string }) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.username,
                    password: credentials.password
                })
            });

            if (!response.ok) {
                throw new Error('Login error');
            }

            const data = await response.json();
            console.log('Login data:', data);
            

            if (data.accessToken) {
                localStorage.setItem('accessToken', data.user.accessToken);
                localStorage.setItem('role', data.user.role);
                localStorage.setItem('userId', data.user.id);
                localStorage.setItem('name', data.user.name);
                return data;
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    register: async (credentials: { username: string, password: string }) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.username,
                    password: credentials.password
                })
            });

            if (!response.ok) {
                throw new Error('Register error');
            }

            const data = await response.json();

            if (data.accessToken) {
                return data;
            }
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            if (!response.ok) {
                throw new Error('Logout error');
            }

            localStorage.removeItem('accessToken');
            localStorage.removeItem('role');
            localStorage.removeItem('userId');
            localStorage.removeItem('name');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    },

    getUserRole: () => {
        return localStorage.getItem('role');
    },

    getUserData: () => {
        return {
            role: localStorage.getItem('role'),
            userId: localStorage.getItem('userId'),
            name: localStorage.getItem('name')
        }
    }
};