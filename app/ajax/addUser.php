<?php
require_once 'db.php'; // The mysql database connection script

if(isset($_GET['email'])){
    # Get Parameters
    $email = $_GET['email'];
    $group_id = $_GET['group_id'];

    # Insert user into sweep_users 
    $query=mysql_query("
    insert into `sweep_users` (`email`, `group_id`)
    values ('$email', '$group_id');") or die(mysql_error());

    echo $name." inserted into sweep_users and registered with ".$group;
} 
else {
    echo "Name not found";
}; 


?>