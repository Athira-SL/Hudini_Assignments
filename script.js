document.addEventListener('DOMContentLoaded', () => {

  const screen = document.querySelector('#screen');
  const buttons = document.querySelectorAll('.btn');
  const equals = document.querySelector('#equals');
  const clear = document.querySelector('#clear');

  buttons.forEach((button) => {

    button.addEventListener('click', (event) => {
      const value = event.target.textContent;
      screen.value += value;
    });
  });

  equals.addEventListener('click', () => {
    try {
      screen.value = eval(screen.value);
    } catch (error) {
      screen.value = 'Error';
    }
  });

  clear.addEventListener('click', () => {
    screen.value = ''; 
  });
});
