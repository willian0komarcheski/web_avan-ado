document.addEventListener("DOMContentLoaded", function() {
    const raceForm = document.getElementById("raceForm");
    const karts = document.querySelectorAll(".kart");
    const pista = document.querySelector(".pista");
    const pistaWidth = pista.offsetWidth;
    let winnerDeclared = false;
    let kartPositions = [];
    let money = 10;

    const moneyDisplay = document.getElementById("money");
    moneyDisplay.textContent = "Dinheiro: " + money;

    let formData;
    
    function moveKarts(winnerKartIndex) {
        if (!winnerDeclared) {
            karts.forEach((kart, index) => {
                let currentPosition = kart.offsetLeft;
                if (index === winnerKartIndex) {
                    newPosition = pistaWidth - kart.offsetWidth;
                } else {
                    let randomDistance = Math.floor(Math.random() * 110);
                    let newPosition = currentPosition + randomDistance;
                    newPosition = newPosition <= pistaWidth - kart.offsetWidth ? newPosition : pistaWidth - kart.offsetWidth;
                    kart.style.left = newPosition + "px";
                    kartPositions[index] = newPosition;
                }
            });

            checkWinner();
        }
    }

    function checkWinner() {
        let maxPosition = Math.max(...kartPositions);
        let winnerIndex = kartPositions.indexOf(maxPosition);
        if (maxPosition >= pistaWidth - karts[winnerIndex].offsetWidth) {
            alert("O kart " + (winnerIndex + 1) + " venceu!");
            winnerDeclared = true;
            const kartSelected = parseInt(formData.get("kart"), 10);
            if(winnerIndex + 1 === kartSelected) {
                money += parseInt(formData.get("betAmount"), 10);
            } else {
                money -= parseInt(formData.get("betAmount"), 10);
            }
            moneyDisplay.textContent = "Dinheiro: " + money;
            setTimeout(restartGame, 1000);
        } else {
            console.log("O kart " + (winnerIndex + 1) + " está na liderança!");
            setTimeout(() => moveKarts(winnerIndex), 500);
        }
    }

    function restartGame() {
        winnerDeclared = false;
        kartPositions = Array.from({ length: karts.length }, () => 0);
        karts.forEach((kart) => {
            kart.style.left = "0px";
                });
        raceForm.reset();
    }

    raceForm.addEventListener("submit", function(event) {
        event.preventDefault();
        formData = new FormData(event.target);
        const kartSelected = parseInt(formData.get("kart"), 10);
        const betAmount = parseInt(formData.get("betAmount"), 10);
        console.log("Você escolheu o kart " + kartSelected + " e apostou " + betAmount + " dinheiro.");

        winnerDeclared = false;
        kartPositions = Array.from({ length: karts.length }, () => 0);

        const chosenKart = karts[kartSelected - 1];
        chosenKart.style.left = "0px";
        kartPositions[kartSelected - 1] = 0;

        moveKarts(0);
    });
});
