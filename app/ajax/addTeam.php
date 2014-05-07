<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['team'])) {
    $team_id = $_GET['team'];
    $user = $_GET['user'];
    $group_id = $_GET['group'];

    $query=mysql_query("
    insert into `sweep_user_team` 
    (`group_id`, `team_id`, `user`)
    values
    ('$group_id', '$team_id', '$user')
    ;") or die(mysql_error());
     
    # JSON-encode the response
    echo "inserted into sweep_user_team";
} else {
    echo "Not found";
}

?>