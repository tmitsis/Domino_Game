var p_number;
var me={};
var game_status={};
var board={};
var last_update=new Date().getTime();
var timer=null;
var sum=0; 

$(function() { 
   
    $("#login").click(login_to_game);
      
})
 
$("#start").click(set_tiles);



function login_to_game() {
   
	if($('#username').val()=='') {
		alert('You have to set a username');
		return;
	}

	p_number = $('#player_number').val();
	if(p_number==1){
        reset_board();
    }
	
	$.ajax({url: "domino.php/players/"+p_number, 
			method: 'PUT',
			dataType: "json",
			headers: {"X-Token": me.token},
			contentType: 'application/json',
			data: JSON.stringify( {username: $('#username').val(), id: p_number}),
			success: login_result,
			error: login_error});
}

function login_result(data) {
	me = data[0];
	$('#game').hide();
    check_tiles();
    
}

function login_error(data,y,z,c) {
	var x = data.responseJSON;
	alert(x.errormesg);
}

function check_tiles(){;
    $.ajax(
        {url: "domino.php/tiles/",
        headers: {"X-Token": me.token},
         success: check_tiles_by_data
        }
    ); 
}



function check_tiles_by_data(data){
    var checkbox;
    var d=0;
    checkbox='<label style="font-weight: bold; "text-align: center" ">Select 7 tiles: </label>';
    $("#tiles").html(checkbox);
    for (var i=0; i<=14;i++){
        var o=data[i];       
        if(o.player_hand==null){           
            d=i+1;            
            checkbox+=' <input type="checkbox" id= select_'+o.id+ ' name= select_'+o.id+ ' value= select_'+o.id+'> <label for= select_'+o.id+'>'+d+'</label>';
        }d=0;
    }checkbox+=' <br>';
    for (var i=15; i<=27;i++){
        var o=data[i];
       
        if(o.player_hand==null){
            
            d=i+1;            
            checkbox+=' <input type="checkbox" id= select_'+o.id+ ' name= select_'+o.id+ ' value= select_'+o.id+'> <label for='+o.id+'>'+d+'</label>';
        }d=0;
    }
    checkbox+=' <br> <button onclick="set_tiles()" id="start" class="btn btn-primary">START</button>';
    $("#tiles").html(checkbox);

    
}



function set_tiles() {
    var sum=0;
    
    
    for(var i=1;i<=28;i++){
    var checkBox= document.getElementById( 'select_'+i);
    if(checkBox==null)
    {
        console.log('null');
    }
    else
    {if(checkBox.checked == true)
        {
            var sum=sum+1;
            $.ajax({url: "domino.php/tiles/"+p_number, 
			method: 'PUT',
			dataType: "json",
			headers: {"X-Token": me.token},
			contentType: 'application/json',
			data: JSON.stringify( {id: i}),
			error: login_error});
        }
        else
        {
            console.log('unchecked');
        }
    }
}   

if(sum!=7) {
    alert('You have to select 7 tiles');
    return;
}
alert('Good Luck!');

$('#tiles').hide();
update_info();
game_status_update();
player_tiles();
take_tiles();
table_tiles();
opponent();
}

function update_info(){
	$('#game_info').html("I am Player: "+me.id+", my name is "+me.username +'<br>Token='+me.token+'<br>Game state: '+game_status.status+', '+ game_status.p_turn+' must play now.');
}

function game_status_update() {
	
	clearTimeout(timer);
	$.ajax({url: "domino.php/status/", success: update_status,headers: {"X-Token": me.token} 
});
}

function update_status(data) {
	last_update=new Date().getTime();
	var game_stat_old = game_status;
	game_status=data[0];
	update_info();
	clearTimeout(timer);
	if(game_status.p_turn==me.id &&  me.id!=null) {
		x=0;
		
		if(game_stat_old.p_turn!=game_status.p_turn) {
			
		}
		$('#player_tiles').show(1000);
        $('#null_tiles').show(1000);
		timer=setTimeout(function() {
            game_status_update();
            player_tiles();
            take_tiles();
            opponent();
            table_tiles();
        }, 6000);
	} else {
		// must wait for something
		$('#player_tiles').hide(1000);
        $('#null_tiles').hide(1000);
		timer=setTimeout(function() {
            game_status_update();
            player_tiles();
            take_tiles();
            opponent();
            table_tiles();}, 6000);
	}
 	
}

