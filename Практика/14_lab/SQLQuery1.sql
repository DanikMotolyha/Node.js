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
			(N'ХТиТ', N'Химическая технология и техника'),
			(N'ЛХФ', N'Лесохозяйственный факультет'),
			(N'ИЭФ', N'Инженерно-экономический факультет'),
			(N'ТТЛП', N'Технология и техника лесной промышленности'),
			(N'ТОВ', N'Технология органических веществ'),
            (N'ИТ', N'Факультет информационных технологий'); 


create table  PULPIT 
(   PULPIT		 nchar(20)  constraint PULPIT_PK  primary key,
    PULPIT_NAME  nvarchar(100), 
    FACULTY		 nchar(10)   constraint PULPIT_FACULTY_FK foreign key references FACULTY(FACULTY) 
);
select * from PULPIT;
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY )
  values	(N'ИСиТ',	N'Информационных систем и технологий ',								N'ИТ'  ),
			(N'ПОиСОИ',	N'Полиграфического оборудования и систем обработки ин-формации ',	N'ИЭФ'  ),
			(N'БФ',		N'Белорусской филологии',											N'ИЭФ'  ),
			(N'РИТ',		N'Редакционно-издательских тенологий',								N'ИЭФ'  ),            
			(N'ПП',		N'Полиграфических производств',										N'ИЭФ'  ),                              
			(N'ЛВ',		N'Лесоводства',														N'ЛХФ'),          
			(N'ЛУ',		N'Лесоустройства',													N'ЛХФ'),           
			(N'ЛЗиДВ',	N'Лесозащиты и древесиноведения',									N'ЛХФ'),                
			(N'ЛКиП',	N'Лесных культур и почвоведения',									N'ЛХФ'), 
			(N'ТиП',		N'Туризма и природопользования',										N'ЛХФ'),              
			(N'ЛПиСПС',	N'Ландшафтного проектирования и садово-паркового строи-тельства',	N'ЛХФ'),          
			(N'ТЛ',		N'Транспорта леса',													N'ТТЛП'),                          
			(N'ЛМиЛЗ',	N'Лесных машин и технологии лесозаготовок',							N'ТТЛП'),  
			(N'ТДП',		N'Технологий деревообрабатывающих производств',						N'ТТЛП'),   
			(N'ТиДИД',	N'Технологии и дизайна изделий из древесины',						N'ТТЛП'),    
			(N'ОХ',		N'Органической химии',												N'ТОВ'), 
			(N'ХПД',		N'Химической переработки древесины',									N'ТОВ'),             
			(N'ТНВиОХТ',	N'Технологии неорганических веществ и общей химической технологии ',	N'ХТиТ'), 
			(N'ПиАХП',	N'Процессов и аппаратов химических производств',						N'ХТиТ'),                                               
			(N'ЭТиМ',    N'Экономической теории и маркетинга',								N'ИЭФ'),   
			(N'МиЭП',	N'Менеджмента и экономики природопользования',						N'ИЭФ'),   
			(N'СБУАиА',	N'Статистики, бухгалтерского учета, анализа и аудита',				N'ИЭФ')     

create table TEACHER
(   
	TEACHER    nvarchar(10)  constraint TEACHER_PK  primary key,
	TEACHER_NAME  nvarchar(100), 
	GENDER     nvarchar(1) CHECK (GENDER in (N'м', N'ж')),
	PULPIT   nchar(20) constraint TEACHER_PULPIT_FK foreign key references PULPIT(PULPIT) 
);
drop table TEACHER;
insert into  TEACHER    (TEACHER,   TEACHER_NAME, GENDER, PULPIT )
	values	(N'СМЛВ',     N'Смелов Владимир Владиславович',		N'м', N'ИСиТ'),
			(N'АКНВЧ',    N'Акунович Станислав Иванович',			N'м', N'ИСиТ'),
			(N'КЛСНВ',    N'Колесников Виталий Леонидович',		N'м', N'ИСиТ'),
			(N'БРКВЧ',    N'Бракович Андрей Игоревич',			N'м', N'ИСиТ'),
			(N'ДТК',      N'Дятко Александр Аркадьевич',			N'м', N'ИСиТ'),
			(N'УРБ',      N'Урбанович Павел Павлович',			N'м', N'ИСиТ'),
			(N'ГРН',      N'Гурин Николай Иванович',				N'м', N'ИСиТ'),
			(N'ЖЛК',      N'Жиляк Надежда Александровна',			N'ж', N'ИСиТ'),
			(N'МРЗ',      N'Мороз Елена Станиславовна',			N'ж', N'ИСиТ'),
			(N'БРТШВЧ',   N'Барташевич Святослав Александрович',	N'м', N'ПОиСОИ'),
			(N'АРС',      N'Арсентьев Виталий Арсентьевич',		N'м', N'ПОиСОИ'),
			(N'БРНВСК',   N'Барановский Станислав Иванович',		N'м', N'ЭТиМ'),
			(N'НВРВ',     N'Неверов Александр Васильевич',		N'м', N'МиЭП'),
			(N'РВКЧ',     N'Ровкач Андрей Иванович',				N'м', N'ЛВ'),
			(N'ДМДК',	 N'Демидко Марина Николаевна',			N'ж', N'ЛПиСПС'),
			(N'БРГ',      N'Бурганская Татьяна Минаевна',			N'ж', N'ЛПиСПС'),
			(N'РЖК',		 N'Рожков Леонид Николаевич ',			N'м', N'ЛВ'),
			(N'ЗВГЦВ',    N'Звягинцев Вячеслав Борисович',		N'м', N'ЛЗиДВ'),
			(N'БЗБРДВ',   N'Безбородов Владимир Степанович',		N'м', N'ОХ'),
			(N'НСКВЦ',    N'Насковец Михаил Трофимович',			N'м', N'ТЛ'); 

