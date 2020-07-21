INSERT INTO employment_user (password, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, tour_done)
  VALUES ('pbkdf2_sha256$36000$cjfgJRo9z0xd$qER+RWK7XQ9ZFEs9aGAyf4xQeVumk5ArC0Nx6oPEctY=', false, 'service-account-timed-confidential', 'timed-confidential', 'timed-confidential', 'api@example.com', true, true, '2018-05-07 08:10:13+00', false);

INSERT INTO projects_customer (name, email, website, comment, archived, reference)
  VALUES ('customer1', 'customer1@adsy.ch', '', '', false, 'customer1');

INSERT INTO projects_billingtype (name) VALUES ('Subscription'),('Workhours based'),('We throw random moniez at u');
INSERT INTO subscription_package(duration, price_currency, price, billing_type_id) VALUES ('100:00:00', 'CHF', 1000, 1),('200:00:00', 'CHF', 2000, 2),('200:00:00', 'CHF', 2000, 3);

INSERT INTO projects_project (name, comment, archived, billing_type_id, customer_id, estimated_time, customer_visible) VALUES ('Super Mario Galaxy 3', 'Giv mor!', false, 1,1,'10:00:00', true);
INSERT INTO projects_task(name, archived, project_id, estimated_time) VALUES ('Work', false, 1, '123:00:00');
INSERT INTO tracking_report(comment, date, duration, review, not_billable, added, updated, task_id, user_id)
  VALUES
    ('Creating artworks',current_date - integer '1', '10:00:00', false, false,current_date,current_date, 1,  1),
    ('Browse Reddit',current_date - integer '121', '60:00:00', false, false,current_date,current_date, 1,  1),
    ('Browse Hackernews',current_date - integer '1231', '30:00:00', false, false,current_date,current_date, 1,  1),
    ('Do actual work',current_date - integer '123', '20:00:00', false, false,current_date,current_date, 1,  1),
    ('Copipasta from SO',current_date - integer '11', '50:00:00', false, false,current_date,current_date, 1,  1),
    ('Deploy',current_date - integer '1', '00:15:00', false, false,current_date,current_date, 1,  1);

INSERT INTO subscription_order(
  duration, ordered, acknowledged, project_id)
  VALUES
    ('50:00:00',current_date - integer '165', true, 1)
    ,('50:00:00',current_date - integer '221', true, 1)
    ,('50:00:00',current_date - integer '312', true, 1)
    ,('50:00:00',current_date - integer '412', true, 1)
    ,('50:00:00',current_date - integer '523', true, 1);

INSERT INTO projects_project (name, comment, archived, billing_type_id, customer_id, estimated_time, customer_visible) VALUES ('The Elder Scrolls VI', 'Giv mor!', false, 2,1,'230:00:00', true);
INSERT INTO projects_task(name, archived, project_id, estimated_time) VALUES ('Work', false, 2, '123:00:00');
INSERT INTO tracking_report(comment, date, duration, review, not_billable, added, updated, task_id, user_id)
  VALUES
    ('Creating artworks',current_date - integer '1231', '10:00:00', false, false,current_date,current_date, 2,  1),
    ('Browse Reddit',current_date - integer '1231', '60:00:00', false, false,current_date,current_date, 2,  1),
    ('Browse Hackernews',current_date - integer '1231', '30:00:00', false, false,current_date,current_date, 2,  1),
    ('Do actual work',current_date - integer '1789', '20:00:00', false, false,current_date,current_date, 2,  1),
    ('Copipasta from SO',current_date - integer '1567', '50:00:00', false, false,current_date,current_date, 2,  1),
    ('Deploy',current_date - integer '1', '00:15:00', false, false,current_date,current_date, 2,  1);

    INSERT INTO subscription_order(
  duration, ordered, acknowledged, project_id)
  VALUES
    ('50:00:00',current_date - integer '165', true, 2)
    ,('50:00:00',current_date - integer '221', true, 2)
    ,('50:00:00',current_date - integer '312', true, 2)
    ,('50:00:00',current_date - integer '412', true, 2)
    ,('50:00:00',current_date - integer '523', true, 2);

INSERT INTO projects_project (name, comment, archived, billing_type_id, customer_id, estimated_time, customer_visible) VALUES ('Monster Hunter World', 'Giv mor!', false, 3,1,'30:00:00', true);
INSERT INTO projects_task(name, archived, project_id, estimated_time) VALUES ('Work', false, 3, '123:00:00');
INSERT INTO tracking_report(comment, date, duration, review, not_billable, added, updated, task_id, user_id)
  VALUES
    ('Creating artworks',current_date - integer '1234', '10:00:00', false, false,current_date,current_date, 3,  1),
    ('Browse Reddit',current_date - integer '2341', '60:00:00', false, false,current_date,current_date, 3,  1),
    ('Browse Hackernews',current_date - integer '124', '30:00:00', false, false,current_date,current_date, 3,  1),
    ('Do actual work',current_date - integer '1234', '30:00:00', false, false,current_date,current_date, 3,  1),
    ('Copipasta from SO',current_date - integer '31', '50:00:00', false, false,current_date,current_date, 3,  1),
    ('Deploy',current_date - integer '1', '00:15:00', false, false,current_date,current_date, 3,  1);

INSERT INTO subscription_order(
  duration, ordered, acknowledged, project_id)
  VALUES
    ('50:00:00',current_date - integer '165', true, 3)
    ,('50:00:00',current_date - integer '221', true, 3)
    ,('50:00:00',current_date - integer '312', true, 3)
    ,('50:00:00',current_date - integer '412', true, 3)
    ,('50:00:00',current_date - integer '523', true, 3);

INSERT INTO projects_project (name, comment, archived, billing_type_id, customer_id, estimated_time, customer_visible) VALUES ('Star Citizen', 'Giv mor!', false, 1,1,'5:00:00', true);
INSERT INTO projects_task(name, archived, project_id, estimated_time) VALUES ('Work', false, 4, '123:00:00');
INSERT INTO tracking_report(comment, date, duration, review, not_billable, added, updated, task_id, user_id)
  VALUES
    ('Creating artworks',current_date - integer '1231', '10:00:00', false, false,current_date,current_date, 4,  1),
    ('Browse Reddit',current_date - integer '2341', '60:00:00', false, false,current_date,current_date, 4,  1),
    ('Browse Hackernews',current_date - integer '321', '30:00:00', false, false,current_date,current_date, 4,  1),
    ('Do actual work',current_date - integer '2341', '20:00:00', false, false,current_date,current_date, 4,  1),
    ('Copipasta from SO',current_date - integer '3451', '50:00:00', false, false,current_date,current_date, 4,  1),
    ('Deploy',current_date - integer '2341', '00:15:00', false, false,current_date,current_date, 4,  1);

INSERT INTO subscription_order(
  duration, ordered, acknowledged, project_id)
  VALUES
    ('50:00:00',current_date - integer '165', true, 4)
    ,('50:00:00',current_date - integer '221', true, 4)
    ,('50:00:00',current_date - integer '312', true, 4)
    ,('50:00:00',current_date - integer '412', true, 4)
    ,('50:00:00',current_date - integer '523', true, 4);

