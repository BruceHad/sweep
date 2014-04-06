<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['id'])){
    $id = $_GET['id'];
    $query=mysql_query("
    select 
        su.user_id,
        su.username,
        su.email,
        su.av_url,
        sg.group_id,
        sg.group_name
    from sweep_users su
        inner join sweep_user_group sug
        on (su.user_id = sug.user_id)
        inner join sweep_groups sg
        on (sg.group_id = sug.group_id)
    where su.user_id =  '$id'
    ;") or die(mysql_error());
     
    # Collect the results
    while($obj = mysql_fetch_object($query)) {
        $arr[] = $obj;
    }
     
    # JSON-encode the response
    echo $json_response = json_encode($arr);
} else {
    echo "Not found";
}

?>