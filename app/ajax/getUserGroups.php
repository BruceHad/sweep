<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['comp'])){
    $comp = $_GET['comp'];
    $query=mysql_query("
    select user_id, nickname, av_url, group_name, competition
    from sweep_users 
    inner join sweep_groups
    on (sweep_users.group_id = sweep_groups.group_id)
    where competition = '$comp'
    order by group_name, competition
    ;") or die(mysql_error());
     
    # Collect the results
    while($obj = mysql_fetch_object($query)) {
        $arr[] = $obj;
    }
     
    # JSON-encode the response
    echo $json_response = json_encode($arr);
}

?>