// 1) Створити карту користувача(User Card):
// Створити функцію «userCard» яка приймає число(будь-яке число) і повертає
// об’єкт з методами:
//     const card3 = userCard(3); // returns an object with methods
// User Card методи:
//     getCardOptions. Дана функція повертає об’єкт котрий містить інформацію про
// карту:
//     card3.getCardOptions(); // returns options object with card info
// Об’єкт має містити такі властивості:
//     • balance (по замовчуванням 100)
// • transactionLimit (по замовчуванням 100. Це ліміт коштів які ви можете взяти з
// карти)
// • historyLogs (масив об’єктів який містить інформацію про операції та трансакції
// данної карти)
// • key (число в діапазоні[1; 3] залежить від числа яке ви передали в userCard
// функції. Кожна карта повинна мати унікальний key)
let currDate = new Date();
let hours = currDate.getHours();
let minutes = currDate.getMinutes();
let seconds = currDate.getSeconds();
if (minutes <= 9) {
    minutes = "0" + minutes;
}
if (seconds <= 9) {
    seconds = "0" + seconds;
}
let todayDate = new Date();
let currYear = todayDate.getFullYear();
let currMonth = todayDate.getMonth() + 1;
let currDay = todayDate.getDate();


function userCard(number) {
    let card = {
        balance: 100,
        transactionLimit: 100,
        historyLogs: [],
        key: number,
    }
    return {
        getCardOptions: function () {
            return card;
        },
        putCredits: function (cash1) {
            card.balance = cash1;
            // return card.balance;
            let transaction = {
                operationType: 'Received credits',
                credits: cash1,
                operationTime: `${currDay}/${currMonth}/${currYear}, ${hours}:${minutes}:${seconds}`
            }
            card.historyLogs.splice(0, 0, transaction);
        },
        takeCredits: function (cash2) {
            if (card.balance >= cash2) {
                card.balance = card.balance - cash2;
                let transaction = {
                    operationType: 'Withdrawal of credits',
                    credits: cash2,
                    operationTime: `${currDay}/${currMonth}/${currYear}, ${hours}:${minutes}:${seconds}`
                }
                card.historyLogs.splice(0, 0, transaction);
            } else {
                console.error(card);
            }

        },
        setTransactionLimit: function (cash3) {
            card.transactionLimit = cash3;
            let transaction = {
                operationType: 'Transaction Limit change',
                credits: cash3,
                operationTime: `${currDay}/${currMonth}/${currYear}, ${hours}:${minutes}:${seconds}`
            }
            card.historyLogs.splice(0, 0, transaction);
        },
        transferCredits: function (credits, cards) {
            cards.getCardOptions().balance+=credits;
            // console.log(cards.getCardOptions());
            credits = credits + credits * 0.5 / 100;
            card.balance -= credits;
        },

    }

}

// const card3 = userCard(3);
// const card1 = userCard(1);
// card3.getCardOptions();
// card3.PutCredits(150);
// card3.takeCredits(100);
// card3.setTransactionLimit(50);
// // card3.transferCredits(50, card1);
// console.log(card3.getCardOptions());
// console.log(card1.getCardOptions());

// putCredits. Ця функція отримує певну кількість грошей і заповнює баланс
// карти:
// takeCredits. Ця функція отримує певну кількість грошей і віднімає ці кошти з
// баланса карти (протилежний за дією від метода putCredits):
// card3.takeCredits(100);
// Ви можете брати кошти з картки, якщо ліміт транзакцій та залишок коштів
// перевищують кількість коштів, які ви бажаєте взяти. Якщо ні, то слід записати
// відповідне повідомлення у консолі (скористайтеся console.error)
// setTransactionLimit.Ця функція приймає як аргумент число і встановлює його
// як ліміт транзакцій на картці
// card3.setTransactionLimit(5000);
// transferCredits.
//     Ця функція отримує два аргументи - кількість кредитів, які потрібно передати,
//     та карту одержувача (інший об’єкт, створений функцією `userCard` - card1):
// card3.transferCredits(50, card1);
// Кошти, які ви хочете передати, повинні обкладатися податками 0,5%.
// Не забудьте перед перерахуванням перевірити залишок балансу та ліміт
// транзакцій відправника кредитів (card3).Ви повинні відслідковувати тільки Put credits/Take credits/Transaction limit
// change операції і зберігайте history log. History log (Дивитись зображення 1)
// інформація має зберігатись в об’єктах з такими властивостями:
//     • operationType (стрічка яка описує здійснену операцію)
// • credits (кількість коштів)
// • operationTime (формат: "27/07/2018, 03:24:53". Час коли була здійснена операція)
// Зображення 1 — Приклад виклику функції
// getCardOptions
class UserAccount {
    constructor(name, cards) {
        this.name = name;
        this.cards = [];
    }

    addCard() {
        const card = userCard().getCardOptions();
        this.cards.push(card);
    }

    getCardByKey(number) {
        const card=userCard(number);
        card.getCardOptions().key=number;
        // console.log(card.getCardOptions());
        return card;
    }
}

const user = new UserAccount('Bob');
user.addCard()
user.addCard()
let card1 = user.getCardByKey(1);
let card2 = user.getCardByKey(2);
card1.putCredits(500);
card1.setTransactionLimit(800);
card1.transferCredits(300, card2);
card2.takeCredits(50);
console.log(card1.getCardOptions());
console.log(card2.getCardOptions());
// 2) Створити UserAccount:
//     Створити класс `UserAccount` (для цього завдання можна використати ES6 класс
// або звичайну функцію):
// const user = new UserAccount('Bob');
// Класс має містити:
//     Властивості акаунту користувача:
//     - name (передати в конструкторі)
// - cards (Масив карток користувача. Масив не має бути довшим ніж 3)
// Методи акаунту користувача:
//     - addCard. Створює нову карту (використовуйте ‘userCard’ функцію) та додайте її до
// cards:
//     user.addCard();
// Користувач повинен мати <= 3 карти.
// - getCardByKey. Приймає число в діапазоні {1; 3} і повертає об’єкт карти
// /*
// * Повертає об’єкт {
// * key: 1,
// * balance: 150,
// * ...other card properties
// * }
// */
// user.getCardByKey(1);
// КодПриклад переказу коштів:
//     let user = new UserAccount('Bob');
// user.addCard()
// user.addCard()
// let card1 = user.getCardByKey(1);
// let card2 = user.getCardByKey(2);
// card1.putCredits(500);
// card1.setTransactionLimit(800);
// card1.transferCredits(300, card2);
// card2.takeCredits(50);
// console.log(card1.getCardOptions()); // див зображення 2
// Зображення 2 - Об’єкт властивостей card1
// console.log(card2.getCardOptions()); // див зображення 3
// Зображення 3 - Об’єкт властивостей card2
// Посилання
// - https://css-tricks.com/javascript-scope-closures/
// - https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Classes


