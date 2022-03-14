//Funktion die beim ersten öffnen die Anzahl an Saves auf 0 stellt
window.onload=function(){
    if(localStorage.getItem("saves")%1!=0){
        localStorage.setItem("saves", 0)
    }
}

//Funktion die die ersten 12 Saves und die Anzahl der Saves im localStorage zurücksetzt
function resetSaves(){
    localStorage.removeItem("save0")
    localStorage.removeItem("save1")
    localStorage.removeItem("save2")
    localStorage.removeItem("save3")
    localStorage.removeItem("save4")
    localStorage.removeItem("save5")
    localStorage.removeItem("save6")
    localStorage.removeItem("save7")
    localStorage.removeItem("save8")
    localStorage.removeItem("save9")
    localStorage.removeItem("save11")
    localStorage.removeItem("save12")
    localStorage.setItem("saves", 0)
    loadsave()
}

//Funktion, die die Liste von Savegames anzeigt
function loadsave(){
    document.getElementById("loadMenu").style.display="block"
    document.getElementById("mainmenu").style.display="none"
    innerText=""
    //Falls gesaved werden soll, wird ein Button für einen neuen Save erzeugt
    if(document.getElementById("menu_button_save").innerText=="Save"){
        innerText+="<div class='savegame'>"
        innerText+="<p>New Save</p>"
        innerText+="<p></p>"
        innerText+="<button class='loadButton' onclick='save(-1)'>Save As</button>"
        innerText+="</div>"
    }
    numberOfSaves=localStorage.getItem("saves")
    //Schleife die alle Savegames in der Liste anzeigt
    for(i=0; i<numberOfSaves; i++){
        safefile=getArray(i)
        innerText+="<div class='savegame'>"
        innerText+="<p>"+safefile[24]+"</p>"
        innerText+="<p>D"+safefile[22]+" M"+safefile[21]+" Y"+safefile[20]+ "</p>"
        //Falls geladen werden soll, wird eine anderer Button erzeugt
        if(document.getElementById("menu_button_save").innerText!="Save"){
            innerText+="<button class='loadButton' onclick='load("+i+")'>Load</button>"
        }else{
            innerText+="<button class='loadButton' onclick='save("+i+")'>Save As</button>"
            innerText+="</div>"
        }
        innerText+="</div>"
    }//end for
    document.getElementById("loadList").innerHTML=innerText
}//end loadsave

//Funktion, die alle Variablen in ein Array speichert und dieses dann im localStorage lagert
function save(save){
    saves=[
        money,
        monthlyMoney,
        stability,
        monthlyStability,
        politicalPower,
        monthlyPoliticalPower,
        prestige,
        monthlyPrestige,
        food,
        monthlyFood,
        wood,
        monthlyWood,
        stone,
        monthlyStone,
        population,
        workingPopulation,
        currentResearchProgress,
        researchProgress,
        currentResearch,
        monthlyResearch,
        year,
        month,
        day,
        portrait,
        ruler,
        finance,
        warfare,
        diplomacy,
        buildings,
        buildingCode,
        buildingID,
        marketPlaceOn,
        gildhouseOn,
        portOn,
        mineOn,
        pigFarmOn,
        cityOn,
        townHallOn,
        universityOn,
        castleOn,
        researchingOn,
        buildingSlots,
        cathedralBuilt,
        palaceBuilt,
        moneyMultiplier,
        stabilityMultitplier,
        politicalPowerMultitplier,
        woodMultiplier,
        moneyMultiplier,
        stabilityModifier,
        prestigeMultiplier,
        france
    ]
    //Fall ein neues Savegame erstellt werden soll wird kein altes überschrieben
    if(save==-1){
        numberOfSaves=localStorage.getItem("saves")
        numberOfSaves=Number(numberOfSaves)
        localStorage.setItem("save"+numberOfSaves, JSON.stringify(saves))
        localStorage.setItem("saves", ++numberOfSaves)
    }else{
        localStorage.setItem("save"+save, JSON.stringify(saves))
    }
        document.getElementById("loadMenu").style.display="none"
        document.getElementById("mainmenu").style.display="block"
}//end save

//Funktion die das Spiel mit gespeicherten Variablen startet
function load(save){
    document.getElementById("loadMenu").style.display="none"
    document.getElementById("game").style.display="block"
    document.getElementById("menu_button_start").innerText="Resume";
    document.getElementById("menu_button_save").innerText="Save"
    timeOn=true
    allAttributes=0
    dates();
    safefile=getArray(save)
    
    money=safefile[0]
    monthlyMoney=safefile[1]
    stability=safefile[2]
    monthlyStability=safefile[3]
    politicalPower=safefile[4]
    monthlyPoliticalPower=safefile[5]
    prestige=safefile[6]
    monthlyPrestige=safefile[7]
    food=safefile[8]
    monthlyFood=safefile[9]
    wood=safefile[10]
    monthlyWood=safefile[11]
    stone=safefile[12]
    monthlyStone=safefile[13]
    population=safefile[14]
    workingPopulation=safefile[15]
    currentResearchProgress=safefile[16]
    researchProgress=safefile[17]
    currentResearch=safefile[18]
    monthlyResearch=safefile[19]
    year=safefile[20]
    month=safefile[21]
    day=safefile[22]
    portrait=safefile[23]
    ruler=safefile[24]
    finance=safefile[25]
    warfare=safefile[26]
    diplomacy=safefile[27]
    buildings=safefile[28]
    buildingCode=safefile[29]
    buildingID=safefile[30]
    marketPlaceOn=safefile[31]
    gildhouseOn=safefile[32]
    portOn=safefile[33]
    mineOn=safefile[34]
    pigFarmOn=safefile[35]
    cityOn=safefile[36]
    townHallOn=safefile[37]
    universityOn=safefile[38]
    castleOn=safefile[39]
    researchingOn=safefile[40]
    buildingSlots=safefile[41]
    cathedralBuilt=safefile[42]
    palaceBuilt=safefile[43]
    moneyMultiplier=safefile[44]
    stabilityMultiplier=safefile[45]
    politicalPowerMultiplier=safefile[46]
    woodMultiplier=safefile[47]
    moneyMultiplier=safefile[48]
    stabilityModifer=safefile[49]
    prestigeMultiplier=safefile[50]
    france=safefile[51]
    document.getElementById("buildingPlace").innerHTML=buildingCode
}//end load