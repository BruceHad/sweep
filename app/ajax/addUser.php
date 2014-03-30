<?php
require_once 'db.php'; // The mysql database connection script

if(isset($_GET['name'])){
    $name=$_GET['name'];
    $group = $_GET['group'];

    $query=mysql_query("
insert into `sweep_users` (`username`, `nickname`, `group_id`)
values ('$name', '$name', $group);") or die(mysql_error());

    echo "Complete, $name, $group has been added to sweep_users .";
}


?>