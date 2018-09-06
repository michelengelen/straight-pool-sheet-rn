/**
 * check if the input is empty or not
 *
 * @param   {string} str
 * @return  {boolean}
 */
function isEmpty(str) {
  return (!str || 0 === str.length);
}

/**
 * validate the e-mail (if it follows normal e-mail-adress formats)
 *
 * @param   {string} email
 * @return  {boolean}
 */
function validateEmail(email) {
  /* eslint-disable-next-line no-useless-escape */
  let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  return filter.test(email);
}

/**
 * password has to be at least 6 characters
 *
 * @param   {string} password
 * @return  {boolean}
 */
function validatePassword(password) {
  return password.length > 6;
}

/**
 * check if passwords match
 *
 * @param   {string} confirmPassword
 * @param   {string} password
 * @return  {boolean}
 */
function confirmPassword(confirmPassword, password) {
  return confirmPassword === password;
}

/**
 * validates the form
 *
 * @param   {object} form
 * @return  {{success: boolean, error}}
 */
function validateForm(form) {
  let error = {};
  let success = true;

  let keys = Object.keys(form);
  let length = keys.length;

  keys.slice(0, length).map((field) => {
    if (field !== 'error') {
      let {type, value} = form[field];
      if (isEmpty(value)) {
        error[field] = 'Your ' + field + ' is required';
        success = false;
      } else {
        error[field] = '';

        if (type === 'email' && !validateEmail(value)) {
          error[field] = 'Enter a valid email address';
          success = false;
        } else if (type === 'password' && !validatePassword(value)) {
          error[field] = 'Password must be at least 6 characters';
          success = false;
        } else if (type === 'confirm_password' && !confirmPassword(value, form['password']['value'])) {
          error[field] = 'Password does not match.';
          success = false;
        }
      }
    }
  });

  return {success, error};
}

export {
  isEmpty,
  validateEmail,
  validatePassword,
  confirmPassword,
  validateForm,
};
