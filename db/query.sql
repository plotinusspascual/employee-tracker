SELECT *
FROM employee
JOIN employee_role ON employee.id= employee_role.id;

SELECT *
FROM employee_role
JOIN department ON employee_role.department = department.id;