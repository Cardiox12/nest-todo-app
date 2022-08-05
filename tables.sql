CREATE TYPE TaskStatus AS ENUM('todo', 'done');

CREATE TABLE Users(
    user_id     BIGSERIAL   PRIMARY KEY NOT NULL,
    username    VARCHAR(20) NOT NULL,
    password    VARCHAR(20) NOT NULL
);

CREATE TABLE Tasks(
    task_id         BIGSERIAL       PRIMARY KEY NOT NULL,
    content         VARCHAR(100)    NOT NULL,
    status          TaskStatus      NOT NULL,
    creation_date   Date            NOT NULL,
    update_date     Date            NOT NULL,
    user_id         BIGINT          REFERENCES Users(user_id)
);

INSERT INTO Users(username, password) VALUES('mielpops', '1234');
INSERT INTO Users(username, password) VALUES('toto', '1234');

INSERT INTO Tasks(content, status, creation_date, update_date, user_id) VALUES(
    'faire la cuisine',
    'todo',
    DATE '2022-08-02',
    DATE '2022-08-02',
    1
);

INSERT INTO Tasks(content, status, creation_date, update_date, user_id) VALUES(
    'faire la vaisselle',
    'todo',
    DATE '2022-08-02',
    DATE '2022-08-02',
    1
);

INSERT INTO Tasks(content, status, creation_date, update_date, user_id) VALUES(
    'faire les courses',
    'todo',
    DATE '2022-08-02',
    DATE '2022-08-02',
    2
);