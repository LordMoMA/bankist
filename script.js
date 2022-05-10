'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    }${type}</div>
          <div class="movements__value">${mov}$</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} $`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes}$`;

  const outflows = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(outflows)}$`;

  const interests = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumInterest.textContent = `${interests}$`;
};

const createUserNames = function (accts) {
  accts.forEach(function (acct) {
    acct.username = acct.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);
// console.log(accounts);

const updateUI = function (acc) {
  // display movements
  displayMovements(acc.movements);
  //display balance
  calcDisplayBalance(acc);

  //display summary
  calcDisplaySummary(acc);
};

//Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.defaultPrevented();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => (acc.username = currentAccount.username)
    );
    // delete account
    accounts.splice(index, 1);

    // hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.defaultPrevented();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);
    // update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// for (const acc of accounts) {
//     if acc.owner === 'Jonas Schmedtmann'
//     console.log(acc);
// }

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const max = movements.reduce((acc, mov) => {
//     if (acc > mov) return acc;
//     else return mov;
// }, );
// console.log(max);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////
// console.log('---- FOREACH ----');
// movements.forEach(function(mov, i) {
//     if (mov > 0) {
//         console.log(`Movement ${i + 1}: You deposited ${mov}`);
//     } else {
//         console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);

//     }
// });
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;

// let dogsJulia = [3, 5, 2, 12, 7];
// let dogsKate = [4, 1, 15, 8, 3];

// const checkDogs = function(dogsJulia, dogsKate) {
//     const dogsJuliaCorrect = dogsJulia.slice(1, -2);
//     const dogsCorrect = dogsJuliaCorrect.concat(dogsKate);
//     dogsCorrect.forEach(function(age, i) {
//         if (age >= 3) {
//             console.log(`Dog number ${i+1} is an adult, and is ${age} years old`);
//         } else {
//             console.log(`Dog number ${i+1} is still a puppy 🐶`);
//         }
//     });
// };

// // checkDogs(dogsJulia, dogsKate);

// let ages1 = [5, 2, 4, 1, 15, 8, 3];
// let ages2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function(ages) {
//     avgAge = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4).filter(age => age >= 18).reduce((acc, age, i, arr) => (acc + age) / arr.length, 0)

//     const humanAge = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
//     const ageAbove18 = humanAge.filter(age => age >= 18);
//     const avgAge = ageAbove18.reduce((acc, age) => acc + age, 0) / ageAbove18.length;
//     return avgAge;

// }

// console.log(calcAverageHumanAge(ages1));
// console.log(calcAverageHumanAge(ages2));

// const calcAverageHumanAge = function(ages) {
//     const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//     const adults = humanAges.filter(age => age >= 18);
//     console.log(humanAges);
//     console.log(adults);

//     // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

//     const average = adults.reduce(
//         (acc, age, i, arr) => acc + age / arr.length,
//         0
//     );

//     // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5

//     return average;
// };
// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

// // const movementsUSD = movements.map(function (mov) {
// //   return mov * eurToUsd;
// // });

// const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// const movementsDescriptions = movements.map(
//     (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementsDescriptions);
