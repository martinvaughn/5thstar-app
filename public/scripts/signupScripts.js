var passwordInput = document.getElementById("signup-password");
passwordInput.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        const protectionContainer = document.getElementById("protection-container");
        const signupForm = document.getElementById("signup-formy");
        const signupPassword = document.getElementById("signup-password")
        const signupContainer = document.getElementById("container-signup")
        if (e.target.value === "123456") {
            protectionContainer.style.display = "none";
            signupContainer.style.height = "700px";
            signupForm.style.display = "flex";
        } else {
            passwordInput.style.animationName = "shake, glow-red";
            setTimeout(() => {
                signupPassword.style.animationName = "none";
            }, 500)
        }                                          
    }
});