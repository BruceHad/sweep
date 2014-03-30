<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['id'])){
    $id = $_GET['id'];
} else {
    $id = 0;
}

$query=mysql_query("
select nickname, av_url, group_name, competition
from sweep_users 
inner join sweep_groups
on (sweep_users.group_id = sweep_groups.group_id)
;") 
    or die(mysql_error());
 
# Collect the results
while($obj = mysql_fetch_object($query)) {
    $arr[] = $obj;
}
 
# JSON-encode the response
echo $json_response = json_encode($arr);

?>