export function validateEmail(email) {
    // Regular expression for validating an email address
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  
    return emailRegex.test(email);
  }