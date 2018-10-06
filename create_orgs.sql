CREATE ROLE kalap_base NOINHERIT PASSWORD 'password';

GRANT kalap_base TO openchs;

GRANT ALL ON ALL TABLES IN SCHEMA public TO kalap_base;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO kalap_base;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO kalap_base;

INSERT INTO organisation (name, db_user, uuid, parent_organisation_id)
  SELECT
    'Kalap Base',
    'kalap_base',
    'b6807041-9a09-423a-879f-155bf7f54da6',
    id
  FROM organisation
  WHERE name = 'OpenCHS'; -- parent

CREATE ROLE kalap NOINHERIT PASSWORD 'password';

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
  WHERE name = 'Kalap Base'; -- parent

CREATE ROLE kalap_training NOINHERIT PASSWORD 'password';

GRANT kalap_training TO openchs;

GRANT ALL ON ALL TABLES IN SCHEMA public TO kalap_training;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO kalap_training;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO kalap_training;

INSERT INTO organisation (name, db_user, uuid, parent_organisation_id)
  SELECT
    'Kalap Training',
    'kalap_training',
    '3edb243e-34ab-460b-bfbf-a31606835dd3',
    id
  FROM organisation
  WHERE name = 'Kalap Base'; -- parent
