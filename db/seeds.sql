INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");


INSERT INTO employee_role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO employee_role (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);
INSERT INTO employee_role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO employee_role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO employee_role (title, salary, department_id)
VALUE ("Accountant Manager", 160000, 3);
INSERT INTO employee_role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO employee_role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO employee_role (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);

--Sales Lead
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("John", "Doe", 1, 1);
--Salesperson
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Mike", "Chan", 2, null);
--Lead Engineer
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Ashley","Rodriguez", 3, 2);
--Software Engineer
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Kevin", "Tupik", 4, null);
--Accountant Manager
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Kunal", "Singh", 5, 3);
--Accountant
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Malia", "Brown", 6, null);
--Legal Team Lead
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Sarah", "Lourd", 7, 4);
--Lawyer
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Tom", "Allen", 8, null);