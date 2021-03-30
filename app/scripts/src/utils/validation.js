class Validation {
  static validateForm(form) {
    const inputs = form.querySelectorAll('[data-validation]');
    inputs.forEach((input) => {
      Validation.validateInput(input);
    });
  }

  static isFormValid(form) {
    const arr = [];
    const inputs = form.querySelectorAll('[data-validation]');

    inputs.forEach((input) => {
      const valid = Validation.validateInput(input);
      arr.push(valid);
    });

    const result = [... new Set(arr)];

    return result.length <= 1 && result[0] === true;
  }

  static validateInput(input) {
    const errors = Validation.getInputErrors(input);
    const label = input.parentNode;

    if (errors.length > 0) {
      if (!label.classList.contains('error')) {
        Validation.addErrorMessage(input, errors[0]);
        Validation.addErrorClass(input);
      } else {
        Validation.updateErrorMessage(input, errors[0]);
      }

      return false;
    } else {
      Validation.removeErrorMessage(input);
      Validation.removeErrorClass(input);

      return true;
    }
  }

  static addErrorClass(input) {
    const label = input.parentNode;
    label.classList.add('error');
    if (input.value === '') label.classList.add('error-empty');
  }

  static addErrorMessage(input, error) {
    const label = input.parentNode;
    const message = document.createElement('span');
    message.className = 'form-field__message';
    message.innerHTML = error;
    label.append(message);
  }

  static updateErrorMessage(input, error) {
    const label = input.parentNode;
    label.getElementsByClassName('form-field__message')[0].innerHTML = error;
  }

  static removeErrorMessage(input) {
    const label = input.parentNode;
    if (label.classList.contains('error')) {
      const message = label.getElementsByClassName('form-field__message')[0];
      label.removeChild(message);
    }
  }

  static removeErrorClass(input) {
    const label = input.parentNode;
    if (label.classList.contains('error')) label.classList.remove('error');
    if (input.value !== '') label.classList.remove('error-empty');
  }

  static getInputErrors(input) {
    const errors = [];
    const rules = input.getAttribute('data-validation').split(',');
    rules.forEach((rule) => {
      const error = Validation[rule](input);
      if (error) {
        errors.push(error);
      }
    });

    return errors;
  }

  static isNotEmpty(input) {
    if (!input.value) return `Поле не должно быть пустым`;
  }

  static isValidAge(input) {
    if (!input.value) {
      if (input.value.split('').length > 2) return `Допустимые значения от 0 до 99 лет`;
    }
  }

  static isValidEmail(input) {
    const regex = RegExp(/.+@.+\..+/i);
    if (!regex.test(input.value.toLowerCase())) return `Введите корректный e-mail`;
  }

  static isValidPhone(input) {
    const regex = RegExp(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm);
    if (!regex.test(input.value)) return `Номер телефона введен неверно`;
  }

  static init() {
    const inputs = document.querySelectorAll('[data-validation]');
    inputs.forEach((input) => {
      let label = input.parentNode;
      // input.addEventListener('focusout', () => {
      //   Validation.validateInput(input);
      // });
      input.addEventListener('change', () => {
        if (label.classList.contains('error')) {
          Validation.validateInput(input);
        }
      });
      input.addEventListener('input', () => {
        if (label.classList.contains('error')) {
          Validation.validateInput(input);
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => Validation.init());

window.Validation = Validation;
