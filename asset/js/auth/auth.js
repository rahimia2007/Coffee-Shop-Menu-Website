import { showAccessModal } from "../utils.js";

const signInBtn = document.getElementById("sign-in-btn");
const signInEmail = document.getElementById("sign-in-email");
const signInPassword = document.getElementById("sign-in-password");
const signInErrorMessage = document.getElementById("sign-in-error-message");

const createAccountFullName = document.getElementById(
  "create-account-full-name",
);
const createAccountEmail = document.getElementById("create-account-email");
const createAccountPassword = document.getElementById(
  "create-account-password",
);
const createAccountConfirmPassword = document.getElementById(
  "create-account-confirm-password",
);
const createAccountErrorMessage = document.getElementById(
  "create-account-error-message",
);
const createAccountBtn = document.getElementById("create-account-btn");

const fullNameRejex = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;
const emailRejex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRejex = /^[A-Za-z0-9]{6,}$/;

const signIn = async () => {
  const signInEmailValue = signInEmail.value.trim();
  const signInPasswordValue = signInPassword.value.trim();

  if (
    emailRejex.test(signInEmailValue) &&
    passwordRejex.test(signInPasswordValue)
  ) {
    const usersResponse = await fetch(
      "https://bqpbxsyxslyednegacov.supabase.co/rest/v1/users?select=*",
      {
        headers: {
          apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
          Authorization:
            "Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
        },
      },
    );

    const users = await usersResponse.json();
    const findUser = users.find(
      (user) =>
        user.email === signInEmailValue &&
        user.password === signInPasswordValue,
    );
    if (findUser) {
      document.cookie = `userId=${findUser.id};path=/;max-age=1209600;`;
      hideSignInModal();
      showAccessModal(
        "circle-check-big",
        "Welcome back!",
        "Good to see you again.",
      );
    } else {
      hideSignInModal();
      showAccessModal(
        "user-x",
        "Account not found!",
        "We couldn't find an account matching that email and password. Check your details or create a new account.",
      );
    }
  } else if (!signInEmailValue || !signInPasswordValue) {
    signInErrorMessage.classList.remove("hidden");
    signInErrorMessage.innerHTML = "Please fill in all required fields.";
  } else if (!emailRejex.test(signInEmailValue)) {
    signInErrorMessage.classList.remove("hidden");
    signInErrorMessage.innerHTML = "Please enter the email correctly.";
  } else if (!passwordRejex.test(signInPasswordValue)) {
    signInErrorMessage.classList.remove("hidden");
    signInErrorMessage.innerHTML = "Password must be at least 6 characters.";
  }
};

const createAccount = async () => {
  const createAccountFullNameValue = createAccountFullName.value.trim();
  const createAccountEmailValue = createAccountEmail.value.trim();
  const createAccountPasswordValue = createAccountPassword.value.trim();
  const createAccountConfirmPasswordValue =
    createAccountConfirmPassword.value.trim();

  if (
    fullNameRejex.test(createAccountFullNameValue) &&
    emailRejex.test(createAccountEmailValue) &&
    passwordRejex.test(createAccountPasswordValue) &&
    createAccountPasswordValue === createAccountConfirmPasswordValue
  ) {
    const newUser = {
      full_name: createAccountFullNameValue,
      email: createAccountEmailValue,
      password: createAccountPasswordValue,
      position_id: "9a88516c-f6da-4880-95f5-267ceb96fd69",
    };

    const createAccountResponse = await fetch(
      `https://bqpbxsyxslyednegacov.supabase.co/rest/v1/users`,
      {
        method: "POST",
        headers: {
          apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
          Authorization:
            "Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(newUser),
      },
    );

    if (createAccountResponse.status == 201) {
      hideSignInModal();
      showAccessModal(
        "circle-check-big",
        "Account created!",
        "You're all set. Enjoy your visit.",
      );
    }
  } else if (
    !createAccountFullNameValue ||
    !createAccountEmailValue ||
    !createAccountPasswordValue ||
    !createAccountConfirmPasswordValue
  ) {
    createAccountErrorMessage.classList.remove("hidden");
    createAccountErrorMessage.innerHTML = "Please fill in all required fields.";
  } else if (!fullNameRejex.test(createAccountFullNameValue)) {
    createAccountErrorMessage.classList.remove("hidden");
    createAccountErrorMessage.innerHTML =
      "Please enter the full name correctly.";
  } else if (!emailRejex.test(createAccountEmailValue)) {
    createAccountErrorMessage.classList.remove("hidden");
    createAccountErrorMessage.innerHTML = "Please enter the email correctly.";
  } else if (!passwordRejex.test(createAccountPasswordValue)) {
    createAccountErrorMessage.classList.remove("hidden");
    createAccountErrorMessage.innerHTML =
      "Password must be at least 6 characters.";
  } else if (createAccountPasswordValue !== createAccountConfirmPasswordValue) {
    createAccountErrorMessage.classList.remove("hidden");
    createAccountErrorMessage.innerHTML = "Passwords do not match.";
  }
};

signInBtn.addEventListener("click", signIn);
createAccountBtn.addEventListener("click", createAccount);