function player_tiles(){

    $.ajax({url: "domino.php/tiles/"+p_number, 
    headers: {"X-Token": me.token},
    success: show_tiles});
}
var tile='';

function show_tiles(data){
    
    var d=0;
    tile='<label style="font-weight: bold; "text-align: center" ">Your tiles: </label>';
    $("#player_tiles").html(tile);
    
    for (var i=0; i<data.length;i++){
        var o=data[i];
        
        if(o.player_hand==p_number){         
            d=d+1;   
            tile+=' <input type="checkbox" id=your_'+o.id+' name=your_'+o.id+' value=your_'+o.id+'> <label for=your_'+o.id+'>'+ o.x+'_'+o.y +'</label>';
        } 
}
tile+='<br><button id="drop" onclick="drop_tile()">DROP</button> ';
$('#player_tiles').html(tile);
}
function take_tiles(){
$.ajax({url: "domino.php/tiles/", 
    success: null_tiles});
}


function null_tiles(data){
    var y=0;
    var d=0;
    tile='<label style="font-weight: bold; "text-align: center" ">Pull tile: </label>';
    $("#null_tiles").html(tile);
    for (var i=0; i<=27;i++){
        var o=data[i];
        if(o.player_hand==null){
            y=y+1;                              
            d=i+1;   
            tile+='<input type="checkbox" id=pull_'+o.id+' name=pull_'+o.id+' value=pull_'+o.id+' > <label for=pull_'+o.id+'>'+d+'</label>';
        if(y==2){
            y=0;
            tile+='<br>';
        }
        }else{
                    
    } d=0;   
    
} tile+='<button id="pull" onclick="data_pull_tile() ">PULL</button>';
$('#null_tiles').html(tile);


}

function table_tiles(data){
    $.ajax({url: "domino.php/tiles/", 
   headers: {"X-Token": me.token},
    success: set_tiles_to_table});


}

function set_tiles_to_table(data){
          
    var y='';
    for (var i=0; i<=27;i++){
        var o=data[i];
        if(o.player_hand==0){                                   
            y+='|'+o.x+'_'+o.y+'|';
        }
        else if(o.player_hand==3)
        {
            y='|'+o.y+'_'+o.x+'|'+y;
        }else if (o.player_hand==4){
            y='|'+o.x+'_'+o.y+'|'+y;
        }else if (o.player_hand==5){
            y=y+'|'+o.x+'_'+o.y+'|';
        }else if (o.player_hand==6){
            y=y+'|'+o.y+'_'+o.x+'|';
        }             
    } $('#table').html(y);

}


function opponent(){
    if(p_number==1){
    $.ajax({url: "domino.php/tiles/"+2, 
   headers: {"X-Token": me.token},
    success: show_opponent});
}else if(p_number==2){
    $.ajax({url: "domino.php/tiles/"+1, 
   headers: {"X-Token": me.token},
    success: show_opponent});
}

}
function show_opponent(data){
    var zero=1;
    var player1;
    var player2;
   
    
    length=data.length;
    tile='<label style="font-weight: bold; "text-align: center" ">Opponent tiles:'+data.length+' </label>';
    $('#opponent_tiles').html(tile);
}

var showbox;
var pullbox;


function data_pull_tile(){
    var sum=0;
    
    for(var i=1;i<=28;i++){
    var checkBox= document.getElementById( 'pull_'+i);

    if(checkBox==null)
    {
        console.log('null');
    }
    else if(checkBox.checked == true)
        {sum=sum+1;
            
            pullbox=checkBox;
        }
        else
        {
            console.log('unchecked');
        
    }}
    console.log("edw"+sum);
    if(sum>1){
    
        alert("Select 1 tile to pull!");
    }else if(sum==0){
    
        alert("Select 1 tile to pull!");
    }else{

    $.ajax({url: "domino.php/tiles/", 
    headers: {"X-Token": me.token},
    success: pull_tile});
}
}


