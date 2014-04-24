<?php


require_once 'db.php'; // The mysql database connection script

if(isset($_GET['comp'])){
    $comp = $_GET['comp'];
    $query=mysql_query("
        select group_id, group_name, comp_id
        from sweep_groups
        where comp_id = '$comp'
        ;") or die(mysql_error());

}
elseif(isset($_GET['group'])){
	$group = $_GET['group'];
	$query=mysql_query("
		select group_id, group_name, comp_id
		from sweep_groups
		where group_id = '$group'
		;") or die(mysql_error());

}
# Collect the results
while($obj = mysql_fetch_object($query)) { $arr[] = $obj;}
# JSON-encode the response
echo $json_response = json_encode($arr);

?>