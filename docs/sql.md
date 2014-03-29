create table if not exists `sweep_users`(
    `user_id` int(11) not null auto_increment,
    `username` varchar(50) not null,
    `nickname`  varchar(50) not null,
    `av_url` varchar(100),
    primary key (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 
;