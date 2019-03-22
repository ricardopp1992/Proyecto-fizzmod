-- Usuario 
create table Usuario (
id_usuario tinyint auto_increment,
nombre varchar(30) not null,
apellido varchar(30) not null,
nombre_de_usuario varchar(15) not null,
contraseña varchar(50) not null,
email varchar(50) not null,
creado_en datetime not null,
actualizado_en datetime,
id_status tinyint not null,
token varchar(50),
primary key(id_usuario),
constraint `relacion_estado_usuario`
foreign key(id_status) references status_usuario(id_status)
);

-- status_usuario
create table status_usuario (
id_status tinyint not null,
descripcion varchar(13),
primary key(id_status)
);

-- Mensaje
create table mensaje (
	id_mensaje int auto_increment,
    cuerpo varchar(200) not null,
    creado_en datetime not null,
    actualizado_en datetime,
    id_usuario tinyint not null,
    id_status tinyint not null,
    primary key(id_mensaje),
    constraint `relacion_usuario_mensaje`
    foreign key(id_usuario) references usuario(id_usuario),
    constraint `relacion_status_mensaje_mensaje`
    foreign key(id_status) references status_mensaje(id_status)
);

create table status_mensaje(
id_status tinyint not null,
descripcion varchar(10),
primary key(id_status)
);
