const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');  // Selects any CSS Selector in a collective way

var currentInput = "";

buttons.forEach( button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if(value == "=")
        {
            try{
                currentInput = eval(currentInput).toString();
            }catch{
                currentInput = "error";
            }
        }
        else if(value == "Clear")
        {
            currentInput = "";
        }
        else
        {
            currentInput += value;
        }
        display.value = currentInput;
    });
});