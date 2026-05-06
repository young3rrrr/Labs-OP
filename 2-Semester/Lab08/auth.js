class AuthStrategy {
    applyAuth(headers) {}
}

class JwtStrategy extends AuthStrategy {
    constructor(token) { 
        super(); 
        this.token = token; 
    }
    applyAuth(headers) {
        headers.set('Authorization', `Bearer ${this.token}`);
    }
    updateToken(newToken) {
        this.token = newToken;
    }
}

class ApiProxy {
    constructor(authStrategy) {
        this.strategy = authStrategy;
    }

    async request(url, options = {}) {
        const headers = new Headers(options.headers || {});
        
        this.strategy.applyAuth(headers);
        const finalOptions = { ...options, headers };

        console.log(`[Proxy] Sending request to ${url}`);

        return await this.mockFetch(url, finalOptions);
    }

    async mockFetch(url, options) {
        const token = options.headers.get('Authorization');
        if (token === 'Bearer old_expired_token') {
            return { status: 401, json: async () => ({ error: 'Unauthorized' }) };
        }
        return { status: 200, json: async () => ({ data: `Success from ${url}` }) };
    }
}

async function runTest() {
    const myStrategy = new JwtStrategy('valid_token');
    const api = new ApiProxy(myStrategy); 

    console.log('---STARTING TEST---\n');

    await api.request('/users/1');
    
    console.log('\n--- ALL REQUESTS COMPLETED ---');
}

runTest();