//ΚΟΥΜΠΙ ΓΙΑ  PULL ΠΛΑΚΙΔΙΟΥ
function pull_tile(data){
   
    var text=pullbox.value;
    var id=text.split("_");
    var z;
    
   
    for(var i=0;i<=27;i++){ 
        var dt=data[i];
        
        if(id[1]==dt.id){ 
            z=i;
        }
    }
    o=data[z];
  
    var sum=sum+1;
    $.ajax({url: "domino.php/tiles/"+p_number, 
	method: 'PUT',
	dataType: "json",
	headers: {"X-Token": me.token},
	contentType: 'application/json',
	data: JSON.stringify( {id: o.id}),
	error: login_error});

}  


//ΚΟΥΜΠΙ ΓΙΑ DROP ΠΛΑΚΙΔΙΟΥ
function drop_tile(){

var sum=0;
    
for(var i=1;i<=28;i++){
var checkBox= document.getElementById( 'your_'+i);
showbox;
if(checkBox==null)
{
    console.log('null');
}
else if(checkBox.checked == true)
    {sum=sum+1;
        showbox=checkBox;
        console.log(sum);
    }
    else
    {
        console.log('unchecked');
    }
}
if(sum>1){
    alert("Select 1 tile to drop!");
}else if(sum=0){//==wrong
    alert("Select 1 tile to drop!");
}else{
 

    $.ajax({url: "domino.php/tiles/", 
   
    success: get_table_tiles});
}
}   


var left;
var right;

      
//ΤΟΠΟΘΕΤΗΣΗ ΜΕΤΑ ΤΟΝ ΕΛΕΓΧΟ
        function set_table_tiles(data){
        
            var text=showbox.value;
            var id=text.split("_");
            
            var o = data[id[1]];
            var z;
            for(var i=0;i<=27;i++){
                if(id[1]==data[i].id){
                    z=i;
                }
            }
            o=data[z];
         

    if(left==null && right==null){
       

       $.ajax({url: "domino.php/tiles/0" ,
                method: 'PUT',
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify( {id: id[1]}),    
                success: game_status_update(),             
                error: login_error});

      
        }else if(left==o.x){
            
            $.ajax({url: "domino.php/tiles/3" ,
                method: 'PUT',
                dataType: "json",
                
                contentType: 'application/json',
                data: JSON.stringify( {id: id[1]}),
                success: game_status_update(),
                error: login_error});
    
        }
        else if(left==o.y){ 
            
            $.ajax({url: "domino.php/tiles/4" ,
                method: 'PUT',
                dataType: "json",
                
                contentType: 'application/json',
                data: JSON.stringify( {id: id[1]}),
                success: game_status_update(),
                error: login_error});  
        }
        else if(right==o.x){       
            $.ajax({url: "domino.php/tiles/5",
                method: 'PUT',
                dataType: "json", 
                contentType: 'application/json',
                data: JSON.stringify( {id: id[1]}),
                success: game_status_update(),             
                error: login_error});   
        }
        else if(right==o.y){
         
            $.ajax({url: "domino.php/tiles/6" ,
                method: 'PUT',
                dataType: "json", 
                contentType: 'application/json',
                data: JSON.stringify( {id: id[1]}),
                success: game_status_update(),
                error: login_error});  

        }
        else{
            alert("Wrong move!");
        }
    
            }

       function reset_board() {
            $.ajax({url: "domino.php/tiles/", headers: {"X-Token": me.token}, method: 'DELETE'});
            //$.ajax({url: "domino.php/players/", headers: {"X-Token": me.token}, method: 'DELETE'});
        }



    
//ΕΛΕΓΧΟΙ ΚΙΝΗΣΕΩΝ    
function get_table_tiles(data){
    for(i=0;i<=27;i++){
        
        if(data[i].player_hand==null && i==27){
            left=null;
            right=null;
        }
        else if(data[i].player_hand==0){
            for(j=i;j<=27;j++){
                if(data[j].player_hand==0){
                    
                    left=data[j].x;
                    right=data[j].y;
                }else if(data[j].player_hand==3){
                  
                    left=data[j].y;

                }else if(data[j].player_hand==4){
                  
                    left=data[j].x;
                }
                else if(data[j].player_hand==5){
                    
                    right=data[j].y;
                }
                else if(data[j].player_hand==6){
                   
                    right=data[j].x
                }

            }
        }
    }
    console.log(left);
    console.log(right);
    $.ajax({url: "domino.php/tiles/", 
            
    success: set_table_tiles});

}
