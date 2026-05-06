const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* generateTelemetry() {
    let id = 1;
    while (true) {
        await delay(50);
        yield {
            id: id++,
            cpuLoad: Math.floor(Math.random() * 100),
            timestamp: Date.now()
        };
    }
}

async function* batchStream(iterator, batchSize) {
    let batch = [];
    
    for await (const item of iterator) {
        batch.push(item);
        
        if (batch.length === batchSize) {
            yield batch;
            batch = [];
        }
    }
    
    if (batch.length > 0) {
        yield batch;
    }
}

async function processBatches() {
    console.log("Starting batch processing...");
    const telemetryStream = generateTelemetry();
    const batchIterator = batchStream(telemetryStream, 5);

    let batchCount = 0;

    for await (const batch of batchIterator) {
        console.log(`Processing batch ${++batchCount}:`, batch);
        await delay(200);
            
        if (batchCount >= 10) {
            console.log("Processed 10 batches, stopping...");
            return;
        }
    }
}

processBatches();
