document.addEventListener('DOMContentLoaded', () => 
  {
  const screen = document.querySelector('#screen');
  const buttons = document.querySelectorAll('.btn');
  const equals = document.querySelector('#equals');
  const clear = document.querySelector('#clear');
  screen.value = '0';

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const value = event.target.textContent;
        if(screen.value === '0') {
          screen.value=value;
        }
        else {
          screen.value += value;
        }
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
    screen.value = '0';
  });
});
