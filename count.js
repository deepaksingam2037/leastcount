
    let players = [];

    function addPlayer() {

      let name = document.getElementById("playerName").value;

      if (name === "") {
        alert("Enter player name");
        return;
      }

      players.push({
        name: name,
        total: 0,
        eliminated: false
      });

      document.getElementById("playerName").value = "";

      displayPlayers();
    }

    function addScore(index) {

      let scoreInput = document.getElementById(`score-${index}`);
      let score = parseInt(scoreInput.value);

      if (isNaN(score)) {
        alert("Enter valid score");
        return;
      }

      let oldScore = players[index].total;

      players[index].total = players[index].total + score;

      alert(oldScore + " + " + score + " = " + players[index].total);

      if (players[index].total > 200) {
        players[index].eliminated = true;
      }

      scoreInput.value = "";

      displayPlayers();
    }

    function displayPlayers() {

      let container = document.getElementById("playersContainer");
      container.innerHTML = "";

      let activePlayers = 0;
      let winnerName = "";

      for (let i = 0; i < players.length; i++) {

        let player = players[i];

        if (!player.eliminated) {
          activePlayers++;
          winnerName = player.name;
        }

        container.innerHTML += `
          <div class="player-card">
            <h2>${player.name}</h2>
            <p>Total Score: <b>${player.total}</b></p>

            ${player.eliminated
              ? '<p class="eliminated">Eliminated ❌</p>'
              : '<p class="active">Still in the Game ✅</p>'}

            ${!player.eliminated
              ? `
                <input type="number" id="score-${i}" placeholder="Enter Score">
                <button onclick="addScore(${i})">Add Score</button>
              `
              : ''}
          </div>
        `;
      }

      if (activePlayers === 1 && players.length > 1) {
        document.getElementById("winner").innerHTML = `
          <div class="winner">
            Winner is ${winnerName} 🎉
          </div>
        `;
      }
    }