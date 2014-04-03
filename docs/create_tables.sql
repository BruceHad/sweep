create table if not exists `sweep_groups`(
    `group_id` varchar(10) not null,
    `group_name` varchar(50) not null,
    `comp_id`  varchar(10) not null,
    primary key (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
;

create table if not exists `sweep_users`(
    `user_id` int(11) not null auto_increment,
    `username` varchar(50) not null,
    `nickname`  varchar(50) not null,
    `av_url` varchar(100),
    `group_id` int(11) not null,
    primary key (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 
;

create table if not exists `sweep_user_team`(
    `swt_id` int(11) not null auto_increment,
    `team_id` varchar(50) not null,
    `user_id`  varchar(50) not null,
    primary key (`swt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 
;


create table if not exists `sweep_teams`(
    `team_id` int(11) not null auto_increment,
    `name` varchar(50) not null,
    `status`  varchar(50) not null,
    `odds` decimal(3, 2),
    `competition` varchar(50) not null,
    primary key (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 
;

create table if not exists `sweep_competitions`(
    `comp_id` varchar(10) not null,
    `name` varchar(50) not null,
    primary key (`comp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 
;