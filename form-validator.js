const submit = document.querySelector('.btn_form');
submit.classList.add('btn_form_disabled');

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const street = document.getElementById('street');
const housenumber = document.getElementById('housenumber');
const flatnumber = document.getElementById('flatnumber');
const radio = document.querySelector('input[type=radio]');

const init = () => {
  const submit = document.querySelector('.btn_form');
  submit.addEventListener('click', submitHandler);

  const form = document.querySelector('form');
  form.addEventListener('submit', submitHandler);
  form.addEventListener('focus', focusHandler, true);
  form.addEventListener('blur', blurHandler, true)
}

let fails = ['firstname', 'lastname', 'street', 'datePicker', 'housenumber', 'flatnumber', 'radio'];

const submitHandler = event => {
  event.preventDefault();
}


const focusHandler = event => {
  event.preventDefault();
}

const addErrorClass = target => {
  target.classList.add('input_error');
  target.parentElement.classList.add('error');
  target.parentElement.setAttribute('data-errormsg', 'The field is invalid')
}

const removeErrorClass = target => {
  target.classList = '';
  target.parentElement.classList.remove('error');
}

const blurHandler = event => {
  event.preventDefault();
  const target = event.target;
  console.log(target.type === 'radio')

  if (target.id === 'firstname') {
    if (!/^[A-Za-z]{4,}$/.test(firstname.value)) {
      addErrorClass(target);
      if (!fails.includes(target.id)) fails.push(target.id);
    } else {
      removeErrorClass(target);
      fails = fails.filter(el => el != target.id);
    };
  }
  
  if (target.id === 'lastname') {
    if (!/^[A-Za-z]{5,}$/.test(lastname.value)) {
      addErrorClass(target);
      if (!fails.includes(target.id)) fails.push(target.id);
    } else {
      removeErrorClass(target);
      fails = fails.filter(el => el != target.id);
    };
  }

  if (target.id === 'datePicker') {
    if (!target.value) {
      addErrorClass(target);
      if (!fails.includes(target.id)) fails.push(target.id);
    } else {
      removeErrorClass(target);
      fails = fails.filter(el => el != target.id);
    };
  }

  if (target.id === 'street') {
    if (!/^[A-Za-z0-9]{5,}$/.test(street.value)) {
      addErrorClass(target);
      if (!fails.includes(target.id)) fails.push(target.id);
    } else {
      removeErrorClass(target);
      fails = fails.filter(el => el != target.id);
    };
  }

  if (target.id === 'housenumber') {
    if (!/^\d+$/.test(housenumber.value)) {
      addErrorClass(target);
      if (!fails.includes(target.id)) fails.push(target.id);
    } else {
      removeErrorClass(target);
      fails = fails.filter(el => el != target.id);
    };
  }


  if (target.id === 'flatnumber') {
    if (!/^[1-9]+[0-9-]*$/.test(housenumber.value)) {
      addErrorClass(target);
      if (!fails.includes(target.id)) fails.push(target.id);
    } else {
      removeErrorClass(target);
      fails = fails.filter(el => el != target.id);
    };
  }


  if (target.type === 'radio') {
    const checked = document.querySelector('input[type=radio]:checked');
    console.log('checked', checked)
    if (checked === null) {
      addErrorClass(target);
    } else {
      removeErrorClass(target);
      fails = fails.filter(el => el != target.type);
    }
  }

  console.log(fails);
  if (fails.length === 0) {
    submit.classList.remove('btn_form_disabled');
    submit.setAttribute('disabled', false);
  } else {
    submit.classList.add('btn_form_disabled');
    submit.setAttribute('disabled', true);
  }
}  

const datePicker = document.getElementById("datePicker");
const tomorrow = new Date(Date.now() + (3600 * 1000 * 24)).toISOString().split("T")[0];
datePicker.setAttribute('min', tomorrow);

// const select = document.getElementById('gift');
// const maxOptions = 2;
// let optionCount = 0;
// for (let i = 0; i < select.length; i++) {
//   if (select[i].selected) {
//     optionCount++;
//     if (optionCount > maxOptions) {
//       alert("validation failed, not submitting")
//       return false;
//     }
//   }
// }
// return true;

document.addEventListener('DOMContentLoaded', init)
