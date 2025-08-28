function showOrNot(id) {
                var x = document.getElementById(id);
                if (x.className.indexOf("w3-show") == -1) {
                    x.className += "w3-show";
                }
                else{ 
                    x.className = x.className.replace("w3-show", " ");
                }
            }

            function checkAnswer(reponse){
                let answer = document.getElementById("mdp").value.toLowerCase();  
                if (answer==""){
                    alert("Il faut quand même proposer un mot de passe avant de le soumettre ! ")
                }
                else if (answer == reponse){
                    window.location.href =`${reponse}.html`;
                }
                else{
                    alert("Ce n'est pas le bon mot de passe. Essaye encore, ne désespère pas. Au pire tu peux m'appeler pour un indice, au fond ça n'est qu'un jeu :) JMV")
                }
            }