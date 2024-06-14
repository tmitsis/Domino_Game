<?php

require_once "../lib/dbconnect.php";
require_once "../lib/tiles.php";
require_once "../lib/game.php";
require_once "../lib/users.php";

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$request_path = trim($_SERVER['PATH_INFO'],'/');
$input = json_decode(file_get_contents('php://input'),true);
if($input==null) {
    $input=[];
}
if(isset($_SERVER['HTTP_X_TOKEN'])) {
    $input['token']=$_SERVER['HTTP_X_TOKEN'];
} else {
    $input['token']='';
}


//header('Content-Type: text/plain');
//print "method=$method"."\n";
//print "path_info=".$_SERVER['PATH_INFO']."\n";
//print_r($request);

switch($r=array_shift($request)){
    case "tiles" :
        switch ($b=array_shift($request)){
            case '0':
            case '3':
            case '4':
            case '5':
            case '6': 
            case '':
            case '1':
            case '2':        
            case null: handle_tiles($method,$b,$input);
                            break;                       
            }
            break;
    case "status" :
        if(sizeof($request)==0) {
            handle_status($method);}
        else {
            header("HTTP/1.1 404 Not found");}
        break;
    case "players": handle_player($method, $request,$input);
        break;
    default: header("HTTP/1.1 404 Not Found");
            exit;

}


function handle_tiles($method, $b,$input){
    if($method=='GET'){
        show_tiles($b);
    }else if ($method=='PUT'){
        set_tiles($b,$input);
    }/*else if ($method=='POST'){
        order_tiles();
    }*/else if ($method=='DELETE'){
        reset_board();
    }else{    
        header("HTTP/1.1 405 Method Not Allowed");

    }
}

    function handle_player($method, $p,$input){
        switch ($b=array_shift($p)) {
                case '' :
                case '1':
                case '2': handle_user($method, $b,$input);
                            break;
                default: header("HTTP/1.1 404 Not Found");
                         print json_encode(['errormesg'=>"Player $b not found."]);
                         break;
            }
        }

    

        function handle_status($method) {
            if($method=='GET') {
                show_status();
            } else {
                header('HTTP/1.1 405 Method Not Allowed');
            }
        }

        function handle_left_hand($method,$p,$input){
            switch ($b=array_shift($p)) {
                case '': handle_tile_left($method, $b,$input);
                    break;
                    default: header("HTTP/1.1 404 Not Found");
                             print json_encode(['errormesg'=>"Player $b not found."]);
                             break;
                }   
            }

            function handle_right_hand($method,$p,$input){
                switch ($b=array_shift($p)) { 
                    
                    case '': handle_tile_right($method, $b,$input);
                                    break;
                        default: header("HTTP/1.1 404 Not Found");
                                 print json_encode(['errormesg'=>"Player $b not found."]);
                                 break;
                    }   
                }
        
    

?>