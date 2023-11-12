const switchs = document.querySelectorAll('.switch-btn');

if (switchs){
    switchs.forEach(swith => {
        const pin = swith.dataset.pin;
        swith.addEventListener(
            'click',
            () => {
                if (swith.classList.contains('switch-on')){
                    send(pin + ',' + '0|')
                    swith.classList.remove('switch-on');
                } else {
                    send(pin + ',' + '1|');
                    swith.classList.add('switch-on')
                }
            }
        )
    })
}

const inputs = document.querySelectorAll('input[type="range"]');
console.log(inputs)
if (inputs){
    inputs.forEach(input => {
        console.log(input)
        const pin = input.dataset.pin;
        input.addEventListener('change', () => {
            send(pin +','+ input.value +'|');
        })
    })
}




let fs = true;


const rangeInputs = document.querySelectorAll('input[type="range"]')
let isRTL = document.documentElement.dir === 'rtl'

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  let percentage = (val - min) * 100 / (max - min)
  if (isRTL) {
    percentage = (max - val) 
  }

  target.style.backgroundSize = percentage + '% 100%'
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})

rangeInputs.forEach(input => {
    input.style.backgroundSize = '100%';
})

// Handle element change, check for dir attribute value change
function callback(mutationList, observer) {  mutationList.forEach(function(mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
      isRTL = mutation.target.dir === 'rtl'
    }
  })
}

// Listen for body element change
const observer = new MutationObserver(callback)
observer.observe(document.documentElement, {attributes: true})
