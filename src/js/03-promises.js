import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formPromise = document.querySelector('.form');
const DataPromise = {
  delay: 0,
  step: 0,
  amount: 0,
};
// let promise;

function createPromise(position, delay) {
  // console.log('position', position);
  // console.log('delay', delay);

  const pr = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => {
        // resolve(`Fulfilled promise ${position} in ${delay} ms`);
        resolve({ position, delay });
      }, delay);
    } else {
      setTimeout(() => {
        const err = new Error(`Reject Promise ${position} in ${delay} ms`);
        reject(err);
      }, delay);
    }
  });
  return pr;
}

formPromise.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  DataPromise.delay = form.elements.delay.value * 1;
  DataPromise.step = form.elements.step.value * 1;
  DataPromise.amount = form.elements.amount.value * 1;
  for (let pos = 0; pos < DataPromise.amount; pos += 1) {
    createPromise(pos + 1, DataPromise.delay + (pos * DataPromise.step))
      .then(({ position, delay }) => {
        console.log(`Fulfilled promise ${position} in ${delay} ms`);
        Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
      }).catch((err) => {
        console.log(err.message);
        Notify.failure(err.message);
      });
  }
});
