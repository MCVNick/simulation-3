create table posts(
    id serial primary key,
    title varchar(50) not null,
    img_url varchar(250),
    content varchar(500),
    user_id int references users(id)
);
select * from posts;