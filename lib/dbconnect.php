<?php

$host='localhost';
$db = 'dominoes';
require_once 'db_upass.php';




$user=$DB_USER;
$pass=$DB_PASS;


if(gethostname() == 'users.iee.ihu.gr') {
        
        $mysqli = new mysqli($host,$user, $pass, $db,null,'/home/student/it/2018/it185230/mysql/run/mysql.sock');
}
 else{
            $pass=null;               
            $mysqli=new mysqli($host,$user,$pass,$db);
 }

if ($mysqli -> connect_errno){
                        echo "Failed to connect to MySQL: (" .
                        $mysqli -> connect_errno . ") " . $mysqli -> connect_errno;
}?>