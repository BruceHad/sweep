<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['group_name'])){
    $comp = $_GET['comp'];
    $group_name = $_GET['group_name'];
    $group_id = 
    $query=mysql_query("
    select group_id, group_name, comp_id
    from sweep_groups
    where comp_id = '$comp'
    ;") or die(mysql_error());
     
    # Collect the results
    while($obj = mysql_fetch_object($query)) {
        $arr[] = $obj;
    }
     
    # JSON-encode the response
    echo $json_response = json_encode($arr);
}

?>