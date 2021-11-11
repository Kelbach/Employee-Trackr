INSERT INTO departments (dept_name)
VALUES
    ('Dept A'),
    ('Dept B'),
    ('Dept Sol'),
    ('Dept Ky');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Manager', 20, 1),
    ('Shift Manager', 15, 2),
    ('Engineer', 10, 3),
    ('Guy', 5, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Justice', 'Peace', 1, NULL),
    ('Kevin', 'Kelbach', 2, 1),
    ('Sol', 'Badguy', 3, 2),
    ('Ky', 'Kiske', 4, 2);