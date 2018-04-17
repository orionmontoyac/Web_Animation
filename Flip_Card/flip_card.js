//FLIP-CARD
function myFunction(event) {
    var x = event.key;
    console.log(x);
    if (x == 's'){
        document.getElementById("block").style.backgroundColor = "blue";
    }else{
        document.getElementById("block").style.backgroundColor = "red";
    }
}
function flipCards(){
    var ancho = document.body.offsetWidth;
    var i,j;
    for (j=0;j<5;j++){
        var Cdiv = document.createElement('div');
        Cdiv.id = 'container' + j;
        Cdiv.className = 'container';
        document.getElementsByTagName('body')[0].appendChild(Cdiv);
        
        for (i=0;i<10;i++){
            var iDiv = document.createElement('div');       
            iDiv.className = 'card';        document.getElementById('container' + j).appendChild(iDiv)
        }
    }
    
        /*for(i = 0; i<20; i++){
            var iDiv = document.createElement('div');       
            iDiv.className = 'card';
            iDiv.style.width = toString(ancho*0.1) + 'px';
            iDiv.style.height =toString(ancho*0.1) + 'px';
            document.getElementById('container'+j).appendChild(iDiv);
            //document.getElementsByTagName('body')[0].appendChild(iDiv);
        }*/
   
     /*   var iDiv = document.createElement('div');       
        iDiv.className = 'card';
        document.getElementById('container0').appendChild(iDiv)
    console.log(ancho*0.1);   */ 
        
}
window.onload = function(){
    flipCards();
/**var iDiv = document.createElement('div');
iDiv.id = 'block';
iDiv.className = 'block';
iDiv.style.width ='200px';
iDiv.style.height ='200px';
document.getElementsByTagName('body')[0].appendChild(iDiv); */ 
}
