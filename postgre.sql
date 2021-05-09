create database nodelogin;

\c nodelogin;

create table if not exists accounts (
    id serial primary key,
    username varchar(255) not null,
    password varchar(255) not null
);