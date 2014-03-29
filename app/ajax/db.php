<?php

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = 'mnitria34yo';

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die                      ('Error connecting to mysql');

$dbname = 'test';
mysql_select_db($dbname);

?>