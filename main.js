
function start(x){
    if(document.getElementById("menu_button_start").innerText=="Start"){
        document.getElementById("menu_button_start").innerText="Resume";
        document.getElementById("characterCreation").style.display="block"
        document.getElementById("mainmenu").style.display="none";
        document.getElementById("menu_button_save").innerText="Save";
        dates();
    }else if(allAttributes==0){
        document.getElementById("game").style.display="block";
        document.getElementById("characterCreation").style.display="none"
        document.getElementById("mainmenu").style.display="none";
        timeOn=true
        if(document.getElementById("editorRulerName").value=="Louis XVI" && drip==false){
            france=true
            portrait=8
        }
        if(document.getElementById("editorRulerName").value=="" && drip==false){
            ruler="John Doe"
        }
        document.getElementById("buildingPlace").innerHTML=buildingCode
    }
}

function portraitLeft(){
    /*Quellen
    https://www.reddit.com/r/PrequelMemes/comments/au0tjg/general_kenobi/
    https://www.thisiswhyimbroke.com/celebrity-soldier-portraits/
    https://mobile.twitter.com/tsar_flausch?lang=bg
    https://www.redbubble.com/de/i/poster/Trump-Russischer-General-von-cfischer83/35011544.LVTDI
    https://www.pinterest.de/pin/571816483911856074/
    https://www.artranked.com/topic/Famous+Neoclassical
    */
    portrait--
    if(portrait==0){
        portrait=6
    }
    document.getElementById("editorRulerPortrait").src="sources/"+portrait+".png";
}
function portraitRight(){
    portrait++
    if(portrait==7){
        portrait=1
    }
    document.getElementById("editorRulerPortrait").src="sources/"+portrait+".png";
}
function changeName(){
    ruler=document.getElementById("editorRulerName").value
}

function attributeUp(attribute){
    if(attribute==1 && allAttributes>0){
        finance++
        allAttributes--
        moneyMultiplier+=0.01
        document.getElementById("editorFinance").innerText="Finance: "+finance
    }else if(attribute==2 && allAttributes>0){
        warfare++
        allAttributes--
        prestigeMultiplier+=0.01
        document.getElementById("editorWarfare").innerText="Warfare: "+warfare
    }else if(attribute==3 && allAttributes>0){
        diplomacy++
        allAttributes--
        politicalPowerMultitplier+=0.01
        document.getElementById("editorDiplomacy").innerText="Diplomacy: "+diplomacy
    }
    document.getElementById("attributesLeft").innerText="Attributes ("+allAttributes+" left)"
}
function attributeDown(attribute){
    if(attribute==1 && finance>0){
        finance--
        allAttributes++
        moneyMultiplier-=0.01
        document.getElementById("editorFinance").innerText="Finance: "+finance
    }else if(attribute==2 && warfare>0){
        warfare--
        allAttributes++
        prestigeMultiplier-=0.01
        document.getElementById("editorWarfare").innerText="Warfare: "+warfare
    }else if(attribute==3 && diplomacy>0){
        diplomacy--
        allAttributes++
        politicalPowerMultitplier-=0.01
        document.getElementById("editorDiplomacy").innerText="Diplomacy: "+diplomacy
    }
    document.getElementById("attributesLeft").innerText="Attributes ("+allAttributes+" left)"
}

function dates(){
    setInterval(() => {
        if(timeOn==true){
            document.getElementById("time").innerHTML="Time: <br> "+day+"."+month+"."+year
            if(day==31 && month==12){
                year++
                day=1
                month=1
                if(france==true){
                    startRebellion();
                }
                updateStats()
            }else if(month==2 && day==28){
                month++
                day=1
                updateStats()
            }else if((month==4 || month==6 || month==9 || month==11)&& day==30){
                month++
                day=1
                updateStats()
            }else if(day==31){
                month++
                day=1
                updateStats()
            }else{
                updateUI()
                day++
            }
        }
    }, 100);
}

function updateStats(){
    stabilityConsequences()
    if(monthlyMoney>0){
        money+=monthlyMoney*moneyMultiplier*stabilityBonus
    }else{
        money+=monthlyMoney
    }
    
    monthlyStability=Math.round(monthlyStability*10)/10
    if(monthlyStability>0){
        stability+=monthlyStability*stabilityMultitplier+stabilityModifier
    }else{
        stability+=monthlyStability+stabilityModifier
    }
    stability=Math.round(stability*10)/10
    if(stability>100){
        stability=100
    }else if(stability<0){
        stability=0
    }

    if(monthlyPoliticalPower>0){
        politicalPower+=monthlyPoliticalPower*politicalPowerMultitplier*stabilityBonus
    }else{
        politicalPower+=monthlyPoliticalPower
    }
    

    monthlyPrestige=Math.round(monthlyPrestige*10)/10
    prestige+=monthlyPrestige
    prestige=Math.round(prestige*10)/10
    if(prestige>100){
        prestige=100
    }if(prestige<0){
        prestige=0
    }

    wood+=monthlyWood*woodMultiplier
    wood=Math.round(wood*10)/10
    stone+=monthlyStone*stoneMultiplier
    stone=Math.round(stone*10)/10

    food+=monthlyFood
    if(food<population/5){
        stabilityModifier=-5
    }else if(food>=population/5){
        stabilityModifier=0
    }
    if(food<0){
        food=0
    }
    
    sounds(3)
    randomEvent()
    researching()
    updateUI()
    updateActions()
}

function updateUI(){
    if(monthlyMoney<0){
        document.getElementById("money").innerHTML="Money <br> "+Math.round(money)+" <p style='color: red; display: inline;'>"+Math.round(monthlyMoney*100)/100+"</p>"
    }else if(monthlyMoney>0){
        document.getElementById("money").innerHTML="Money <br> "+Math.round(money)+" <p style='color: green; display: inline;'>+"+Math.round(monthlyMoney*moneyMultiplier*stabilityBonus*100)/100+"</p>"
    }else{
        document.getElementById("money").innerHTML="Money <br> "+Math.round(money)+" <p style='color: gray; display: inline;'>+"+Math.round(monthlyMoney*moneyMultiplier*stabilityBonus*100)/100+"</p>"
    }

    if(monthlyStability+stabilityModifier<0){
        document.getElementById("stability").innerHTML="Stability <br> "+Math.round(stability)+" <p style='color: red; display: inline;'>"+Math.round((monthlyStability+stabilityModifier)*100)/100+"</p>"
    }else if(monthlyStability+stabilityModifier>0){
        document.getElementById("stability").innerHTML="Stability <br> "+Math.round(stability)+" <p style='color: green; display: inline;'>+"+Math.round((monthlyStability*stabilityMultitplier+stabilityModifier)*100)/100+"</p>"
    }else{
        document.getElementById("stability").innerHTML="Stability <br> "+Math.round(stability)+" <p style='color: gray; display: inline;'>+"+Math.round((monthlyStability*stabilityMultitplier+stabilityModifier)*100)/100+"</p>"
    }

    if(monthlyPoliticalPower<0){
        document.getElementById("politicalPower").innerHTML="Authority <br> "+Math.round(politicalPower)+" <p style='color: red; display: inline;'>"+Math.round(monthlyPoliticalPower*100)/100+"</p>"
    }else if(monthlyPoliticalPower>0){
        document.getElementById("politicalPower").innerHTML="Authority <br> "+Math.round(politicalPower)+" <p style='color: green; display: inline;'>+"+Math.round(monthlyPoliticalPower*politicalPowerMultitplier*stabilityBonus*100)/100+"</p>"
    }else{
        document.getElementById("politicalPower").innerHTML="Authority <br> "+Math.round(politicalPower)+" <p style='color: gray; display: inline;'>+"+Math.round(monthlyPoliticalPower*politicalPowerMultitplier*stabilityBonus*100)/100+"</p>"
    }

    if(monthlyPrestige<0){
        document.getElementById("prestige").innerHTML="Prestige <br> "+Math.round(prestige*10)/10+" <p style='color: red; display: inline;'>"+Math.round(monthlyPrestige*10)/10+"</p>"
    }else if(monthlyPrestige>0){
        document.getElementById("prestige").innerHTML="Prestige <br> "+Math.round(prestige*10)/10+" <p style='color: green; display: inline;'>+"+Math.round(monthlyPrestige*10)/10+"</p>"
    }else{
        document.getElementById("prestige").innerHTML="Prestige <br> "+Math.round(prestige*10)/10+" <p style='color: gray; display: inline;'>+"+Math.round(monthlyPrestige*10)/10+"</p>"
    }
}

