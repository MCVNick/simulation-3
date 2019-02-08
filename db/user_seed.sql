create table users(
    id serial primary key,
    username varchar(20) not null unique,
    password varchar(255) not null
);

ALTER TABLE users
ADD COLUMN profile_pic varchar(250);

select * from users;