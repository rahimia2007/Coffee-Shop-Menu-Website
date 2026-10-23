const signInBtn = document.getElementById("sign-in-btn");
const signInEmail = document.getElementById("sign-in-email");
const signInPassword = document.getElementById("sign-in-password");

const signIn = async () => {
  const signInEmailValue = signInEmail.value.trim();
  const signInPasswordValue = signInPassword.value.trim();

  const emailRejex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRejex = /^[A-Za-z0-9]{6,}$/;

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
    }
  }
};

signInBtn.addEventListener("click", signIn);
