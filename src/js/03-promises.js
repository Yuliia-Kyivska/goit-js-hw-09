import Notiflix from 'notiflix';
// задержка времени
let delay = document.querySelector('#delay');
// шаг
let step = document.querySelector('#step');
// значение
let amount = document.querySelector('#amount');

let submitForm = document.querySelector('.form');
submitForm.addEventListener('submit', callСreatePromise);

function callСreatePromise(e) {
  e.preventDefault();
  const count = parseInt(amount.value);

  console.log(count);

  // i это position
  for (let i = 0; i < count; i++) {
    createPromise(i + 1, parseInt(delay.value) + (step.value * i));
  }
  
}

function createPromise(position, delay) {

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({
          position: position,
          delay: delay
        });
      } else {
        reject({
          position: position,
          delay: delay
        });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
     Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  return promise;
}









// const isSuccess = true;

// const promise = new Promise((resolve, reject) => { 
// setTimeout(() => {
//     if (isSuccess) {
//       resolve("Success! Value passed to resolve function");
//     } else {
//       reject("Error! Error passed to reject function");
//     }
// }, 1500);
  
  
//   createPromise(position, delay)
// });



