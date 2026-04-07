import { asyncMapCallback, asyncMapPromise, asyncMapAbortable } from "./mapper.js";

function multiplyByTwoAsync(item, callback) {
    setTimeout(() => {
        callback(null, item * 2);
    }, 1000);
}

function runCallbackDemo() {
    console.log("starting Callback Map...");
    const data = [1, 2, 3];
    
    asyncMapCallback(data, multiplyByTwoAsync, (err, result) => {
        if (err) {
            console.error("Callback Map error:", err);
        } else {
            console.log("Callback Map result:", result);
        }
    });
}

async function runPromiseDemo() {
    console.log("starting Promise Map...");
    const data = [10, 20, 30];

    try {
        const result = await asyncMapPromise(data, multiplyByTwoAsync);
        console.log("Promise Map result:", result);
    } catch (err) {
        console.error("Promise Map error:", err);
    }
}

async function runAbortableDemo() {
    console.log("3. starting Abortable Map...");
    const data = [100, 200, 300];
    
    const controller = new AbortController();
    const { signal } = controller;

    setTimeout(() => {
        console.log("sending abort signal...");
        controller.abort();
    }, 500);

    try {
        const result = await asyncMapAbortable(data, multiplyByTwoAsync, signal);
        console.log("Abortable Map result (we should not see this):", result);
    } catch (err) {
        console.error("Successfully caught abort error:", err.message);
    }
}

async function runAll() {
    runCallbackDemo();
    
    await new Promise(res => setTimeout(res, 1200)); 
    
    await runPromiseDemo();
    await runAbortableDemo();
}

runAll();