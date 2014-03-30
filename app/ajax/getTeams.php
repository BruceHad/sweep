<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['id'])){
    $id = $_GET['id'];
} else {
    $id = 0;
}

$query=mysql_query("
select name,
    status,
    odds,
    competition
from sweep_teams
order by competition, name;") 
    or die(mysql_error());
 
# Collect the results
while($obj = mysql_fetch_object($query)) {
    $arr[] = $obj;
}
 
# JSON-encode the response
echo $json_response = json_encode($arr);

?>