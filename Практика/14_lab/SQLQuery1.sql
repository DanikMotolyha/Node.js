create database Foutrteen_Lab;

create table FACULTY
(    FACULTY nchar(10) primary key,
     FACULTY_NAME  nvarchar(50)
);
delete from FACULTY;
drop table FACULTY;
select * from FACULTY;
insert into FACULTY(FACULTY,   FACULTY_NAME )
            values  
			(N'����', N'���������� ���������� � �������'),
			(N'���', N'����������������� ���������'),
			(N'���', N'���������-������������� ���������'),
			(N'����', N'���������� � ������� ������ ��������������'),
			(N'���', N'���������� ������������ �������'),
            (N'��', N'��������� �������������� ����������'); 


create table  PULPIT 
(   PULPIT		 nchar(20)  constraint PULPIT_PK  primary key,
    PULPIT_NAME  nvarchar(100), 
    FACULTY		 nchar(10)   constraint PULPIT_FACULTY_FK foreign key references FACULTY(FACULTY) 
);
select * from PULPIT;
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY )
  values	(N'����',	N'�������������� ������ � ���������� ',								N'��'  ),
			(N'������',	N'���������������� ������������ � ������ ��������� ��-�������� ',	N'���'  ),
			(N'��',		N'����������� ���������',											N'���'  ),
			(N'���',		N'�����������-������������ ���������',								N'���'  ),            
			(N'��',		N'��������������� �����������',										N'���'  ),                              
			(N'��',		N'�����������',														N'���'),          
			(N'��',		N'��������������',													N'���'),           
			(N'�����',	N'���������� � ����������������',									N'���'),                
			(N'����',	N'������ ������� � ������������',									N'���'), 
			(N'���',		N'������� � ������������������',										N'���'),              
			(N'������',	N'������������ �������������� � ������-��������� �����-��������',	N'���'),          
			(N'��',		N'���������� ����',													N'����'),                          
			(N'�����',	N'������ ����� � ���������� �������������',							N'����'),  
			(N'���',		N'���������� �������������������� �����������',						N'����'),   
			(N'�����',	N'���������� � ������� ������� �� ���������',						N'����'),    
			(N'��',		N'������������ �����',												N'���'), 
			(N'���',		N'���������� ����������� ���������',									N'���'),             
			(N'�������',	N'���������� �������������� ������� � ����� ���������� ���������� ',	N'����'), 
			(N'�����',	N'��������� � ��������� ���������� �����������',						N'����'),                                               
			(N'����',    N'������������� ������ � ����������',								N'���'),   
			(N'����',	N'����������� � ��������� ������������������',						N'���'),   
			(N'������',	N'����������, �������������� �����, ������� � ������',				N'���')     

create table TEACHER
(   
	TEACHER    nvarchar(10)  constraint TEACHER_PK  primary key,
	TEACHER_NAME  nvarchar(100), 
	GENDER     nvarchar(1) CHECK (GENDER in (N'�', N'�')),
	PULPIT   nchar(20) constraint TEACHER_PULPIT_FK foreign key references PULPIT(PULPIT) 
);
drop table TEACHER;
insert into  TEACHER    (TEACHER,   TEACHER_NAME, GENDER, PULPIT )
	values	(N'����',     N'������ �������� �������������',		N'�', N'����'),
			(N'�����',    N'�������� ��������� ��������',			N'�', N'����'),
			(N'�����',    N'���������� ������� ����������',		N'�', N'����'),
			(N'�����',    N'�������� ������ ��������',			N'�', N'����'),
			(N'���',      N'����� ��������� ����������',			N'�', N'����'),
			(N'���',      N'��������� ����� ��������',			N'�', N'����'),
			(N'���',      N'����� ������� ��������',				N'�', N'����'),
			(N'���',      N'����� ������� �������������',			N'�', N'����'),
			(N'���',      N'����� ����� �������������',			N'�', N'����'),
			(N'������',   N'���������� ��������� �������������',	N'�', N'������'),
			(N'���',      N'��������� ������� �����������',		N'�', N'������'),
			(N'������',   N'����������� ��������� ��������',		N'�', N'����'),
			(N'����',     N'������� ��������� ����������',		N'�', N'����'),
			(N'����',     N'������ ������ ��������',				N'�', N'��'),
			(N'����',	 N'������� ������ ����������',			N'�', N'������'),
			(N'���',      N'���������� ������� ��������',			N'�', N'������'),
			(N'���',		 N'������ ������ ���������� ',			N'�', N'��'),
			(N'�����',    N'��������� �������� ���������',		N'�', N'�����'),
			(N'������',   N'���������� �������� ����������',		N'�', N'��'),
			(N'�����',    N'�������� ������ ����������',			N'�', N'��'); 

