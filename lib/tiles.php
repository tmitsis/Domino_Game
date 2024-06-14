<?php
require_once "../lib/game.php";


function show_tiles($b) {
	if($b==''){
		global $mysqli;
	
	$sql = 'select * from dominoes_tiles order by last_action';
	$st = $mysqli->prepare($sql);

	$st->execute();
	$res = $st->get_result();
	header('Content-type: application/json');
	print json_encode($res->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);

	}else{
	global $mysqli;
	
	$sql = 'select * from dominoes_tiles where player_hand=? ';
	$st = $mysqli->prepare($sql);
	$st->bind_param('s',$b);
	$st->execute();
	$res = $st->get_result();
	header('Content-type: application/json');
	print json_encode($res->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);

}}



function  set_tiles($b,$input){
	$id=$input['id'];
	global $mysqli;
    p_turn();
	$sql = 'update dominoes.dominoes_tiles set player_hand=? where id=?';
	$st2 = $mysqli->prepare($sql);
	$st2->bind_param('ss',$b,$id);
	$st2->execute();
    //update_game_status();
	$sql = 'select * from dominoes_tiles where id=?';
	$st = $mysqli->prepare($sql);
	$st->bind_param('s',$id);
	$st->execute();
	$res = $st->get_result();
	header('Content-type: application/json');
	print json_encode($res->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
	
}

function show_dominoes_table($b){
		global $mysqli;
	
	$sql = 'select * from dominoes_table';
	$st = $mysqli->prepare($sql);

	$st->execute();
	$res = $st->get_result();
	header('Content-type: application/json');
	print json_encode($res->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);

	}


	function reset_board() {
		global $mysqli;
		$sql = 'call clean_board()';
		$mysqli->query($sql);
	}?>
	