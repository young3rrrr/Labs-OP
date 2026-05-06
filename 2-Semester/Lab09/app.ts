import { performance } from 'perf_hooks';

interface LogOptions {
    level?: 'INFO' | 'DEBUG' | 'ERROR';
}

function log({ level = 'INFO' }: LogOptions = {}) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const start = performance.now();
            let result: any;
            let error: Error | null = null;

            try {
                result = await originalMethod.apply(this, args);
            } catch (e) {
                error = e as Error;
                throw e;
            } finally {
                const end = performance.now();
                const duration = (end - start).toFixed(2);

                if (level === 'ERROR' && !error) {
                    return; 
                }

                const timestamp = new Date().toISOString();
                const currentLevel = error ? 'ERROR' : level;
                
                console.log(`[${timestamp}] [${currentLevel}] ${propertyKey}() | Args: ${JSON.stringify(args)} | Result: ${error ? error.message : JSON.stringify(result)} | Time: ${duration}ms`);
            }
            
            return result;
        };

        return descriptor;
    };
}

class PaymentService {
    @log({ level: 'INFO' })
    calculateTax(amount: number) {
        return amount * 0.2;
    }

    @log({ level: 'ERROR' })
    async refund(transactionId: number) {
        await new Promise(resolve => setTimeout(resolve, 100));
        throw new Error(`Transaction ${transactionId} not found.`);
    }
}

async function runDemo() {
    console.log('--- BASIC TS LOGGER TEST ---\n');
    const service = new PaymentService();

    service.calculateTax(100);
    try { await service.refund(98765); } catch (e) {}
}

runDemo();