create table SUBJECT
(    
	SUBJECT  nchar(10) constraint SUBJECT_PK  primary key, 
	SUBJECT_NAME nvarchar(100) unique,
	PULPIT  nchar(20) constraint SUBJECT_PULPIT_FK foreign key references PULPIT(PULPIT)   
);
delete from SUBJECT
 insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT )
	values ( N'����',	N'������� ���������� ������ ������',						N'����'),
			(N'��',		N'���� ������',											N'����'),
			(N'���',		N'�������������� ����������',							N'����'),
			(N'����',	N'������ �������������� � ����������������',				N'����'),
			(N'��',		N'������������� ������ � ������������ ��������',			N'����'),
			(N'���',		N'���������������� ������� ����������',					N'����'),
			(N'����',	N'������������� ������ ��������� ����������',			N'����'),
			(N'���',     N'�������������� �������������� ������',					N'����'),
			(N'��',      N'������������ ��������� ',								N'����'),
			(N'�����',   N'��������. ������, �������� � �������� �����',			N'������'),
			(N'���',     N'������������ �������������� �������',					N'����'),
			(N'���',     N'����������� ��������. ������������',					N'������'),
			(N'��',		N'���������� ����������',								N'����'),
			(N'��',		N'�������������� ����������������',						N'����'),
			(N'����',	N'���������� ������ ���',								N'����'),
			(N'���',		N'��������-��������������� ����������������',			N'����'),
			(N'��',		N'��������� ������������������',							N'����'),
			(N'��',		N'������������� ������',									N'����'),
			(N'������OO',N'�������� ������ ������ � ���� � ���. ������.',			N'��'),
			(N'��',		N'���������� �������� ',									N'��'),
			(N'��',		N'�����������',											N'�����'),
			(N'��',		N'������������ �����',									N'��'),
			(N'���',		N'���������� ��������� �������',							N'�����'),
			(N'���',		N'������ ��������� ����',								N'��'),
			(N'����',	N'���������� � ������������ �������������',				N'�����')

create table AUDITORIUM_TYPE
(
    AUDITORIUM_TYPE  nchar(10) constraint AUDITORIUM_TYPE_PK  primary key,
    AUDITORIUM_TYPENAME  nvarchar(30)
 )
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,  AUDITORIUM_TYPENAME )        values (	N'��',            N'����������');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,  AUDITORIUM_TYPENAME )         values (	N'��-�',          N'������������ �����');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME )         values (	N'��-�',          N'���������� � ���. ����������');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,  AUDITORIUM_TYPENAME )          values (N'��-X',          N'���������� �����������');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME )        values  (	N'��-��',		 N'����. ������������ �����');

create table AUDITORIUM
(   AUDITORIUM   nchar(20)  constraint AUDITORIUM_PK  primary key,
    AUDITORIUM_TYPE     nchar(10) constraint  AUDITORIUM_AUDITORIUM_TYPE_FK foreign key
                      references AUDITORIUM_TYPE(AUDITORIUM_TYPE),
   AUDITORIUM_CAPACITY  integer constraint  AUDITORIUM_CAPACITY_CHECK default 1  check (AUDITORIUM_CAPACITY between 1 and 300),  -- �����������
   AUDITORIUM_NAME      nvarchar(50)
);

insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'206-1',   N'206-1',  N'��-�', 15);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'301-1',   N'301-1', N'��-�', 15);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'236-1',   N'236-1', N'��',   60);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'313-1',   N'313-1', N'��-�',   60);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'324-1',   N'324-1', N'��-�',   50);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'413-1',   N'413-1', N'��-�', 15);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'423-1',   N'423-1', N'��-�', 90);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'408-2',   N'408-2', N'��',  90);



