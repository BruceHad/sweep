<?php

/*
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = 'mnitria34yo';
$dbname = 'test';
*/

$dbhost = 'localhost';
$dbuser = 'hoovervi_test';
$dbpass = 'F.z{+!MSO5Z-';
$dbname = 'hoovervi_test';

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die('Error connecting to mysql');


mysql_select_db($dbname);

?>