create table SUBJECT
(    
	SUBJECT  nchar(10) constraint SUBJECT_PK  primary key, 
	SUBJECT_NAME nvarchar(100) unique,
	PULPIT  nchar(20) constraint SUBJECT_PULPIT_FK foreign key references PULPIT(PULPIT)   
);
delete from SUBJECT
 insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT )
	values ( N'СУБД',	N'Системы управления базами данных',						N'ИСиТ'),
			(N'БД',		N'Базы данных',											N'ИСиТ'),
			(N'ИНФ',		N'Информационные технологии',							N'ИСиТ'),
			(N'ОАиП',	N'Основы алгоритмизации и программирования',				N'ИСиТ'),
			(N'ПЗ',		N'Представление знаний в компьютерных системах',			N'ИСиТ'),
			(N'ПСП',		N'Программирование сетевых приложений',					N'ИСиТ'),
			(N'МСОИ',	N'Моделирование систем обработки информации',			N'ИСиТ'),
			(N'ПИС',     N'Проектирование информационных систем',					N'ИСиТ'),
			(N'КГ',      N'Компьютерная геометрия ',								N'ИСиТ'),
			(N'ПМАПЛ',   N'Полиграф. машины, автоматы и поточные линии',			N'ПОиСОИ'),
			(N'КМС',     N'Компьютерные мультимедийные системы',					N'ИСиТ'),
			(N'ОПП',     N'Организация полиграф. производства',					N'ПОиСОИ'),
			(N'ДМ',		N'Дискретная математика',								N'ИСиТ'),
			(N'МП',		N'Математическое программирование',						N'ИСиТ'),
			(N'ЛЭВМ',	N'Логические основы ЭВМ',								N'ИСиТ'),
			(N'ООП',		N'Объектно-ориентированное программирование',			N'ИСиТ'),
			(N'ЭП',		N'Экономика природопользования',							N'МиЭП'),
			(N'ЭТ',		N'Экономическая теория',									N'ЭТиМ'),
			(N'БЛЗиПсOO',N'Биология лесных зверей и птиц с осн. охотов.',			N'ЛВ'),
			(N'ИГ',		N'Инженерная геодезия ',									N'ЛВ'),
			(N'ЛВ',		N'Лесоводство',											N'ЛЗиДВ'),
			(N'ОХ',		N'Органическая химия',									N'ОХ'),
			(N'ТРИ',		N'Технология резиновых изделий',							N'ЛЗиДВ'),
			(N'ВТЛ',		N'Водный транспорт леса',								N'ТЛ'),
			(N'ТиОЛ',	N'Технология и оборудование лесозаготовок',				N'ЛЗиДВ')

create table AUDITORIUM_TYPE
(
    AUDITORIUM_TYPE  nchar(10) constraint AUDITORIUM_TYPE_PK  primary key,
    AUDITORIUM_TYPENAME  nvarchar(30)
 )
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,  AUDITORIUM_TYPENAME )        values (	N'ЛК',            N'Лекционная');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,  AUDITORIUM_TYPENAME )         values (	N'ЛБ-К',          N'Компьютерный класс');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME )         values (	N'ЛК-К',          N'Лекционная с уст. проектором');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,  AUDITORIUM_TYPENAME )          values (N'ЛБ-X',          N'Химическая лаборатория');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME )        values  (	N'ЛБ-СК',		 N'Спец. компьютерный класс');

create table AUDITORIUM
(   AUDITORIUM   nchar(20)  constraint AUDITORIUM_PK  primary key,
    AUDITORIUM_TYPE     nchar(10) constraint  AUDITORIUM_AUDITORIUM_TYPE_FK foreign key
                      references AUDITORIUM_TYPE(AUDITORIUM_TYPE),
   AUDITORIUM_CAPACITY  integer constraint  AUDITORIUM_CAPACITY_CHECK default 1  check (AUDITORIUM_CAPACITY between 1 and 300),  -- вместимость
   AUDITORIUM_NAME      nvarchar(50)
);

insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'206-1',   N'206-1',  N'ЛБ-К', 15);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'301-1',   N'301-1', N'ЛБ-К', 15);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'236-1',   N'236-1', N'ЛК',   60);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'313-1',   N'313-1', N'ЛК-К',   60);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'324-1',   N'324-1', N'ЛК-К',   50);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'413-1',   N'413-1', N'ЛБ-К', 15);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'423-1',   N'423-1', N'ЛБ-К', 90);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  (N'408-2',   N'408-2', N'ЛК',  90);



