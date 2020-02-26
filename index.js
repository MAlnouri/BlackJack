let userArray = [];


// define a constructor to create player objects
var PlayerObject = function (pPlayerID, pName) {
  this.PlayerID = pPlayerID;
  this.PlayerName = pName;
}

document.addEventListener("DOMContentLoaded", function () {

player0 = new PlayerObject(0,"firstPerson");
player1 = new PlayerObject(1,"secondPerson");
player2 = new PlayerObject(2,"thirdPerson");

userArray.push(player0);
userArray.push(player1);
userArray.push(player2);

console.log(userArray);

$(document).on("pagebeforeshow", "#page2", function (event) {   // have to use jQuery 
 // document.getElementById("IDparmHere").innerHTML = "";
  createList();
});

});

function createList()
{
  // clear prior data
  var divUserlist = document.getElementById("divUserlist");
  while (divUserlist.firstChild) {    // remove any old data so don't get duplicates
      divUserlist.removeChild(divUserlist.firstChild);
  };

  var ul = document.createElement('ul');  
  userArray.forEach(function (element,) {   // use handy array forEach method
    var li = document.createElement('li');
    li.innerHTML = "<a data-transition='pop' class='onePlayer' data-parm=" + element.PlayerID + "  href='#page3'>Jump </a> " + element.PlayerName;
    ul.appendChild(li);
  });
  divUserlist.appendChild(ul)

    // set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
    var classname = document.getElementsByClassName("onePlayer");
    Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function(){
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            console.log(parm);
            //do something here with parameter on  pickbet page
            document.getElementById("IDparmHere").innerHTML = parm;
            document.location.href = "index.html#page3";
        });
    });
  } ;