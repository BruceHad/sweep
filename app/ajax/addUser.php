<?php
require_once 'db.php'; // The mysql database connection script

if(isset($_GET['email'])){
    # Get Parameters
    $email = $_GET['email'];
    $group = $_GET['group'];
    $id = uniqid();

    # Insert user into sweep_users 
    $query=mysql_query("
    insert into `sweep_users` (`user_id`, `email`)
    values ('$id', '$email');") or die(mysql_error());

    # Register new user with group
    $query=mysql_query("
    insert into `sweep_user_group` (`group_id`, `user_id`)
    values ('$group', '$id');") or die(mysql_error());

    echo $name." inserted into sweep_users and registered with ".$group;
} 
else {
    echo "Name not found";
}; 


?>