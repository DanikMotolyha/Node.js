create database sixteenth;


create table FACULTY
(    FACULTY_ID int IDENTITY(1,1) primary key,
     FACULTY_NAME  nvarchar(50)
);
insert into FACULTY(FACULTY_NAME )
            values  
			(N'����'),
			(N'���'),
			(N'���'),
			(N'����'),
			(N'���'),
            (N'��'); 

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
  values	(1,N'�������������� ������ � ���������� ',								6  ),
			(2,N'���������������� ������������ � ������ ��������� ��-�������� ',	3  ),
			(3,N'����������� ���������',											3  ),
			(4,	N'�����������-������������ ���������',								3  ),            
			(5,N'��������������� �����������',										3  ),                              
			(6,N'�����������',														2),          
			(7,N'��������������',													2),           
			(8,N'���������� � ����������������',									2),                
			(9,N'������ ������� � ������������',									2), 
			(10,	N'������� � ������������������',								2);

create table TEACHER
(   
	TEACHER_ID    int  constraint TEACHER_PK  primary key,
	TEACHER_NAME  nvarchar(100), 
	GENDER     nvarchar(1) CHECK (GENDER in (N'�', N'�')),
	PULPIT   int constraint TEACHER_PULPIT_FK foreign key references PULPIT(PULPIT_ID) 
);


insert into  TEACHER    (TEACHER_ID,   TEACHER_NAME, GENDER, PULPIT )
	values	(1,     N'������ �������� �������������',		N'�', 1),
			(2,    N'�������� ��������� ��������',			N'�', 2),
			(3,    N'���������� ������� ����������',		N'�', 3),
			(4,    N'�������� ������ ��������',			N'�', 1);

create table SUBJECT
(    
	SUBJECT_ID  int constraint SUBJECT_PK  primary key, 
	SUBJECT_NAME nvarchar(100) unique,
	PULPIT int constraint SUBJECT_PULPIT_FK foreign key references PULPIT(PULPIT_ID)   
);

delete from SUBJECT
 insert into SUBJECT   (SUBJECT_ID,   SUBJECT_NAME, PULPIT )
	values ( 1,	N'������� ���������� ������ ������',						1),
			(2,		N'���� ������',											1),
			(3,		N'�������������� ����������',							1);
