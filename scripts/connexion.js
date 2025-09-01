const errorMessage = document.getElementById('error-message');
const passWordDiv = document.getElementById('password');

passWordDiv.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        submitPassword();
    }
});

function submitPassword() {
    const password = document.getElementById('password').value;
    if (password == "napTime4ever"){
        window.location.href =`part_2.html`;
    }
    else{
        errorMessage.style.display = 'block';
        setTimeout(()=>{
            errorMessage.style.display = 'none';
            document.getElementById('password').value="";
        }, 800);
    // alert("Ce n'est pas le bon mot de passe. Essaye encore, ne désespère pas. Au pire tu peux m'appeler pour un indice, au fond ça n'est qu'un jeu :) JMV")
    }
}