function updateActions(){
    if(countryActive==true){ 
        activateCountry()
    }if(actionsActive==true){
        activateActions()
    }if(buildingActive==true){
        activateBuilding()
    }if(researchActive==true){
        activateResearch()
    }if(bonusActive==true){
        showBonuses()
    }
}

function activateCountry(){
    countryActive=true
    actionsActive=false
    bonusActive=false
    innerText="<br>Country: <br> <img src='sources/"+portrait+".png' style='width: 50%; border: 2px solid white'>"
    if(buildings<10 && france==false){
        innerText+="<br>Duke "+ruler
    }else if(buildings<50 || france==true){
        innerText+="<br>King "+ruler
    }else{
        innerText+="<br>Emperor "+ruler
    }
    innerText+="<br><br><div style='line-height: 1.5em; margin-right: 20%; display: grid; grid-template-columns: 6fr 1fr 1fr;'>"
    innerText+="<div class='tooltip' data-title='Unlocks Trading' style='text-align: left; margin-left: 30%;'>Finance:</div> <div class='tooltip' data-title='Unlocks Trading' style='text-align: left;'>"+finance+"</div>"
    if(prestige>=60){
        innerText+="<button class='learnAttributeTrue tooltip' data-title='Costs 60 Prestige' onclick='learnAttribute(1); sounds(1)'>ᐃ</button>"
    }else{
        innerText+="<button disabled class='learnAttributeFalse tooltip' data-title='Costs 60 Prestige' onclick='learnAttribute(1)'>ᐃ</button>"
    }
    innerText+="<div class='tooltip' data-title='Unlocks War' style='text-align: left; margin-left: 30%;'>Warfare:</div> <div class='tooltip' data-title='Unlocks War' style='text-align: left;'>"+warfare+"</div> "
    if(prestige>=60){
        innerText+="<button class='learnAttributeTrue tooltip' data-title='Costs 60 Prestige' onclick='learnAttribute(2); sounds(1)'>ᐃ</button>"
    }else{
        innerText+="<button disabled class='learnAttributeFalse tooltip' data-title='Costs 60 Prestige'  onclick='learnAttribute(2)'>ᐃ</button>"
    }
    innerText+="<div class='tooltip' data-title='Unlocks Monuments' style='text-align: left; margin-left: 30%;'>Diplomacy:</div> <div class='tooltip' data-title='Unlocks Monuments' style='text-align: left;'>"+diplomacy+"</div>"
    if(prestige>=60){
        innerText+="<button class='learnAttributeTrue tooltip' data-title='Costs 60 Prestige' onclick='learnAttribute(3); sounds(1)'>ᐃ</button>"
    }else{
        innerText+="<button disabled class='learnAttributeFalse tooltip' data-title='Costs 60 Prestige' onclick='learnAttribute(3)'>ᐃ</button>"
    }
    innerText+="</div>"
    innerText+="<br>Buildings: "+ buildings
    innerText+="<br><button class='bonusButton' onclick='showBonuses()'> Modifiers </button>";
    document.getElementById("actions").innerHTML=innerText;
}

function showBonuses(){
    countryActive=false
    actionsActive=false
    bonusActive=true
    innerText="<br>Modifiers: <br><div id='bonusList'>"

        innerText+="<div> Money Multiplier: </div><div>+"+Math.round((moneyMultiplier-1)*100)+"%</div>"
        innerText+="<div> Stability bonus for money: </div><div>+"+Math.round((stabilityBonus-1)*100)+"%</div>"
        innerText+="<div> Stability Multiplier: </div><div>+"+Math.round((stabilityMultitplier-1)*100)+"%</div>"
        innerText+="<div> Food penalty for Stability: </div><div>"+stabilityModifier+"</div>"
        innerText+="<div> Authority Multiplier: </div><div>+"+Math.round((politicalPowerMultitplier-1)*100)+"%</div>"
        innerText+="<div> Prestige Multiplier: </div><div>+"+Math.round((prestigeMultiplier-1)*100)+"%</div>"
        innerText+="<div> Wood Multiplier: </div><div>+"+Math.round((woodMultiplier-1)*100)+"%</div>"
        innerText+="<div> Stone Multiplier: </div><div>+"+Math.round((stoneMultiplier-1)*100)+"%</div>"

    innerText+="</div>"
    innerText+="<br><button class='bonusButton' onclick='activateCountry()'> Back </button>";
    document.getElementById("actions").innerHTML=innerText
}

//ermöglicht das erlernen von Fähigkeiten für 60 Prestige
function learnAttribute(type){
    if(prestige>=60){
        if(type==1){
            finance++
            prestige-=60
            moneyMultiplier+=0.01
                    }if(type==2){
            warfare++
            prestige-=60
            prestigeMultiplier+=0.01
                    }if(type==3){
            diplomacy++
            prestige-=60
            politicalPowerMultiplier+=0.01
        }
    }
    updateActions()
    updateUI()
}


