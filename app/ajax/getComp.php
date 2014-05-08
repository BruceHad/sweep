<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['comp'])){
    $comp = $_GET['comp'];
    $query=mysql_query("
    select comp_id,
        comp_name
    from sweep_competitions
    where comp_id = lower('$comp')
    ;") or die(mysql_error());
     
    # Collect the results
    while($obj = mysql_fetch_object($query)) {
        $arr[] = $obj;
    }
     
    # JSON-encode the response
    echo $json_response = json_encode($arr);
}

?>