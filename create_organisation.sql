CREATE ROLE kalap
  NOINHERIT
  PASSWORD 'password';

ALTER ROLE kalap WITH LOGIN;
GRANT kalap TO openchs;

GRANT ALL ON ALL TABLES IN SCHEMA public TO kalap;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO kalap;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO kalap;

INSERT INTO organisation (name, db_user, uuid, parent_organisation_id)
  SELECT
    'Kalap',
    'kalap',
    'ac3e7bd0-5905-4b9f-a039-5f675e76eb21',
    id
  FROM organisation
  WHERE name = 'OpenCHS';
