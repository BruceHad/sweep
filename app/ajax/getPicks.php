<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['comp'])){
    $comp = $_GET['comp'];
    $group_id = $_GET['group'];
    $user_id = $_GET['user'];
    $query=mysql_query("
    select 
        st.team_id,
        st.name,
        st.status,
        st.comp_id,
        sut.user_id,
        sut.group_id
    from sweep_teams st
        inner join sweep_user_team sut
        on (st.team_id = sut.team_id)
    where st.comp_id = '$comp'
        and sut.user_id = '$user_id'
        and sut.group_id = '$group_id'
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