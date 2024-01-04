USE employees_db;
INSERT INTO department(name)
VALUES("Sales"), ("HR"), ("Customer Service"), ("Engineering");

INSERT INTO role(title, salary, department_id)
VALUES
("Sales Rep",60000.00,1),
("HR Rep",70000.00,2),
("Customer Service Rep",80000.00,3),
("Engineer",100000.00,4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("John", "Smith", 1, NULL),
("Jane", "Doe", 2, NULL),
("Bradd", "Pitt", 3, NULL),
("Anthony", "Richardson", 4, NULL);