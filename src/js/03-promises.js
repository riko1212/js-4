import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmount = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  const promise = new Promise((resolve, regect) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      setTimeout(() => {
        regect({ position, delay });
      }, delay);
    }
  });
  return promise;
}
const showStats = e => {
  e.preventDefault();
  let newDelay = +inputDelay.value;
  for (let i = 1; i <= inputAmount.value; i += 1) {
    newDelay += +inputStep.value;
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};

form.addEventListener('submit', showStats);
