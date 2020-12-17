create database sixteenth;


create table FACULTY
(    FACULTY_ID int IDENTITY(1,1) primary key,
     FACULTY_NAME  nvarchar(50)
);
insert into FACULTY(FACULTY_NAME )
            values  
			(N'ХТиТ'),
			(N'ЛХФ'),
			(N'ИЭФ'),
			(N'ТТЛП'),
			(N'ТОВ'),
            (N'ИТ'); 

select * from FACULTY;
drop table FACULTY;
create table  PULPIT 
(   PULPIT_ID		 int  constraint PULPIT_PK  primary key,
    PULPIT_NAME  nvarchar(100), 
    FACULTY		 int   constraint PULPIT_FACULTY_FK foreign key references FACULTY(FACULTY_ID) 
);
select * from PULPIT;
drop table PULPIT;
insert into PULPIT   (PULPIT_ID, PULPIT_NAME, FACULTY)
  values	(1,N'Информационных систем и технологий ',								6  ),
			(2,N'Полиграфического оборудования и систем обработки ин-формации ',	3  ),
			(3,N'Белорусской филологии',											3  ),
			(4,	N'Редакционно-издательских тенологий',								3  ),            
			(5,N'Полиграфических производств',										3  ),                              
			(6,N'Лесоводства',														2),          
			(7,N'Лесоустройства',													2),           
			(8,N'Лесозащиты и древесиноведения',									2),                
			(9,N'Лесных культур и почвоведения',									2), 
			(10,	N'Туризма и природопользования',								2);

create table TEACHER
(   
	TEACHER_ID    int  constraint TEACHER_PK  primary key,
	TEACHER_NAME  nvarchar(100), 
	GENDER     nvarchar(1) CHECK (GENDER in (N'м', N'ж')),
	PULPIT   int constraint TEACHER_PULPIT_FK foreign key references PULPIT(PULPIT_ID) 
);


insert into  TEACHER    (TEACHER_ID,   TEACHER_NAME, GENDER, PULPIT )
	values	(1,     N'Смелов Владимир Владиславович',		N'м', 1),
			(2,    N'Акунович Станислав Иванович',			N'м', 2),
			(3,    N'Колесников Виталий Леонидович',		N'м', 3),
			(4,    N'Бракович Андрей Игоревич',			N'м', 1);

create table SUBJECT
(    
	SUBJECT_ID  int constraint SUBJECT_PK  primary key, 
	SUBJECT_NAME nvarchar(100) unique,
	PULPIT int constraint SUBJECT_PULPIT_FK foreign key references PULPIT(PULPIT_ID)   
);

delete from SUBJECT
 insert into SUBJECT   (SUBJECT_ID,   SUBJECT_NAME, PULPIT )
	values ( 1,	N'Системы управления базами данных',						1),
			(2,		N'Базы данных',											1),
			(3,		N'Информационные технологии',							1);
