USE employee_DB;

INSERT INTO department (name)
VALUES ('Engineer'), ('Manager'), ('Legal'), ('Sales');

INSERT INTO employeerole (employeerole, department_id)
VALUES ('Lawyer', 3),
 ('Lead Engineer', 1),
 ('Manager', 2),
 ('Lead Salesman', 4),
 ('Lawyer', 3),
('Software Engineer', 1),
('Salesman', 4),
 ('Engineer', 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('abebe', 'kebede', 3,1),
('chala', 'gemechu', 2, 2),
('shewet', 'feshaye', 4,1),
('tesfaye', 'ashenafe', 4, 4),
('eyob', 'desta', 1, 1);



SELECT * FROM department;
SELECT * FROM employeerole;
SELECT * FROM employee;