//Methode, die das Tab für Aktionen wie Trading, War und Monuments anzeigt
function activateActions(){
    countryActive=false
    actionsActive=true
    bonusActive=false
    innerText="<br>Actions: <br>"
    if(monthlyFood>0){
        innerText+="<div style='font-size: 0.7em;display: grid; grid-template-columns: 12.5% 25% 25% 25% ;'> <br> <div class='tooltip ressourceTooltip' data-title='Lack of food can cause penalty' style='diplay: inline'><br>Food: <br>"+food+"<p style='color: green; display: inline;'> +"+monthlyFood+"</p></div>"
    }else if(monthlyFood<0){
        innerText+="<div style='font-size: 0.7em;display: grid; grid-template-columns: 12.5% 25% 25% 25% ;'> <br> <div class='tooltip ressourceTooltip' data-title='Lack of food can cause penalty' style='diplay: inline'><br>Food: <br>"+food+"<p style='color: red; display: inline;'> "+monthlyFood+"</p></div>"
    }else{
        innerText+="<div style='font-size: 0.7em;display: grid; grid-template-columns: 12.5% 25% 25% 25% ;'> <br> <div class='tooltip ressourceTooltip' data-title='Lack of food can cause penalty' style='diplay: inline'><br>Food: <br>"+food+"<p style='color: grey; display: inline;'> +"+monthlyFood+"</p></div>"
    }
    if(monthlyWood>0){
        innerText+="<div class='tooltip ressourceTooltip' data-title='Used to build buildings' style='diplay: inline'><br>Food: <br>"+Math.floor(wood)+"<p style='color: green; display: inline;'> +"+Math.floor(monthlyWood*woodMultiplier*10)/10+"</p></div>"
    }else{
        innerText+="<div class='tooltip ressourceTooltip' data-title='Used to build buildings' style='diplay: inline'><br>Food: <br>"+Math.floor(wood)+"<p style='color: grey; display: inline;'> +"+Math.floor(monthlyWood*woodMultiplier*10)/10+"</p></div>"
    }
    if(monthlyStone>0){
        innerText+="<div class='tooltip ressourceTooltip' data-title='Used to build buildings' style='diplay: inline'><br>Stone: <br>"+Math.floor(stone)+"<p style='color: green; display: inline;'> +"+Math.floor(monthlyStone*woodMultiplier*10)/10+"</p></div>"
    }else{
        innerText+="<div class='tooltip ressourceTooltip' data-title='Used to build buildings' style='diplay: inline'><br>Stone: <br>"+Math.floor(stone)+"<p style='color: grey; display: inline;'> +"+Math.floor(monthlyStone*woodMultiplier*10)/10+"</p></div>"
    }
    
    innerText+="</div><br>Finance:<br><div style='display: grid; grid-template-columns: 50% 50%; margin-left: 20%; margin-right: 20%;'>"
    innerText+="<p style='margin-bottom: 0em; margin-top: 0em'>Buy</p><p style='margin-bottom: 0em; margin-top: 0em'>Sell</p>"
    if(finance>7){
        if(money>=20){
            innerText+="<button onclick=buy('Food') class='tradeButton tooltip' data-title='Buy 100 Food for 20 Money' id='tradeTopLeft'>100 Food </button>"
        }else{
            innerText+="<button disabled class='disabledTradeButton tooltip' data-title='Buy 100 Food for 20 Money' id='tradeTopLeft'>100 Food </button>"
        }if(food>=100){
            innerText+="<button onclick=sell('Food') class='tradeButton tooltip' data-title='Sell 100 Food for 8 Money' id='tradeTopRight'>100 Food </button>"
        }else{
            innerText+="<button disabled class='disabledTradeButton tooltip' data-title='Sell 100 Food for 8 Money' id='tradeTopRight'>100 Food </button>"
        }
    }else{
        innerText+="<button disabled class='disabledTradeButton tooltip' data-title='Buy 100 Food for 20 Money' id='tradeTopLeft'>100 Food </button>"
        innerText+="<button disabled class='disabledTradeButton tooltip' data-title='Sell 100 Food for 8 Money' id='tradeTopRight'>100 Food </button>"
    }if(finance>15){
        if(money>=20){
            innerText+="<button onclick=buy('Wood') class='tradeButton tooltip' data-title='Buy 100 Wood for 20 Money'>100 Wood </button>"
        }else{
            innerText+="<button disabled class='disabledTradeButton tooltip' data-title='Buy 100 Wood for 20 Money'>100 Wood </button>"
        }if(wood>=100){
            innerText+="<button onclick=sell('Wood') class='tradeButton tooltip' data-title='Sell 100 Wood for 8 Money'>100 Wood </button>"
        }else{
            innerText+="<button disabled class='disabledTradeButton tooltip' data-title='Sell 100 Wood for 8 Money'>100 Wood </button>"
        }
    }else{
        innerText+="<button disabled class='disabledTradeButton tooltip' data-title='Buy 100 Wood for 20 Money'>100 Wood </button>"
        innerText+="<button disabled class='disabledTradeButton tooltip' data-title='Sell 100 Wood for 8 Money'>100 Wood </button>"
    }if(finance>23){
        if(money>=400){
            innerText+="<button onclick=buy('Stone') class='tradeButton tooltip' data-title='Buy 100 Stone for 400 Money' id='tradeBottomLeft'>100 Stone </button>"
        }else{
            innerText+="<button disabled class='disabledTradeButton tooltip' data-title='Buy 100 Stone for 400 Money' id='tradeBottomLeft'>100 Stone </button>"
        }if(stone>=100){
            innerText+="<button onclick=sell('Stone') class='tradeButton tooltip' data-title='Sell 100 Stone for 160 Money' id='tradeBottomRight'>100 Stone </button>"
        }else{
            innerText+="<button disabled class='disabledTradeButton tooltip' data-title='Sell 100 Stone for 160 Money' id='tradeBottomRight'>100 Stone </button>"
        }
    }else{
        innerText+="<button disabled class='disabledTradeButton tooltip' data-title='Buy 100 Stone for 400 Money' id='tradeBottomLeft'>100 Stone </button>"
        innerText+="<button disabled class='disabledTradeButton tooltip' data-title='Sell 100 Stone for 160 Money' id='tradeBottomRight'>100 Stone </button>"
    }
    innerText+="</div>"
    innerText+="<br>Warfare: <br>"
    if(warfare<16 || warOn==true || money<400 || stability<10){
        innerText+="<button disabled onclick='startWar(); sounds(2)' id='disabledWarButton' class='tooltip' data-title='Start war for land'> War </button>"
    }else{
        innerText+="<button onclick='activateMinesweeper(); sounds(2)' id='warButton' class='tooltip' data-title='Start war for land'> War </button>"
    }
    innerText+="<br><br>Diplomacy:<br>"
    if(diplomacy>7 && money>=500 && stone>=200 & wood >= 800){
        innerText+="<button class='monumentButton monumentButtonTop tooltip' data-title='Build colony for land' onclick='buildMonument(1); sounds(1)'>Colony</button>"
    }else{
        innerText+="<button class='disabledMonumentButton monumentButtonTop tooltip' data-title='Build colony for land' >Colony</button>"
    }if(diplomacy>15 && money>=1500 && stone>=800 & wood >= 1500 && population-workingPopulation>=100 && cathedralBuilt==false){
        innerText+="<button class='monumentButton tooltip' data-title='Costs a lot of ressources' onclick='buildMonument(2); sounds(1)'>Cathedral</button>"
    }else{
        innerText+="<button class='disabledMonumentButton tooltip' data-title='Costs a lot of ressources' >Cathedral</button>"
    }if(diplomacy>23 && money>=3000 && stone>=2000 & wood >= 2000 && population-workingPopulation>=200 && palaceBuilt==false){
        innerText+="<button class='monumentButton monumentButtonBottom tooltip' data-title='Costs a lot of ressources' onclick='buildMonument(3); sounds(1)'>Palace</button>"
    }else{
        innerText+="<button class='disabledMonumentButton monumentButtonBottom tooltip' data-title='Costs a lot of ressources'>Palace</button>"
    }
    document.getElementById("actions").innerHTML=innerText
}

function buildMonument(x){
    switch (x){
        case 1://colony
            money-=500
            stone-=200
            wood-=800
            buildingSlots+=10
            break;
        case 2:
            money-=1500
            stone-=800
            wood-=1500
            workingPopulation+=100
            monthlyMoney+=50
            monthlyStability+=3
            cathedralBuilt=true
            buildingCode+="<img style='width: 100%' src='sources/cathedral.png'>"
            buildingID++
            buildings++
            break;
        case 3:
            money-=3000
            stone-=2000
            wood-=2000
            workingPopulation+=200
            monthlyMoney-=100
            monthlyPrestige+=8
            monthlyPoliticalPower+=10
            palaceBuilt=true
            buildingCode+="<img style='width: 100%' src='sources/palace.png'>"
            buildingID++
            buildings++
            break;
    }
    document.getElementById("buildingPlace").innerHTML=buildingCode
    document.getElementById("buildingCount").innerText="Buildings: "+buildings+"/"+buildingSlots
    updateUI()
    updateActions()
}
function buy(type){
    if(type=="Wood"){
        money-=20
        wood+=100
    }if(type=="Stone"){
        money-=400
        stone+=100
    }if(type=="Food"){
        money-=20
        food+=100
    }
    sounds(1)
    updateUI()
    updateActions()
}
function sell(type){
    if(type=="Wood"){
        money+=8
        wood-=100
    }if(type=="Stone"){
        money+=160
        stone-=100
    }if(type=="Food"){
        money+=5
        food-=100
    }
    sounds(1)
    updateUI()
    updateActions()
}

