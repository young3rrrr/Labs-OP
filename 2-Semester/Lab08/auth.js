class RateLimiter {
    constructor(limitPerSecond) {
        this.minInterval = 1000 / limitPerSecond;
        this.lastRequestTime = 0;
    }

    async waitForTurn() {
        const now = Date.now();
        const timeToWait = Math.max(0, this.lastRequestTime + this.minInterval - now);
        
        this.lastRequestTime = now + timeToWait; 

        if (timeToWait > 0) {
            console.log(`[Rate Limiter] Limit exceeded. Waiting for ${timeToWait}ms...`);
            await new Promise(resolve => setTimeout(resolve, timeToWait));
        }
    }
}

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
    constructor(authStrategy, rateLimit = 5) {
        this.strategy = authStrategy;
        this.rateLimiter = new RateLimiter(rateLimit);
        
        this.refreshPromise = null;
    }

    async refreshCredentials() {
        console.log('🔄 [Proxy] Token expired. Fetching a new one...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newToken = "new_fresh_token_123";
        
        if (typeof this.strategy.updateToken === 'function') {
            this.strategy.updateToken(newToken);
        }
        console.log('✅ [Proxy] Token updated successfully!');
    }

    async request(url, options = {}) {
        await this.rateLimiter.waitForTurn();

        if (this.refreshPromise) {
            console.log(`[Proxy] Request to ${url} is waiting for token update...`);
            await this.refreshPromise;
        }

        const headers = new Headers(options.headers || {});
        this.strategy.applyAuth(headers);
        const finalOptions = { ...options, headers };

        console.log(`[Proxy] Sending request to ${url}`);

        let response = await this.mockFetch(url, finalOptions);

        if (response.status === 401) {
            if (!this.refreshPromise) {
                this.refreshPromise = this.refreshCredentials().finally(() => {
                    this.refreshPromise = null;
                });
            }
            
            await this.refreshPromise;

            console.log(`[Proxy] Resending request to ${url} after token update...`);
            
            const retryHeaders = new Headers(options.headers || {});
            this.strategy.applyAuth(retryHeaders);
            
            response = await this.mockFetch(url, { ...options, headers: retryHeaders });
        }

        return response;
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
    const myStrategy = new JwtStrategy('old_expired_token');
    
    const api = new ApiProxy(myStrategy, 2); 

    console.log('---STARTING TEST---\n');

    await Promise.all([
        api.request('/users/1'),
        api.request('/users/2'),
        api.request('/users/3')
    ]);
    
    console.log('\n--- ALL REQUESTS COMPLETED ---');
}

runTest();