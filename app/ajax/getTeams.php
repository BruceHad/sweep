<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['comp'])){
    $comp = $_GET['comp'];
    $group = $_GET['group'];
    $query=mysql_query("
        select 
            st.team_id,
            st.name,
            st.status,
            st.comp_id,
            sut.user_id,
            sut.group_id,
            su.username,
            su.email,
            su.av_url
        from sweep_teams st
            left outer join sweep_user_team sut
            on (st.team_id = sut.team_id)
            left outer join sweep_users su
            on (su.user_id = sut.user_id)
        where st.comp_id = '$comp'
        and (sut.group_id = '$group' or sut.group_id is null)
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