function activateBuilding(){
    buildingActive=true
    researchActive=false
    innerText="<br>Building:<br><div style='font-size: 0.7em;display: grid; grid-template-columns: 5% 30% 30% 30%;'><br><div class='tooltip ressourceTooltip' data-title='Used to staff buildings'><br>Population: <br>"+workingPopulation+" / "+population+"</div>"
    
    if(monthlyWood>0){
        innerText+="<div class='tooltip ressourceTooltip' data-title='Used to build buildings' style='diplay: inline'><br>Wood: <br>"+Math.floor(wood)+"<p style='color: green; display: inline;'> +"+Math.floor(monthlyWood*woodMultiplier*10)/10+"</p></div>"
    }else if(monthlyWood<0){
        innerText+="<div class='tooltip ressourceTooltip' data-title='Used to build buildings' style='diplay: inline'><br>Wood: <br>"+Math.floor(wood)+"<p style='color: red; display: inline;'> "+Math.floor(monthlyWood)+"</p></div>"
    }else{
        innerText+="<div class='tooltip ressourceTooltip' data-title='Used to build buildings' style='diplay: inline'><br>Wood: <br>"+Math.floor(wood)+"<p style='color: grey; display: inline;'> +"+Math.floor(monthlyWood*woodMultiplier*10)/10+"</p></div>"
    }
    if(monthlyStone>0){
        innerText+="<div class='tooltip ressourceTooltip' data-title='Used to build buildings' style='diplay: inline'><br>Stone: <br>"+Math.floor(stone)+"<p style='color: green; display: inline;'> +"+Math.floor(monthlyStone*woodMultiplier*10)/10+"</p></div>"
    }else if(monthlyStone<0){
        innerText+="<div class='tooltip ressourceTooltip' data-title='Used to build buildings' style='diplay: inline'><br>Stone: <br>"+Math.floor(stone)+"<p style='color: red; display: inline;'> "+Math.floor(monthlyStone)+"</p></div>"
    }else{
        innerText+="<div class='tooltip ressourceTooltip' data-title='Used to build buildings' style='diplay: inline'><br>Stone: <br>"+Math.floor(stone)+"<p style='color: grey; display: inline;'> +"+Math.floor(monthlyStone*woodMultiplier*10)/10+"</p></div>"
    }
    innerText+="</div><br>"
    innerText+="Economy:<br><div id='economyContainer' style='display: grid; grid-template-columns: 50% 50%'>"
    if(money>=100 && population-workingPopulation>=20 && stone>=20 && wood >=200 && buildings<buildingSlots){ //Chapen
        innerText+="<button class='buildingButton buildingButtonLeft buildingButtonCornerTopLeft tooltip' data-title='Generates low amount of money' onclick='confirmBuilding(1); sounds(1)'>Chapel</button>"
    }else{
        innerText+="<button disabled class='disabledBuildingButton buildingButtonLeftDisabled buildingButtonCornerTopLeft tooltip' data-title='Generates low amount of money'>Chapel</button>"
    }
    if(money>=150 && population-workingPopulation>=40 && wood >=400 && marketPlaceOn==true && buildings<buildingSlots){ //Market Place
        innerText+="<button class='buildingButton buildingButtonRight buildingButtonCornerTopRight tooltip' data-title='Generates mediocre amount of money' onclick='confirmBuilding(2); sounds(1)'>Market Place</button>"
    }else{
        innerText+="<button disabled class='disabledBuildingButton buildingButtonRightDisabled buildingButtonCornerTopRight tooltip' data-title='Generates mediocre amount of money'>Market Place</button>"
    }
    if(money>=500 && population-workingPopulation>=80 && stone>=100 && wood >=600 && gildhouseOn==true && buildings<buildingSlots){ //Gildhouse
        innerText+="<button class='buildingButton buildingButtonLeft buildingButtonCornerBottomLeft tooltip' data-title='Generates high amount of money' onclick='confirmBuilding(3); sounds(1)'>Gildhouse</button>"
    }else{
        innerText+="<button disabled class='disabledBuildingButton buildingButtonLeftDisabled buildingButtonCornerBottomLeft tooltip' data-title='Generates high amount of money'>Gildhouse</button>"
    }
    if(money>=1000 && population-workingPopulation>=200 && stone>=200 && wood >=1000 && portOn==true && buildings<buildingSlots){  //Port
        innerText+="<button class='buildingButton buildingButtonRight buildingButtonCornerBottomRight tooltip' data-title='Generates very high amount of money' onclick='confirmBuilding(4); sounds(1)'>Port</button>"
    }else{
        innerText+="<button disabled class='disabledBuildingButton buildingButtonRightDisabled buildingButtonCornerBottomRight tooltip' data-title='Generates very high amount of money'>Port</button>"
    }

    innerText+="</div><br>Ressourcen:<br><div id='economyContainer' style='display: grid; grid-template-columns: 50% 50%'>"
    if(money>=200 && population-workingPopulation>=30 && buildings<buildingSlots){  //Logging Camp
        innerText+="<button class='buildingButton buildingButtonLeft buildingButtonCornerTopLeft tooltip' data-title='Generates  wood' onclick='confirmBuilding(5); sounds(1)'>Logging <br> Camp</button>"
    }else{
        innerText+="<button disabled class='disabledBuildingButton buildingButtonLeftDisabled buildingButtonCornerTopLeft tooltip' data-title='Generates wood'>Logging <br> Camp</button>"
    }
    if(money>=200 && population-workingPopulation>=20 && buildings<buildingSlots){  //Wheat Farm
        innerText+="<button class='buildingButton buildingButtonRight buildingButtonCornerTopRight tooltip' data-title='Generates low amount of food' onclick='confirmBuilding(6); sounds(1)'>Wheat <br> Farm</button>"
    }else{
        innerText+="<button disabled class='disabledBuildingButton buildingButtonRightDisabled buildingButtonCornerTopRight tooltip' data-title='Generates low amount of food'>Wheat <br> Farm</button>"
    }
    if(money>=800 && population-workingPopulation>=80 && wood >=800 && mineOn==true && buildings<buildingSlots){ //Mine
        innerText+="<button class='buildingButton buildingButtonLeft buildingButtonCornerBottomLeft tooltip' data-title='Generates stone' onclick='confirmBuilding(7); sounds(1)'>Mine</button>"
    }else{
        innerText+="<button disabled class='disabledBuildingButton buildingButtonLeftDisabled buildingButtonCornerBottomLeft tooltip' data-title='Generates stone'>Mine</button>"
    }
    if(money>=200 && population-workingPopulation>=30 && pigFarmOn==true && buildings<buildingSlots){  //Pig Farm
        innerText+="<button class='buildingButton buildingButtonRight buildingButtonCornerBottomRight tooltip' data-title='Generates high amount of food' onclick='confirmBuilding(8); sounds(1)'>Pig <br> Farm</button>"
    }else{
        innerText+="<button disabled class='disabledBuildingButton buildingButtonRightDisabled buildingButtonCornerBottomRight tooltip' data-title='Generates high amount of food'>Pig <br> Farm</button>"
    }

    innerText+="</div><br>Politics:<br><div id='economyContainer' style='display: grid; grid-template-columns: 50% 50%'>"
    if(money>=100 && wood >=100 && buildings<buildingSlots){   //Settlement
        innerText+="<button class='buildingButton buildingButtonLeft buildingButtonCornerTopLeft tooltip' data-title='Generates low amount of population' onclick='confirmBuilding(9); sounds(1)'>Settlement</button>"
    }else{
        innerText+="<button disabled class='disabledBuildingButton buildingButtonLeftDisabled buildingButtonCornerTopLeft tooltip' data-title='Generates low amount of population'>Settlement</button>"
    }
    if(money>=300 && population-workingPopulation>=10 && wood >=500 && buildings<buildingSlots){   //School
        innerText+="<button class='buildingButton buildingButtonRight buildingButtonCornerTopRight tooltip' data-title='Generates  research' onclick='confirmBuilding(10); sounds(1)'>School</button>"
    }else{
        innerText+="<button disabled class='disabledBuildingButton buildingButtonRightDisabled buildingButtonCornerTopRight tooltip' data-title='Generates  research'>School</button>"
    }
    if(money>=400 && stone>=200 && wood >=600 && cityOn==true && buildings<buildingSlots){ //City
        innerText+="<button class='buildingButton buildingButtonLeft tooltip' data-title='Generates high amount of population' onclick='confirmBuilding(11); sounds(1)'>City</button>"
    }else{
        innerText+="<button disabled class='disabledBuildingButton buildingButtonLeftDisabled tooltip' data-title='Generates high amount of population'>City</button>"
    }
    if(money>=500 && population-workingPopulation>=40 && stone>=200 && wood >=200 && townHallOn==true && buildings<buildingSlots){ //Town Hall
        innerText+="<button class='buildingButton buildingButtonRight tooltip' data-title='Generates authority & stability' onclick='confirmBuilding(12); sounds(1)''>Town Hall</button>"
    }else{
        innerText+="<button disabled class='disabledBuildingButton buildingButtonRightDisabled tooltip' data-title='Generates authority & stability'>Town Hall</button>"
    }
    if(money>=800 && population-workingPopulation>=100 && stone>=500 && wood >=500 && universityOn==true && buildings<buildingSlots){  //University
        innerText+="<button class='buildingButton buildingButtonLeft buildingButtonCornerBottomLeft tooltip' data-title='Generates high amount of research' onclick='confirmBuilding(13); sounds(1)'>University</button>"
    }else{
        innerText+="<button disabled class='disabledBuildingButton buildingButtonLeftDisabled buildingButtonCornerBottomLeft tooltip' data-title='Generates high amount of research'>University</button>"
    }
    if(money>=1000 && population-workingPopulation>=200 && stone>=400 && wood >=1000 && castleOn==true && buildings<buildingSlots){    //Castle
        innerText+="<button class='buildingButton buildingButtonRight buildingButtonCornerBottomRight tooltip' data-title='Generates high amount of prestige & authority' onclick='confirmBuilding(14); sounds(1)'>Castle</button></div>"
    }else{
        innerText+="<button disabled class='disabledBuildingButton buildingButtonRightDisabled buildingButtonCornerBottomRight tooltip' data-title='Generates high amount of prestige & authority'>Castle</button></div>"
    }
    
    document.getElementById("actions2").innerHTML=innerText
}

