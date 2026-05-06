import { performance } from 'perf_hooks';
import * as fs from 'fs';

interface LogMeta {
    timestamp: string;
    level: string;
    method: string;
    args: any[];
    result: any;
    duration: string;
}

interface LogOptions {
    level?: 'INFO' | 'DEBUG' | 'ERROR';
    format?: 'text' | 'json';
    dest?: 'console' | 'file';
}

const logFormatters: Record<string, (meta: LogMeta) => string> = {
    text: (meta) => `[${meta.timestamp}] [${meta.level}] ${meta.method}() | Args: ${JSON.stringify(meta.args)} | Result: ${JSON.stringify(meta.result)} | Time: ${meta.duration}ms`,
    json: (meta) => JSON.stringify(meta)
};

const logTransports: Record<string, (message: string) => void> = {
    console: console.log,
    file: (message) => fs.appendFileSync('app.log', message + '\n')
};

function log({ level = 'INFO', format = 'text', dest = 'console' }: LogOptions = {}) {
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

                const logData: LogMeta = {
                    timestamp: new Date().toISOString(),
                    level: error ? 'ERROR' : level,
                    method: propertyKey,
                    args,
                    result: error ? error.message : result,
                    duration
                };

                const formatterFn = logFormatters[format] || logFormatters.text;
                const transportFn = logTransports[dest] || logTransports.console;
                
                transportFn(formatterFn(logData));
            }
            
            return result;
        };

        return descriptor;
    };
}

class PaymentService {
    @log({ level: 'INFO', format: 'text' })
    calculateTax(amount: number) {
        return amount * 0.2;
    }

    @log({ level: 'DEBUG', format: 'json' })
    async processPayment(userId: number, amount: number) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { status: 'success', transactionId: 98765 };
    }

    @log({ level: 'ERROR', format: 'text', dest: 'file' })
    async refund(transactionId: number) {
        await new Promise(resolve => setTimeout(resolve, 100));
        throw new Error(`Transaction ${transactionId} not found.`);
    }
}

async function runDemo() {
    console.log('--- EXTENDED TS LOGGER TEST ---\n');
    const service = new PaymentService();

    service.calculateTax(100);
    await service.processPayment(42, 5000);
    
    try { await service.refund(98765); } catch (e) {}
    console.log('\n--- Ошибка записана в app.log ---');
}

runDemo();