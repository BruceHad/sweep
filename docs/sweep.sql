-- Groups
select 
    group_id,
    group_name,
    competition
from sweep_groups
;

-- User Groups
select nickname, av_url, group_name, competition
from sweep_users 
inner join sweep_groups
on (sweep_users.group_id = sweep_groups.group_id)
;

--nickname, av_url, group_name, competion