function confirmBuilding(type){
    innerText="<br>Building<br><br>"

    innerText+="<div id='confirmBuildingGrid'><div style='display:grid; grid-template-columns: 20% 80%;border-right: 2px solid white; text-align: left'>"
    innerText+="<br><div style='text-align: center; margin-right: 30%;'>Gain</div>"
    if(building_money[type]>0){
        innerText+="<div>+"+building_money[type]+"</div><div> Money</div>"
    }if(building_wood[type]>0){
        innerText+="<div>+"+building_wood[type]+"</div><div> Wood</div>"
    }if(building_stone[type]>0){
        innerText+="<div>+"+building_stone[type]+"</div><div> Stone</div>"
    }if(building_population[type]>0){
        innerText+="<div>+"+building_population[type]+"</div><div> Population</div>"
    }if(building_workingPopulation[type]>0){
        innerText+="<div>+"+building_workingPopulation[type]+"</div><div> Jobs</div>"
    }if(building_monthlyMoney[type]>0){
        innerText+="<div>+"+building_monthlyMoney[type]+"</div><div> Money/Month</div>"
    }if(building_monthlyStability[type]>0){
        innerText+="<div>+"+building_monthlyStability[type]+"</div><div> Stability/Month</div>"
    }if(building_monthlyPoliticalPower[type]>0){
        innerText+="<div>+"+building_monthlyPoliticalPower[type]+"</div><div> Authority/Month</div>"
    }if(building_monthlyPrestige[type]>0){
        innerText+="<div>+"+building_monthlyPrestige[type]+"</div><div> Prestige/Month</div>"
    }if(building_monthlyResearch[type]>0){
        innerText+="<div>+"+building_monthlyResearch[type]+"</div><div> Money/Month</div>"
    }if(building_monthlyFood[type]>0){
        innerText+="<div>+"+building_monthlyFood[type]+"</div><div> Food/Month</div>"
    }if(building_monthlyWood[type]>0){
        innerText+="<div>+"+building_monthlyWood[type]+"</div><div> Wood/Month</div>"
    }if(building_monthlyStone[type]>0){
        innerText+="<div>+"+building_monthlyStone[type]+"</div><div> Stone/Month</div>"
    }
    innerText+="</div>"
    innerText+="<div style='display: grid; grid-template-columns: 20% 80%; text-align: left; margin-left: 5%;'>"
    innerText+="<br><div style='text-align: center; margin-right: 30%;'>Cost</div>"
    if(building_money[type]<0){
        innerText+="<div>"+building_money[type]+"</div><div> Money</div>"
    }if(building_wood[type]<0){
        innerText+="<div>"+building_wood[type]+"</div><div> Wood</div>"
    }if(building_stone[type]<0){
        innerText+="<div>"+building_stone[type]+"</div><div> Stone</div>"
    }if(building_population[type]<0){
        innerText+="<div>"+building_population[type]+"</div><div> Population</div>"
    }if(building_workingPopulation[type]<0){
        innerText+="<div>"+building_workingPopulation[type]+"</div><div> Jobs</div>"
    }if(building_monthlyMoney[type]<0){
        innerText+="<div>"+building_monthlyMoney[type]+"</div><div> Money/Month</div>"
    }if(building_monthlyStability[type]<0){
        innerText+="<div>"+building_monthlyStability[type]+"</div><div> Stability/Month</div>"
    }if(building_monthlyPoliticalPower[type]<0){
        innerText+="<div>"+building_monthlyPoliticalPower[type]+"</div><div> Authority/Month</div>"
    }if(building_monthlyPrestige[type]<0){
        innerText+="<div>"+building_monthlyPrestige[type]+"</div><div> Prestige/Month</div>"
    }if(building_monthlyResearch[type]<0){
        innerText+="<div>"+building_monthlyResearch[type]+"</div><div> Money/Month</div>"
    }if(building_monthlyFood[type]<0){
        innerText+="<div>"+building_monthlyFood[type]+"</div><div> Food/Month</div>"
    }if(building_monthlyWood[type]<0){
        innerText+="<div>"+building_monthlyWood[type]+"</div><div> Wood/Month</div>"
    }if(building_monthlyStone[type]<0){
        innerText+="<div>"+building_monthlyStone[type]+"</div><div> Stone/Month</div>"
    }
    innerText+="</div></div><br>"
    innerText+="<button class='confirmBuildingButton' onclick='build("+type+")'>Build</button><br>"
    innerText+="<button class='confirmBuildingButton' onclick='showBuildings()'>Back</button>"
    document.getElementById("gamefield").style.display="none"
    document.getElementById("eventfield").style.display="block"
    document.getElementById("eventfield").innerHTML=innerText
}

function showBuildings(){
    document.getElementById("gamefield").style.display="block"
    document.getElementById("eventfield").style.display="none"
}

