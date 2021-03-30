// class Form extends Widget {
//   constructor(node) {
//     super(node, '.js-form');
//
//     this.form = this.$node;
//     this.container = this.queryElement('.container');
//     this.busy = false;
//     this.mode = 'submit';
//     this.action = this.form.dataset.apiUrl || './assets/php/send.php';
//     this.inputs = this.form.querySelectorAll('input');
//     this.textarea = this.form.querySelector('textarea') || null;
//     this.submitButton = this.form.querySelector('button[type=\"submit\"]');
//
//     this.addEvents();
//   }
//
//   addEvents() {
//     this.form.addEventListener('submit', e => {
//       if (this.busy) return e.preventDefault();
//       this.busy = true;
//
//       Validation.validateForm(this.form);
//
//       if (Validation.isFormValid(this.form)) {
//         this.loading();
//
//         const data = {};
//         const queryString = new FormData(this.form);
//
//         for (let [key, value] of queryString.entries()) {
//           if (value !== '') data[`${key}`] = `${value}`;
//         }
//
//         fetch(this.action, {
//           method: 'POST',
//           mode: 'cors',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         })
//           .then(res => {
//             this.busy = false;
//             this.toSuccess();
//
//             setTimeout(() => {
//               this.addSuccessState();
//               // this.form.reset();
//             }, 2600);
//           });
//       } else {
//         this.busy = false;
//       }
//
//       e.preventDefault();
//     });
//   }
//
//   addSuccessState() {
//     // startScrollTo(document.documentElement);
//
//     if (this.mode === 'submit') {
//       while (this.container.firstChild) {
//         this.container.firstChild.remove();
//       }
//
//       this.$node.classList.remove('_loading');
//       this.form.classList.add('_success');
//       this.container.insertAdjacentHTML('beforeend', `
//         <p>Данные успешно отправлены!</p>
//       `);
//     }
//   }
//
//   loading() {
//     setTimeout(() => {
//       this.$node.classList.add('_loading');
//
//       if (this.mode === 'submit') {
//         this.submitButton.disabled = true;
//         this.inputs.forEach(item => item.disabled = true);
//         this.textarea !== null ? this.textarea.disabled = true : null;
//       }
//     }, 300);
//   }
//
//   toSuccess() {
//     setTimeout(() => {
//       this.form.style.height = `${this.form.scrollHeight}px`;
//     }, 1800);
//   }
//
//   static init(element) {
//     new Form(element);
//   }
// }

document.addEventListener('DOMContentLoaded', () => {
  // document.querySelectorAll('.js-form').forEach(item => Form.init(item));

  const ajaxSend = async (formData) => {
    const fetchResp = await fetch('../assets/php/mail.php', {
      method: 'POST',
      body: formData
    });
    if (!fetchResp.ok) {
      throw new Error(`Ошибка по адресу ${location.href}, статус ошибки ${fetchResp.status}`);
    }
    return await fetchResp.text();
  };

  const forms = document.querySelectorAll('.js-form');
  forms.forEach(form => {
    const $stateSuccess = form.querySelector('.popup-call__success');
    const $stateFailure = form.querySelector('.popup-call__failure');
    const $stateNormal = form.querySelector('.popup-call__normal');
    const $failureBtn = form.querySelector('.js-form__failure-btn');
    const $successBtn = form.querySelector('.js-form__success-btn');

    $failureBtn.addEventListener('click', (e) => {
      e.preventDefault()

      $stateFailure.style.display = 'none';
      $stateNormal.style.display = 'block';
      // form.reset(); // очищаем поля формы
    })

    $successBtn.addEventListener('click', (e) => {
      e.preventDefault()

      setTimeout(() => {
        form.reset(); // очищаем поля формы
        $stateSuccess.style.display = 'none';
        $stateNormal.style.display = 'block';
      }, 500)
    })

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validation.validateForm(form);

      if (Validation.isFormValid(form)) {
        const formData = new FormData(this);
        // formData.append("comments", comments.value);

        for(let [name, value] of formData) {
          console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
        }

        ajaxSend(formData)
          .then((response) => {
            console.log(response);
            form.reset(); // очищаем поля формы
            $stateSuccess.style.display = 'block';
            $stateNormal.style.display = 'none';
          })
          .catch((err) => {
            console.error(err)
            $stateFailure.style.display = 'block';
            $stateNormal.style.display = 'none';
          })
      }
    });
  });

});

// window.Form = Form;

