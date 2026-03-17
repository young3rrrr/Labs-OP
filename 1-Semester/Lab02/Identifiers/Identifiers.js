const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function tellName(name) {
    console.log(`Привіт, ${name}!`);
}

rl.question('Назвіться, будь ласка: ', (name) => {
    tellName(name);
        rl.close();
    });
