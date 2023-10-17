"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKER APP

// Data

// function initial(str) {
//   const temp = str.split(" ");
//   let result = "";
//   for (let name of temp) {
//     result += name[0];
//   }
//   return result.split("").join("").toLowerCase();
// }

// const account1 = {
//   owner: "Hedi Rivas",
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// console.log(account1);

// const account2 = {
//   owner: "Jessica Davis",
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: "Steven Thomas Williams",
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: "Sarah Smith",
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

const account1 = {
  owner: "Hedi Rivas",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2022-11-18T21:31:17.178Z",
    "2022-12-23T07:42:02.383Z",
    "2023-01-28T09:15:04.904Z",
    "2023-04-01T10:17:24.185Z",
    "2023-05-08T14:11:59.604Z",
    "2023-09-09T17:01:17.194Z",
    "2023-09-18T23:36:17.929Z",
    "2023-09-21T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "fr-FR",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2023-01-25T14:18:46.235Z",
    "2023-02-05T16:33:06.386Z",
    "2023-04-10T14:43:26.374Z",
    "2023-09-18T18:49:59.371Z",
    "2023-09-20T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovement = function (movement, sort = false) {
  containerMovements.innerHTML = "";
  let isSorted = sort ? movement.slice().sort((a, b) => a - b) : movement;
  for (let [i, row] of isSorted.entries()) {
    let html = "";
    if (row > 0) {
      html = `<div class="movements__row">
  <div class="movements__type movements__type--deposit"> ${i + 1} deposit</div>
  <div class="movements__date">3 days ago</div>
  <div class="movements__value">${row.toFixed(2)}</div>`;
    } else {
      html = `<div class="movements__row">
  <div class="movements__type movements__type--withdrawal"> ${
    i + 1
  } withdrawal</div>
  <div class="movements__date">3 days ago</div>
  <div class="movements__value">${row.toFixed(2)}</div>`;
    }
    containerMovements.insertAdjacentHTML("afterbegin", html);
  }
};
let sorted = false;

btnSort.addEventListener("click", () => {
  displayMovement(currentAccount.movements, sorted);

  sorted = !sorted;
});

function createUsernames(accs) {
  console.log(accs);
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((el) => el[0])
      .join("");
  });
}
createUsernames(accounts);
// console.log(account3);

// FILTER

// const deposits = account1.movements.filter(function (mov) {
//   return mov > 0;
// });

// console.log(deposits);
// console.log(account1.movements);

// REDUCE

// const balance = account1.movements.reduce(function (acc, cur, i) {
//    console.log(`${i}:${acc}`);
//return acc + cur;
// });

const calcDisplayBalance = (movement) => {
  const balance = movement.reduce(function (acc, cur, i) {
    return acc + cur;
  });
  return balance;
};

const calcDisplaySummary = (movements) => {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${out}€`;

  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * `${currentAccount.interestRate}`) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// const firstWithdrawal = account1.movements.find((mov) => mov < 0);
// console.log(firstWithdrawal);
// console.log(account1.movements);

// const account = accounts.find((acc) => acc.owner === "Jessica Davis");
// console.log(account);

let currentAccount = "";

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = "1";
    calcDisplaySummary(currentAccount.movements);
    displayMovement(currentAccount.movements);
    labelBalance.textContent = `${calcDisplayBalance(
      currentAccount.movements
    )} €`;
    labelWelcome.textContent = `Welcome ${currentAccount.owner}!`;
  }
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  let amount = Number(inputTransferAmount.value);
  let receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    receiverAcc &&
    receiverAcc !== currentAccount.username &&
    calcDisplayBalance(currentAccount.movements) > inputTransferAmount.value
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

const updateUI = function (acc) {
  displayMovement(acc.movements);
  labelBalance.textContent = `${calcDisplayBalance(acc.movements)}€`;
  calcDisplaySummary(acc.movements);
};

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  let user = inputCloseUsername.value;
  let pin = Number(inputClosePin.value);

  if (user === currentAccount.username && pin === currentAccount.pin) {
    console.log("click");
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    labelWelcome.textContent = "Log in to get started";
    containerApp.style.opacity = "0";
  }
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  let loanAmount = Math.floor(Number(inputLoanAmount.value));
  let requestedAmount = currentAccount.movements.some(
    (mov) => mov >= 0.1 * loanAmount
  );
  if (loanAmount > 0 && requestedAmount) {
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
  }
});

// const round = (accs) => {
//   accs.forEach((acc) =>
//     acc.movements.map((mov) => Math.round(+mov).toFixed(2))
//   );
// };

//CodingChallenge #4

// // Import stylesheets
// import './style.css';

// // Write Javascript code!
// const appDiv = document.getElementById('app');
// appDiv.innerHTML = `<h1>Working With Arrays - #4</h1>`;

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
// // recommendedFood = weight x 0.75 x 0.75 x 28

// dogs.forEach((dog) => (dog.recommendedFood = dog.weight * 0.75 * 0.75 * 28));

// console.log(dogs);

// const saradog = dogs.find((dog) => dog.owners.includes('Sarah'));
// console.log(saradog);

// if (saradog.curFood * 1.1 > saradog.recommendedFood) {
//   console.log('Quantité excessive');
// } else if (saradog.curFood * 0.9 < saradog.recommendedFood) {
//   console.log('Quantité insuffisante');
// } else {
//   console.log('Quantité recommandé');
// }

// const ownersEatTooMuch = [];
// const ownersEatTooLittle = [];

// dogs.map((dog) =>
//   dog.curFood > dog.recommendedFood * 1.1
//     ? ownersEatTooMuch.push(dog.owners)
//     : ownersEatTooLittle.push(dog.owners)
// );
// const messageTooMuch = `${ownersEatTooMuch
//   .flat()
//   .join("'s, ")}'s dogs eat too much.`;
// const messageTooLittle = `${ownersEatTooLittle
//   .flat()
//   .join(', ')}'s dogs eat too little.`;
// console.log(messageTooMuch);
// console.log(messageTooLittle);

// console.log(dogs.map((dog) => dog.curFood === dog.recommendedFood));

// console.log(
//   dogs.map(
//     (dog) =>
//       dog.curFood < dog.recommendedFood * 1.1 && dog.recommendedFood * 0.9
//   )
// );
