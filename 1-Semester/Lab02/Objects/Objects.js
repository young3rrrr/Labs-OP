const Fn = () => {
    const obj1 = { name: "Marcus" };
    let obj2 = { name: "Marcus" };

    obj1 = {name: "Fiend"}; // Не можна змінити посилання на константу.
    obj2 = {name: "Fiend"}; // Можна змінити посилання на об'єкт тому що це let і він може змінюватися.

    console.log(obj1, obj2);

    obj2 = {name: "Marcus Fiend"}; // Також можна змінити посилання на об'єкт тому що це let і він може змінюватися.
    console.log(obj1, obj2);
}

function createUser (name, city, age) {

    const user = {};
    const readline = require('readline');
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
    rl.question('Назвіться, будь ласка: ', (name) => {
        rl.question('Вкажіть ваше місто: ', (city) => {
            rl.question('Вкажіть ваш вік: ', (age) => {
                user.name = String(name);
                user.city = String(city);
                user.age = Number(age);
                console.log(user);
                rl.close();
                    if (isNaN(user.age)) {
                        console.log('Вік повинен бути числом');
                        return createUser();
                }   
                });
            });
        });
    };
//Fn();
createUser();