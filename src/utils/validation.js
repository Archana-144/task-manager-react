if (

  !validateEmptyFields(

    name,

    email,

    password

  )

) {

  setMessage(

    "All fields are required"

  );

  return;
}

if (!validateName(name)) {

  setMessage(

    "Name must contain at least 3 characters"

  );

  return;
}

if (!validateEmail(email)) {

  setMessage("Enter valid email");

  return;
}

if (!validatePassword(password)) {

  setMessage(

    "Password must contain 6+ chars, 1 uppercase and 1 number"

  );

  return;
}