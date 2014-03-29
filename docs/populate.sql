insert into `sweep_groups` 
    (`group_id`, `group_name`, `competition`)
values
    (1, 'A. B. E.', 'World Cup 2014')
; 

insert into `sweep_users` 
    (`username`, `nickname`, `group_id`)
values 
    ('Bruce H', 'Bonus', 1)
;