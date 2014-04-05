<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['group_name'])){
    $comp = strtoupper ($_GET['comp']);
    $group_name = $_GET['group_name'];
    $id = uniqid();

    $query=mysql_query("
    insert into `sweep_groups` 
    (`group_id`, `group_name`, `comp_id`)
    values
    ('$id', '$group_name', '$comp')
    ;") or die(mysql_error());
     
    # JSON-encode the response
    echo $group_name . " inserted into sweep_groups";
} else {
    echo "Not found";
}

?>