<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET)){
    $group_id = $_GET['group_id'];
    $group_name = $_GET['group_name'];
    $comp_id = strtolower($_GET['comp_id']);
    $owner = $_GET['owner'];
    $location = $_GET['location'];

    $query=mysql_query("
    insert into sweep_groups 
    (group_id, group_name, c_comp_id, owner, location)
    values
    ('$group_id', '$group_name', '$comp_id', '$owner', '$location' )
    ;") or die($id . " : " . mysql_error());
     
    # JSON-encode the response
    echo $group_name . " inserted into sweep_groups";
} else {
    echo "Not found";
}

?>