import { showAccessModal } from "../utils.js";

const signInBtn = document.getElementById("sign-in-btn");
const signInEmail = document.getElementById("sign-in-email");
const signInPassword = document.getElementById("sign-in-password");

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
    console.log("ok");

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
      showAccessModal("Welcome back!","Good to see you again.")
    }
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

    console.log(createAccountResponse.status);

    if (createAccountResponse.status == 201) {
      hideSignInModal();
      showAccessModal("Account created!","You're all set. Enjoy your visit.")
    }
  }
};

signInBtn.addEventListener("click", signIn);
createAccountBtn.addEventListener("click", createAccount);