function build(type){
    building_innerHTML=["",
    "<img id='b"+buildingID+"' onclick=destroy('b"+buildingID+"',01) src='sources/t01.png' style='width: 100%'>",
    "<img id='b"+buildingID+"' onclick=destroy('b"+buildingID+"',02) src='sources/t02.png' style='width: 100%'>",
    "<img id='b"+buildingID+"' onclick=destroy('b"+buildingID+"',03) src='sources/t03.png' style='width: 100%'>",
    "<img id='b"+buildingID+"' onclick=destroy('b"+buildingID+"',04) src='sources/t04.png' style='width: 100%'>",
    "<img id='b"+buildingID+"' onclick=destroy('b"+buildingID+"',05) src='sources/t05.png' style='width: 100%'>",
    "<img id='b"+buildingID+"' onclick=destroy('b"+buildingID+"',06) src='sources/t06.png' style='width: 100%'>",
    "<img id='b"+buildingID+"' onclick=destroy('b"+buildingID+"',07) src='sources/t07.png' style='width: 100%'>",
    "<img id='b"+buildingID+"' onclick=destroy('b"+buildingID+"',08) src='sources/t08.png' style='width: 100%'>",
    "<img id='b"+buildingID+"' onclick=destroy('b"+buildingID+"',09) src='sources/t09.png' style='width: 100%'>",
    "<img id='b"+buildingID+"' onclick=destroy('b"+buildingID+"',10) src='sources/t10.png' style='width: 100%'>",
    "<img id='b"+buildingID+"' onclick=destroy('b"+buildingID+"',11) src='sources/t11.png' style='width: 100%'>",
    "<img id='b"+buildingID+"' onclick=destroy('b"+buildingID+"',12) src='sources/t12.png' style='width: 100%'>",
    "<img id='b"+buildingID+"' onclick=destroy('b"+buildingID+"',13) src='sources/t13.png' style='width: 100%'>",
    "<img id='b"+buildingID+"' onclick=destroy('b"+buildingID+"',14) src='sources/t14.png' style='width: 100%'>"
    ]
    money+=building_money[type]
    monthlyMoney+=building_monthlyMoney[type]
    workingPopulation+=building_workingPopulation[type]
    population+=building_population[type]
    wood+=building_wood[type]
    stone+=building_stone[type]
    monthlyStability+=building_monthlyStability[type]
    monthlyFood+=building_monthlyFood[type]
    monthlyWood+=building_monthlyWood[type]
    monthlyStone+=building_monthlyStone[type]
    monthlyPrestige+=building_monthlyPrestige[type]
    monthlyResearch+=building_monthlyResearch[type]
    monthlyPoliticalPower+=building_monthlyPoliticalPower[type]
    buildingCode+=building_innerHTML[type]
    document.getElementById("buildingPlace").innerHTML=buildingCode
    document.getElementById("gamefield").style.display="block"
    document.getElementById("eventfield").style.display="none"
    buildingID++
    buildings++
    document.getElementById("buildingCount").innerText="Buildings: "+buildings+"/"+buildingSlots
    updateUI()
    updateActions()
}

function destroy(id, type){
    document.getElementById(id).remove()
    if(type>9){
        buildingCode=buildingCode.replace("<img id='"+id+"' onclick=destroy('"+id+"',"+type+") src='sources/t"+type+".png' style='width: 100%'>", "")
    }else{
        buildingCode=buildingCode.replace("<img id='"+id+"' onclick=destroy('"+id+"',0"+type+") src='sources/t0"+type+".png' style='width: 100%'>", "")
    }
    
    buildings--
    monthlyMoney-=building_monthlyMoney[type]
    workingPopulation-=building_workingPopulation[type]
    population-=building_population[type]
    monthlyStability-=building_monthlyStability[type]
    monthlyFood-=building_monthlyFood[type]
    monthlyWood-=building_monthlyWood[type]
    monthlyStone-=building_monthlyStone[type]
    monthlyPrestige-=building_monthlyPrestige[type]
    monthlyResearch-=building_monthlyResearch[type]
    monthlyPoliticalPower-=building_monthlyPoliticalPower[type]
    document.getElementById("buildingCount").innerText="Buildings: "+buildings+"/"+buildingSlots
    updateUI()
    updateActions()
}


function activateResearch(){
    buildingActive=false
    researchActive=true
    innerText="<br>Research:<br>"
    innerText+="<p id='progress' >"+currentResearch+"</p><div id='researchBarContainer'><div id='researchBar' style='width: "+currentResearchProgress+"%;'></div></div><br>"
    if(researchingOn==false){
        if(researchProgress[0]<=5){
            innerText+="<button class='researchButton' onclick='research(0); sounds(1)'>"+researchables[0][researchProgress[0]]+"</button>"
            innerText+="<p class='researchNext'>Next: "+researchables[0][researchProgress[0]+1]+"</p>"
        }else{
            innerText+="<button class='disabledResearchButton' onclick='research(0); sounds(1)'>"+researchables[0][researchProgress[0]]+"</button>"
            innerText+="<p class='disabledResearchNext'>Next: "+researchables[0][researchProgress[0]+1]+"</p>"
        }if(researchProgress[1]<=5){
            innerText+="<button class='researchButton' onclick='research(1); sounds(1)'>"+researchables[1][researchProgress[1]]+"</button>"
            innerText+="<p class='researchNext'>Next: "+researchables[1][researchProgress[1]+1]+"</p>"
        }else{
            innerText+="<button class='disabledResearchButton' onclick='research(1); sounds(1)'>"+researchables[1][researchProgress[1]]+"</button>"
            innerText+="<p class='disabledResearchNext'>Next: "+researchables[1][researchProgress[1]+1]+"</p>"
        }if(researchProgress[2]<=5){
            innerText+="<button class='researchButton' onclick='research(2); sounds(1)'>"+researchables[2][researchProgress[2]]+"</button>"
            innerText+="<p class='researchNext'>Next: "+researchables[2][researchProgress[2]+1]+"</p>"
        }else{
            innerText+="<button class='disabledResearchButton' onclick='research(2); sounds(1)'>"+researchables[2][researchProgress[2]]+"</button>"
            innerText+="<p class='disabledResearchNext'>Next: "+researchables[2][researchProgress[2]+1]+"</p>"
        }
    }else{
        innerText+="<button class='disabledResearchButton'>"+researchables[0][researchProgress[0]]+"</button>"
        innerText+="<p class='disabledResearchNext'>Next: "+researchables[0][researchProgress[0]+1]+"</p>"
        innerText+="<button class='disabledResearchButton'>"+researchables[1][researchProgress[1]]+"</button>"
        innerText+="<p class='disabledResearchNext'>Next: "+researchables[1][researchProgress[1]+1]+"</p>"
        innerText+="<button class='disabledResearchButton'>"+researchables[2][researchProgress[2]]+"</button>"
        innerText+="<p class='disabledResearchNext'>Next: "+researchables[2][researchProgress[2]+1]+"</p>"
    }
    document.getElementById("actions2").innerHTML=innerText
}

function research(type){
    if(researchables[type][researchProgress[type]]!="None"){
    currentResearch=researchables[type][researchProgress[type]]
    researchProgress[type]++
    researchingOn=true
    activateResearch()
    }
}

function researching(){
    if(researchingOn==true){
        currentResearchProgress+=monthlyResearch;
    }
    if(currentResearchProgress>=100){
        currentResearchProgress=0
        researchingOn=false
        if(currentResearch=="Market Place"){
            marketPlaceOn=true
        }else if(currentResearch=="+5% Income"){
            moneyMultiplier+=0.05
        }else if(currentResearch=="Gildhouse"){
            gildhouseOn=true
        }else if(currentResearch=="+10% Income"){
            moneyMultiplier+=0.1
        }else if(currentResearch=="Port"){
            portOn=true
        }else if(currentResearch=="+15% Income"){
            moneyMultiplier+=0.15
        }else if(currentResearch=="+5% Ressource Generation"){
            woodMultiplier+=0.05
            stoneMultiplier+=0.05
        }else if(currentResearch=="Mine"){
            mineOn=true
        }else if(currentResearch=="+10% Wood Generation"){
            woodMultiplier+=0.1
        }else if(currentResearch=="PigFarm"){
            pigFarmOn=true
        }else if(currentResearch=="+15% Stone Generation"){
            stoneMultiplier+=0.15
        }else if(currentResearch=="+15% Ressource Generation"){
            woodMultiplier+=0.15
            stoneMultiplier+=0.15
        }else if(currentResearch=="+10% Stability Gain"){
            stabilityMultitplier+=0.1
        }else if(currentResearch=="City"){
            cityOn=true
        }else if(currentResearch=="Town Hall"){
            townHallOn=true
        }else if(currentResearch=="University"){
            universityOn=true
        }else if(currentResearch=="+10% Political Power Gain"){
            politicalPowerMultitplier+=0.1
        }else if(currentResearch=="Castle"){
            castleOn=true
        }
        currentResearch="None"
    }
}

