
//character
var portrait=1
ruler="John Doe"
//attributes
allAttributes=16
finance=0       //gibt passiven Bonus für Geld ; Ab 15 wird Handel freigeschaltet
warfare=0      //gibt passiven Bonus für Prestige ; Ab 15 wird Krieg freigeschaltet
diplomacy=0     //gibt passiven Bonus für Stability und Political Power ; Ab 15 

//ressources and stats
money=10000//braucht man für alles was man kaufen kann
stability=100         //kann zu Rebellion führen und gibt passive Boni auf Ressourcen
politicalPower=10000    //braucht man für positive Aktionen bei random Events
prestige=10          //braucht man um Attributes zu steigern
food=200

//multipliers
moneyMultiplier=1
stabilityBonus=1
stabilityMultitplier=1
politicalPowerMultitplier=1
prestigeMultiplier=1
woodMultiplier=1
stoneMultiplier=1

//can give penalty if not enough food
stabilityModifier=0

population=60
workingPopulation=20

//monthly gains
monthlyMoney=1
monthlyStability=0
monthlyPoliticalPower=0.5
monthlyPrestige=0.2
monthlyFood=-2

monthlyResearch=0

//materials
wood=10000
stone=10000

monthlyWood=0
monthlyStone=0

//other stats
buildings=3
buildingCode="<img id='b1' onclick=destroy('b1',01) src='sources/t01.png' style='width: 100%'><img id='b2' onclick=destroy('b2',09) src='sources/t09.png' style='width: 100%'><img id='b3' onclick=destroy('b3',06) src='sources/t06.png' style='width: 100%'>"
buildingID=4
buildingSlots=20
//time
year=2022
month=1
day=1

timeOn=false
warOn=false

countryActive=false
actionsActive=false
buildingActive=false
researchActive=false
bonusActive=false

//unlockables
marketPlaceOn=false
gildhouseOn=false
portOn=false
mineOn=false
pigFarmOn=false
cityOn=false
townHallOn=false
universityOn=false
castleOn=false

//monuments
cathedralBuilt=false
palaceBuilt=false

//stuff for research
researchingOn=false
researchables=[
    ["Market Place", "+5% Income", "Gildhouse", "+10% Income", "Port", "+15% Income","None","None"],
    ["+5% Ressource Generation", "Mine", "+10% Wood Generation", "Pig Farm","+15% Stone Generation","+15% Ressource Generation","None","None"],
    ["+10% Stability Gain", "City", "Town Hall", "University", "+10% Political Power Gain", "Castle","None","None"]
]
//extras
tastyButtons=false
gaymode=false
drip=false
france=false

researchProgress=[0,0,0]
currentResearch="None"
currentResearchProgress=0

volumeMusic=0
volumeSounds=100
musicOn=false
oldportrait=0
oldruler=""

building_money=[0,-100,-150,-500,-1000,-200,-200,-800,-1000,-100,-300,-400,-500,-800,-1000]
building_monthlyMoney=[0,4,10,25,50,-2,-2,-20,-10,-1,-4,-10,-30,-60,-100]
building_workingPopulation=[0,20,40,80,200,30,20,80,80,0,10,0,40,100,200]
building_population=[0,0,0,0,0,0,0,0,0,60,0,200,0,0,0]
building_wood=[0,-200,-400,-400,-1000,0,-200,-800,-1000,-100,-200,-600,-200,-500,-1000]
building_stone=[0,-20,0,-100,-200,0,0,0,-400,0,0,-100,-200,-500,-1200]
building_monthlyStability=[0,0,0,0,0,-0.5,0,-2,0,0,0.2,0,1.5,0,0]
building_monthlyFood=[0,0,0,0,0,0,10,0,60,-12,0,-40,0,0,0]
building_monthlyWood=[0,0,0,0,0,20,0,0,0,0,0,0,0,0,0]
building_monthlyStone=[0,0,0,0,0,0,0,10,0,0,0,0,0,0,0]
building_monthlyPrestige=[0,0,0,0,0,0,0,0,0,0.2,0,0.5,0,2,2]
building_monthlyResearch=[0,0,0,0,0,0,0,0,0,0,1,0,0,4,0]
building_monthlyPoliticalPower=[0,0,0,0,0,0,0,0,0,0.5,0,0,3,0,4]
