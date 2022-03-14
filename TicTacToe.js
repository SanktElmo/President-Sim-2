//Methode, die ein TicTacToe in der Mitte des Bildschrirms aufbaut. Zudem wird alles für eine Runde vorbereitets
function startRebellion(){
    warOn=true
    money-=400
    stability-=10
    document.getElementById("warfield").style.display="grid"
    document.getElementById("gamefield").style.display="none"
    document.getElementById("inGame_button_backToMenu").style.color="grey"
    document.getElementById("inGame_button_backToMenu").style.borderColor="grey"
    document.getElementById("inGame_button_backToMenu").disabled=true
    innerText="<p></p>Rebellion<p></p>"
    innerText+="<img onclick='placePlayer(0); sounds(1)' src='empty.png' id='warfieldRoster0' class='warfieldButton'> <img onclick='placePlayer(1); sounds(1)' src='empty.png' id='warfieldRoster1' class='warfieldButton'> <img onclick='placePlayer(2); sounds(1)' src='empty.png' id='warfieldRoster2' class='warfieldButton'>"
    innerText+="<img onclick='placePlayer(3); sounds(1)' src='empty.png' id='warfieldRoster3' class='warfieldButton'> <img onclick='placePlayer(4); sounds(1)' src='empty.png' id='warfieldRoster4' class='warfieldButton'> <img onclick='placePlayer(5); sounds(1)' src='empty.png' id='warfieldRoster5' class='warfieldButton'>"
    innerText+="<img onclick='placePlayer(6); sounds(1)' src='empty.png' id='warfieldRoster6' class='warfieldButton'> <img onclick='placePlayer(7); sounds(1)' src='empty.png' id='warfieldRoster7' class='warfieldButton'> <img onclick='placePlayer(8); sounds(1)' src='empty.png' id='warfieldRoster8' class='warfieldButton'>"

    document.getElementById("warfield").innerHTML=innerText
    end=false
    timeOn=false
    playerturn=true
    winConditions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]]
    warfieldPositions=[0,0,0,0,0,0,0,0,0]
    updateActions()
    updateUI()

}

//Variable, die weiß, wie das Spielfeld aussieht
warfieldPositions=[0,0,0,0,0,0,0,0,0]
//Variable, die weiß, wann jemand gewinnt
winConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]

//Funktion, die ein Kreis für den Spieler platzier
function placePlayer(place){
    //falls es die Runde des Spielers ist und das gewählte Feld frei ist, wird ein Kreis platziert
    if(playerturn==true && warfieldPositions[place]==0){
        document.getElementById("warfieldRoster"+place).src="ally.png"
        playerturn=false
        warfieldPositions[place]=1
        testWin(1)
    }
}

//Funktion, die für den Gegner ein Kreuz platziert
function placeAI(){
    setTimeout(() => {
        winChance=findChance(2)
        defeatChance=findChance(1)
        //falls der Gegner gewinnen kann, wird an die entscheidende Position ein Kreuz platziert
        if(winChance[0]==true){
            document.getElementById("warfieldRoster"+winConditions[winChance[1] ][ winChance[2] ]).src="enemy.png"
            warfieldPositions[winConditions[winChance[1] ][ winChance[2] ] ]=2
        //Falls der Spieler gewinnen kann, wird dies verhindert
        }else if(defeatChance[0]==true){
            document.getElementById("warfieldRoster"+winConditions[defeatChance[1] ][ defeatChance[2] ]).src="enemy.png"
            warfieldPositions[winConditions[defeatChance[1] ][ defeatChance[2] ] ]=2
        //Falls keins der obigen Ereignisse wahr ist, wird an einer zufälligen Position en Kreuz platziert
        }else{
            while(0<1){
                placement=Math.floor(Math.random()*9)
                if(warfieldPositions[placement]==0){
                    document.getElementById("warfieldRoster"+placement).src="enemy.png"
                    warfieldPositions[placement]=2
                    break
                }
            }
        }
        testWin(2)
    }, 1000);
}

//Funktion, die prüft ob ein jemand gewinnen kann
function findChance(owner){
    chance=[false]
    //prüft alle möglichen  Gewinnchancen
    for(c=0; c<8; c++){
        if(warfieldPositions [winConditions[c][0]]==owner && warfieldPositions [winConditions[c][1]]==owner && warfieldPositions [winConditions[c][2]]==0){
            chance[0]=true
            chance.push(c)
            chance.push(2)
        }if(warfieldPositions [winConditions[c][0]]==owner && warfieldPositions [winConditions[c][1]]==0 && warfieldPositions [winConditions[c][2]]==owner){
            chance[0]=true
            chance.push(c)
            chance.push(1)
        }if(warfieldPositions [winConditions[c][0]]==0 && warfieldPositions [winConditions[c][1]]==owner && warfieldPositions [winConditions[c][2]]==owner){
            chance[0]=true
            chance.push(c)
            chance.push(0)
        }
    }
    return chance
}

//Funktion, die prüft, ob das Spiel vorbei ists
function testWin(owner){
    end=true
    //prüft ob alle Felder besetzt sind, der Spieler verliert
    for(p=0;p<10;p++){
        if(warfieldPositions[p]==0){
            end=false
            break
        }
    }
    if(end==true){
        showRandomEvent(103)
    }
    //Prüft ob jemand 3 in einer Reihe hat
    for(c=0; c<8 && end==false; c++){
        if(warfieldPositions [winConditions[c][0]]==owner && warfieldPositions [winConditions[c][1]]==owner && warfieldPositions [winConditions[c][2]]==owner){
            end=true
            if(owner==1){
                showRandomEvent(102)
            }else{
                showRandomEvent(103)
            }
        }
    }
    if(end==false && owner==2){
        playerturn=true
    }else if(end==false && owner==1){
        placeAI()
    }
}