function stabilityConsequences(){
    if(stability<50){
        stabilityBonus=1
    }else if(stability<60){
        stabilityBonus=1.05
    }else if(stability<70){
        stabilityBonus=1.1
    }else if(stability<80){
        stabilityBonus=1.15
    }else if(stability<90){
        stabilityBonus=1.2
    }else if(stability<=100){
        stabilityBonus=1.25
    }
    randomizer=Math.random()*30
    if(randomizer>stability){
        startRebellion()
    }
}

function randomEvent(){
    randomNumber=Math.floor(Math.random)*1000
    switch(randomNumber){
        case 0://Peasents demand food
            showRandomEvent(0)
            break;
        case 1://Famous austrian painter visits us
            showRandomEvent(1)
            break;
        case 2:// Crown breaks
            showRandomEvent(2)
            break;
        case 3://
            showRandomEvent(3)
            break;
        case 4://
            showRandomEvent(4)
            break;
        case 5://
            showRandomEvent(5)
            break;
        case 6://You inherit your cousins land
            showRandomEvent(6)
            break;
        case 7://A metoer has been sighted
            showRandomEvent(7)
            break;
        default:

            break;
    }
}

function showRandomEvent(eventType){
    timeOn=false
    document.getElementById("inGame_button_backToMenu").style.color="grey"
    document.getElementById("inGame_button_backToMenu").style.borderColor="grey"
    document.getElementById("inGame_button_backToMenu").disabled=true
    switch(eventType){
        case 0: // Food
            innerText="Event<br><p class='eventText'>Peasents demand more Food<br></p>"
            if(food>=300 && politicalPower>=500){
                innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(0, 1); sounds(1)'>We can surely spare some food<br>(+20 Stability && -300 Food && -500  Authority) </button>"
            }
            innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(0, 1); sounds(1)'>We can not spare any food<br>(-10 Prestige & -5 Stability) </button>"
            break;
        case 1: // Painter visits
            innerText="Event<br><p class='eventText'>Famous austrian painter visits us<br></p>"
            innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(1, 1); sounds(1)'>He should draw me<br>(+200 Authority) </button>"
            if(politicalPower>=300){
                innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(1, 1); sounds(1)'>He should draw a landscape<br>(+10 Prestige && -300 Authority) </button>"
            }
            break;
        case 2: // Your old Crown broke
            innerText="Event<br><p class='eventText'>Your old crown just broke us<br></p>"
            if(money>=300 && politicalPower>=600){
                innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(1, 1); sounds(1)'>Make a new, more beautiful one<br>(+20 Prestige && -300 Money && -600 Authority) </button>"
            }
            innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(1, 1); sounds(1)'>Repair the old one<br>(-5 Prestige && -50 Money) </button>"
            break;
        case 3:

            break;
        case 4:

            break;
        case 5:

            break;
        case 6: // Free Land
            innerText="Event<br><p class='eventText'>You inherit you cousin's land<br></p>"
            if(politicalPower>=1000){
            innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(6, 1); sounds(1)'>I shall accept this inheritance<br>(+10 Building Slots && -1000 Authority) </button>"
            }
            innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(6, 1); sounds(1)'>Sell his land<br>(+500 Money && -5 Prestige) </button>"
            break;
        case 7: //Meteor
            innerText="Event<br><p class='eventText'>A meteor was seen<br></p>"
            if(politicalPower>=500){
                innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(7, 1); sounds(1)'>It is a good omen<br>(+20 Stability && -500 Authority) </button>"
            }
            innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(7, 1); sounds(1)'>It is a bad omen<br>(-20 Stability) </button>"
            break;
        case 100: // Krieg gewonnen
            innerText="War<br><p class='eventText'>You won the battle<br></p>"
            innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(100, 1); sounds(1)'>Annex them<br>(+10 Prestige & +10 Slots) </button>"
            innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(100, 2); sounds(1)'>Let them pay<br>(+10 Prestige & +500 Money) </button>"
            document.getElementById("warfield").style.display="none"
            break;
        case 101: // Krieg verloren
            innerText="War<br><p class='eventText'>You lost the battle<br></p>"
            innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(101, 1); sounds(1)'>Pay war reperation<br>(-10 Prestige & -300 Money) </button>"
            innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(101, 2); sounds(1)'>Refuse to pay<br>(-10 Prestige & -10 Stability) </button>"
            document.getElementById("warfield").style.display="none"
            break;
        case 102: //Rebellion gewonnen
            if(france==false){
                innerText="Rebellion<br><p class='eventText'>You won the Rebellion<br></p>"
                innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(101, 1); sounds(1)'>Crush them<br>(+10 Prestige & +20 Stability) </button>"
            }else{
                innerText="Rebellion<br><p class='eventText'>Vous avez gagné la rébellion<br></p>"
                innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(101, 1); sounds(1)'>Écrasez-les<br>(+10 Prestige & +20 Stability) </button>"
            }
            document.getElementById("warfield").style.display="none"
            break;
        case 103: //Rebellion verloren
            if(france==false){
                innerText="Rebellion<br><p class='eventText'>You lost the Rebellion<br></p>"
                innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(101, 1); sounds(1)'>Give in to their demands<br>(-20 Prestige & -300 Money<br> & +20 Stability) </button>"
            }else{
                innerText="Rebellion<br><p class='eventText'>Vous avez perdu la rébellion<br></p>"
                innerText+="<button class='randomEventButton' onclick='resolveRandomEvent(101, 1); sounds(1)'>Céder à leurs exigences<br>(-20 Prestige & -300 Money<br> & +20 Stability) </button>"
            }
            document.getElementById("warfield").style.display="none"
            break;
    }
    document.getElementById("eventfield").style.display="block"
    document.getElementById("eventfield").innerHTML=innerText
}

function resolveRandomEvent(eventType, option){
    timeOn=true
    if(eventType==100){
        if(option==1){
            prestige+=10
            buildingSlots+=10
        }else{
            prestige+=10
            money+=500
        }
        warOn=false
        document.getElementById("buildingCount").innerText="Buildings: "+buildings+"/"+buildingSlots
    }if(eventType==101){
        if(option==1){
            prestige-=10
            money-=300
        }else{
            prestige-=10
            stability-=20
        }
        warOn=false
        document.getElementById("buildingCount").innerText="Buildings: "+buildings+"/"+buildingSlots
    }
    document.getElementById("inGame_button_backToMenu").style.color="white"
    document.getElementById("inGame_button_backToMenu").style.borderColor="white"
    document.getElementById("inGame_button_backToMenu").disabled=false
    updateUI()
    updateActions()
    document.getElementById("eventfield").style.display="none"
    document.getElementById("gamefield").style.display="block"
}

function activateMinesweeper(){
    warOn=true
    timeOn=false
    money-=200
    stability-=10
    document.getElementById("inGame_button_backToMenu").style.color="grey"
    document.getElementById("inGame_button_backToMenu").style.borderColor="grey"
    document.getElementById("inGame_button_backToMenu").disabled=true
    innerText="War<br><div id='minesweeper' style='display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'>"
    for(i=1; i<100+1; i++){
        innerText+="<img value=0 src='sources/field.png' id=field"+i+" class='field' onclick='field("+i+")'>"
    }
    innerText+="</div>"
    document.getElementById("gamefield").style.display="none"
    document.getElementById("warfield").style.display="block"
    document.getElementById("warfield").innerHTML=innerText
    emptyField=0
    updateUI()
    updateActions()
    placeMines()
}

