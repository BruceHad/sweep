<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['team'])) {
    $team_id = $_GET['team'];
    $user_name = $_GET['user'];
    $group_id = $_GET['group'];

    $query=mysql_query("
    insert into `sweep_picks` 
    (`g_group_id`, `t_team_id`, `pick_name`)
    values
    ('$group_id', '$team_id', '$user_name')
    ;") or die(mysql_error());
     
    # JSON-encode the response
    echo "inserted into sweep_user_team";
} else {
    echo "Not found";
}

?>