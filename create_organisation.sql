select create_db_user('kalap', 'password');

INSERT INTO organisation (name, db_user, uuid, parent_organisation_id)
SELECT 'Kalap', 'kalap', 'ac3e7bd0-5905-4b9f-a039-5f675e76eb21', id
FROM organisation
WHERE name = 'OpenCHS' and not exists (select 1 from organisation where name = 'Kalap');
