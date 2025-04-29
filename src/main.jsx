/* eslint-disable no-undef */
/* eslint-disable no-async-promise-executor */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

///// function getSum

const obj = {
  a: 3,
  b: "test",
  c: {
    inner: 25,
  },
};

const getSum = (obj) => {
  let sum = 0;
  for (const key in obj) {
    let value = obj[key];
    if (typeof value === "number") {
      sum += value;
    } else if (typeof value === "object" && value !== null) {
      sum += getSum(value);
    }
  }
  return sum;
};
const res = getSum(obj);
console.log(res);

// Написать функцию processProducts, которая возвращает массив из 3 строк, описывающих самые дорогие товары по убыванию цены. Товары из этой выборки также не должны относиться к категории Stationery:

const products = [
  { name: "Laptop", category: "Electronics", price: 1500 },
  { name: "Pen", category: "Stationery", price: 2 },
  { name: "Smartphone", category: "Electronics", price: 800 },
  { name: "Notebook", category: "Stationery", price: 550 },
  { name: "TV", category: "Electronics", price: 400 },
  { name: "Bag", category: "Accessories", price: 30 },
];

function processProducts(products) {
  return products
    .filter((product) => product.category === "Stationery")
    .sort((a, b) => b.price - a.price)
    .slice(0, 3)
    .map((product) => `${product.name}: $${product.price}`);
}
console.log(processProducts(products));

/// function customap

function customMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const newValue = callback(array[i], i, array);
    result.push(newValue);
  }
  return result;
}
Array.prototype.customMap = function (callback) {
  return customMap(this, callback);
};

const numbers = [1, 2, 3, 4];
const doubled = customMap(numbers, (n) => n * 2);
const anotherDoubled = [1, 2, 3, 4].customMap((n) => n * 2);
console.log(doubled);
console.log(anotherDoubled);

////// getUrl

function get(url, limit) {
  return new Promise(async (resolve, reject) => {
    for (let attempt = 1; attempt <= limit; attempt++) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        resolve(data);
        return;
      } catch (error) {
        if (attempt === limit) reject(error);
      }
    }
  });
}
// get("https://example.com/data", 5)
//  .then((res) => console.log(res))
//  .catch((err) => console.error(err));

////////// get(obj, path)

function getObj(obj, path) {
  const keys = path.split(".");
  let current = obj;

  for (const key of keys) {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }
    current = current[key];
  }

  return current;
}

const object = {
  a: {
    b: {
      c: "d",
    },
  },
};

console.log(getObj(object, "a.b")); // d

//////////////////////

// const p = new Promise((resolve) =>
//   setTimeout(() => {
//     console.log("Preparing Data...");
//     const backendData = {
//       server: "aws",
//       port: 200,
//       status: "working",
//     };
//     resolve(backendData);
//   }, 2000)
// );

// console.log(p);
// p.then( data => new Promise((resolve) => {
//       setTimeout(() => {
//         data.modification = true,
//         resolve(data);
//       }, 2000);
//     })
// ).then(clientData => console.log('data is preparing...', clientData ))
// console.log(p)

//  Example with Promisess

/////   Promise.all

// const fetch = (id, delay) => new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (id === 4) reject('user not found')
//        else resolve({id, name:`User ${id}`})
//   }, delay)
// })

// Promise.all([
//     fetch(1, 3000),
//     fetch(2, 3000),
//     fetch(3, 3000)
//   ]
// ).then(data => console.log('fuck you', data))
// .catch(error => console.error(error))

// Promise.race

// const fetchData = () => new Promise(resolve => {
//   setTimeout(() => resolve('Data received'), 2000);
// });

// const timeout = new Promise((_, reject) => {
//   setTimeout(() => reject('Timeout exceeded'), 1500);
// });

// Promise.race([fetchData(), timeout])
//   .then(data => console.log(data))
//   .catch(error => console.error(error)); // Timeout exceeded

// if (!Promise.[method]) {
//   Promise.[method] = function (iterable) {
//     return new Promise((resolve, reject) => {
//       // 1. Проверка на итерируемость
//       if (typeof iterable?.[Symbol.iterator] !== 'function') {
//         reject(new TypeError('Argument is not iterable'));
//         return;
//       }

//       if (iterable.length === 0) {
//         resolve(...);
//         return;
//       }

//       // 3. Инициализация данных
//       const results = [];
//       let completedCount = 0;

//       // 4. Обработка каждого элемента
//       for (const item of iterable) {
//         Promise.resolve(item).then(
//           value => {
//             // Логика для успешного промиса
//           },
//           reason => {
//             // Логика для отклоненного промиса
//           }
//         );
//       }
//     });
//   };
// }

//// PromiseAll

if (!Promise.all) {
  Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
      const results = [];
      let completed = 0;

      if (promises.length === 0) {
        resolve(results);
        return;
      }

      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((value) => {
            results[index] = value;
            completed++;

            if (completed === promises.length) {
              resolve(results);
            }
          })
          .catch(reject);
      });
    });
  };
}

////// PtomiseRace

if (!Promise.race) {
  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        Promise.resolve(promise).then(resolve).catch(reject);
      });
    });
  };
}

///////  PromuseAllSettled

if (!Promise.allSettled) {
  Promise.allSettled = function (promises) {
    return new Promise((resolve) => {
      const results = [];
      let completed = 0;

      const checkCompletion = () => {
        if (completed === promises.length) {
          resolve(results);
        }
      };

      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((value) => {
            results[index] = { status: "fulfilled", value };
          })
          .catch((reason) => {
            results[index] = { status: "rejected", reason };
          })
          .finally(() => {
            completed++;
            checkCompletion();
          });
      });

      if (promises.length === 0) resolve(results);
    });
  };
}

////////  PromiseAny

if (!Promise.any) {
  Promise.any = function (promises) {
    return new Promise((resolve, reject) => {
      const errors = [];
      let rejected = 0;

      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(resolve)
          .catch((error) => {
            errors[index] = error;
            rejected++;

            if (rejected === promises.length) {
              reject(new AggregateError(errors, "All promises were rejected"));
            }
          });
      });

      if (promises.length === 0) {
        reject(new AggregateError([], "No promises passed"));
      }
    });
  };
}

///////////// quis
1
1
1
undefined
2
1
undefined
undefined
undefined
undefined
undefined
undefined
1
1
1

//////////////
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
