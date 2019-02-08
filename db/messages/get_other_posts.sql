select p.title, p.img_url, p.content, u.username from posts p
join users u on p.user_id != u.id
where u.id != ${id};