function placeMines(){
    for(i=0; i<15; i++){
        randomizer=Math.floor(Math.random()*100+1)
        if(document.getElementById("field"+randomizer).value!=1){
            document.getElementById("field"+randomizer).value=1
        }else{
            i--
        }
    }
}
function field(field){
    if(document.getElementById("field"+field).value!=2){
        nearbyMines=searchMines(field)
        if(nearbyMines=="mine"){
            showRandomEvent(101)
        }else if(mines>0){
            document.getElementById("field"+field).src="sources/field"+mines+".png"
            document.getElementById("field"+field).style.borderColor="grey"
            document.getElementById("field"+field).value=2
            emptyField++
        }else{
            document.getElementById("field"+field).src="sources/empty.png"
            document.getElementById("field"+field).style.borderColor="grey"
            document.getElementById("field"+field).value=2
            emptyField++
        }
        if(emptyField==85){
            showRandomEvent(100)
        }
    }
}

function searchMines(field){
    mines=0
    if(document.getElementById("field"+field).value==1){
        return "mine"
    }
    if((field-1)%10!=0){//links
        x=field-1
        if(document.getElementById("field"+x).value==1){
            mines++
        }
    }if(field>10){//oben
        x=field-10
        if(document.getElementById("field"+x).value==1){
            mines++
        }
    }if(field%10!=0){//rechts
        x=field+1
        if(document.getElementById("field"+x).value==1){
            mines++
        }
    }if(field<90){//unten
        x=field+10
        if(document.getElementById("field"+x).value==1){
            mines++
        }
    }if((field-1)%10!=0 && field>10){//oben links
        x=field-11
        if(document.getElementById("field"+x).value==1){
            mines++
        }
    }if(field>10 && field%10!=0){//oben rechts
        x=field-9
        if(document.getElementById("field"+x).value==1){
            mines++
        }
    }if(field%10!=0 && field<90){//unten rechts
        x=field+11
        if(document.getElementById("field"+x).value==1){
            mines++     
        }
    }if((field-1)%10!=0 && field<90){//unten links
        x=field+9
        if(document.getElementById("field"+x).value==1){
            mines++
        }
    }
    return mines
    
}

function options(){
    document.getElementById("mainmenu").style.display="none"
    document.getElementById("optionsMenu").style.display="block"
}

function musicVolume(){
    if(musicOn==false){
        music()
        musicOn=true
    }
    volumeMusic=document.getElementById("options_slider_music").value/100
    if(drip==false){
        document.getElementById("audiofile").volume=volumeMusic
        document.getElementById("audiofile2").volume=volumeMusic
        document.getElementById("audiofile3").volume=volumeMusic
        document.getElementById("audiofile4").volume=volumeMusic
        document.getElementById("audiofile5").volume=volumeMusic    
    }
    document.getElementById("sus").volume=volumeMusic
}
function soundsVolume(){
    volumeSounds=document.getElementById("options_slider_sounds").value/100
    document.getElementById("buttonSound").volume=volumeSounds
    document.getElementById("warSound").volume=volumeSounds
    document.getElementById("moneySound").volume=volumeSounds/10
}

function sounds(type){
    if(type==1){
        if(tastyButtons==false){
            document.getElementById("buttonSound").play()
        }else{
            document.getElementById("alternativeButtonSound").play()
        }
    }if(type==2){
        document.getElementById("warSound").play()
    }if(type==3){
        //document.getElementById("moneySound").play()
    }
}

function music(){
    document.getElementById("audiofile").play()
    setTimeout(() => {
        document.getElementById("audiofile2").play()
        setTimeout(() => {
            document.getElementById("audiofile3").play()
            setTimeout(() => {
                document.getElementById("audiofile4").play()
                setTimeout(() => {
                    document.getElementById("audiofile5").play()
                    setTimeout(() => {
                        music()
                    }, 124800);
                }, 201600);
            }, 190800);
        }, 127200);
    }, 197400);
}

function backToMenu(){
    document.getElementById("optionsMenu").style.display="none"
    document.getElementById("loadMenu").style.display="none"
    document.getElementById("mainmenu").style.display="block"
    document.getElementById("nothing").style.display="none"
    document.getElementById("nothingsVideo").pause()
    document.getElementById("game").style.display="none"
    timeOn=false
    if(drip==false){
        document.getElementById("audiofile").volume=volumeMusic
        document.getElementById("audiofile2").volume=volumeMusic
        document.getElementById("audiofile3").volume=volumeMusic
        document.getElementById("audiofile4").volume=volumeMusic
        document.getElementById("audiofile5").volume=volumeMusic
    }
}

function backToOptions(){
    document.getElementById("optionsMenu").style.display="block"
    document.getElementById("extrasMenu").style.display="none"
}

function activateExtras(){
    document.getElementById("optionsMenu").style.display="none"
    document.getElementById("extrasMenu").style.display="block"
}

function extra(type){
    if(type==1){
        tastyButtons=!tastyButtons
        if(tastyButtons==true){
document.getElementById("menu_button_buttonSound").innerHTML="Tasty Buttons: <br> On"
        }else{
document.getElementById("menu_button_buttonSound").innerHTML="Tasty Buttons: <br> Off"
        }
    }if(type==2){
        gaymode=!gaymode
        if(gaymode==true){
            //Quelle https://giphy.com/explore/colored-raibow
            document.getElementById("body").style.backgroundImage="url('gaymode.gif')"
        }else{
            document.getElementById("body").style.backgroundImage="url('background.jpg')"
        }
    }if(type==3){
        drip=!drip
        if(drip==true){
            if(volumeMusic==0){
                document.getElementById("sus").volume=1
            }else{
                document.getElementById("sus").volume=volumeMusic
            }
            document.getElementById("sus").play()
            oldportrait=portrait
            portrait=7
            oldruler=ruler
            ruler="Sussus Amogus"
            document.getElementById("audiofile").volume=0
            document.getElementById("audiofile2").volume=0
            document.getElementById("audiofile3").volume=0
            document.getElementById("audiofile4").volume=0
            document.getElementById("audiofile5").volume=0
            updateActions()
        }else{
            document.getElementById("sus").volume=volumeMusic
            document.getElementById("sus").pause()
            portrait=oldportrait
            ruler=oldruler
            document.getElementById("audiofile").volume=volumeMusic
            document.getElementById("audiofile2").volume=volumeMusic
            document.getElementById("audiofile3").volume=volumeMusic
            document.getElementById("audiofile4").volume=volumeMusic
            document.getElementById("audiofile5").volume=volumeMusic
            updateActions()
        }
    }
}

function restart(){
    window.location.href="President Simulator 2 Royale.html"
}

function nothing(){
    document.getElementById("optionsMenu").style.display="none"
    document.getElementById("nothing").style.display="block"
    document.getElementById("nothingsVideo").play()
    document.getElementById("audiofile").volume=0
    document.getElementById("audiofile2").volume=0
    document.getElementById("audiofile3").volume=0
    document.getElementById("audiofile4").volume=0
    document.getElementById("audiofile5").volume=0
    document.getElementById("sus").volume=0
}

window.onload = function(){
    document.getElementById("moneySound").volume=0.00
}

function getArray(x){
    return JSON.parse(localStorage.getItem("save"+x))
}
/*
secretCode="dick"
secretInput=""
document.addEventListener("keydown",(event) => {
    key=event.key;
    secretInput+=key
    if(secretInput==secretCode){
        buildingCode+="<img id='b"+buildingID+"' src='stripclub.png' style='width: 100%'>"
        document.getElementById("buildingPlace").innerHTML=buildingCode
        monthlyMoney+=100
        buildingID++
        buildings++
        document.getElementById("buildingCount").innerText="Buildings: "+buildings+"/"+buildingSlots
        updateUI()
        updateActions()
    }
}, true)

document.addEventListener("keyup",(event) => {
    secretInput=""
}, true)
*/