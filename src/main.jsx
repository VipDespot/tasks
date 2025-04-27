import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";


///// function getSum

// const obj = {
//   a: 3,
//   b: 'test',
//   c: {
//     inner: 25
//   }
// }

// const getSum = (obj) => {
//    let  sum = 0
//    for (const key in obj) {
//     let value  = obj[key]
//     if ( typeof value === 'number') {
//       sum += value} else if (typeof value === 'object' &&  value !== null) {
//       sum += getSum(value)
//     }
//    }
//    return sum
// }
// const res = getSum(obj)
// console.log(res)



// Написать функцию processProducts, которая возвращает массив из 3 строк, описывающих самые дорогие товары по убыванию цены. Товары из этой выборки также не должны относиться к категории Stationery:


// const products = [
//   { name: "Laptop", category: "Electronics", price: 1500 },
//   { name: "Pen", category: "Stationery", price: 2 },
//   { name: "Smartphone", category: "Electronics", price: 800 },
//   { name: "Notebook", category: "Stationery", price: 550 },
//   { name: "TV", category: "Electronics", price: 400 },
//   { name: "Bag", category: "Accessories", price: 30 },
// ];

// function processProducts(products) {
//   return products
//     .filter((product) => product.category === "Stationery")
//     .sort((a, b) => b.price - a.price)
//     .slice(0, 3)
//     .map((product) => `${product.name}: $${product.price}`);
// }
// console.log(processProducts(products));


/// function customap


// function customMap(array, callback) {
//   const result = [];
//   for (let i = 0; i < array.length; i++) {
//     const newValue = callback(array[i], i, array);
//     result.push(newValue);
//   }
//   return result;
// }
// Array.prototype.customMap = function (callback) {
//   return customMap(this, callback);
// };

// const numbers = [1, 2, 3, 4];
// const doubled = customMap(numbers, (n) => n * 2);
// const anotherDoubled = [1, 2, 3, 4].customMap((n) => n * 2);
// console.log(doubled);
// console.log(anotherDoubled);



///////////////////////


// const object1 = {};
// const a = Symbol("a");
// const b = Symbol.for("b");

// object1[a] = "localSymbol";
// object1[b] = "globalSymbol";

// const objectSymbols = Object.getOwnPropertyDescriptors(object1);

// console.log(objectSymbols);
// console.log(object1);



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


const fetchData = (id, delay) => new Promise ((resolve, reject) => {
  if (id <= 3 ) setTimeout(() => resolve({name:`user ${id}`, delay}))
  else reject({name: 'not fuck', id})
})

Promise.race([
  fetchData(1, 3000),
  fetchData(2, 3000),
  fetchData(3, 6000),
  fetchData(4, 3000)
]).then(data => console.log(data))
.catch(error => console.log(error));

Promise.allSettled([
])

// Получить пользователя, затем его заказы

let res 

// const  fetchDat = async () => {
//   let promise = await fetch('https://fakestoreapi.com/products')
//   .then(data => data.json())
//   .then(res2 => console.log(res2))

//   res = await promise()
// }

console.log(res)
  // .then(user => fetch(`/api/orders/${user.id}`))
  // .then(response => response.json())
  // .then(orders => console.log(orders));




// const fetchUser = (id, delay) => new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (id === 4) reject('User not found');
//     else resolve({ id, name: `User ${id}` });
//   }, delay);
// });

// Promise.all([
//   fetchUser(1, 100),
//   fetchUser(2, 200),
//   fetchUser(3, 50) // Этот промис завершится первым с ошибкой
// ])
//   .then(users => console.log('All users:', users))
//   .catch(error => console.error('Error:', error)); // Error: User not found

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
