const rulesConfigInfra = require('rules-config/infra');
const IDI = require('openchs-idi');
const secrets = require('../secrets.json');

module.exports = IDI.configure({
    "name": "kalap",
    "chs-admin": "admin",
    "org-name": "Kalap",
    "org-admin": "kalap-admin",
    "secrets": secrets,
    "files": {
        "adminUsers": {
            "dev": ["./users/admin-user.json"],
        },
        "forms": [
            "./registration/registrationForm.json",
        ],
        "formMappings": ["./common/formMappings.json"],
        "formDeletions": [],
        "formAdditions": [],
        "catchments": ["./common/catchments.json"],
        "checklistDetails": [],
        "concepts": ["./registration/registrationConcepts.json"],
        "addressLevelTypes": [],
        "locations": ["./common/locations.json"],
        "programs": [],
        "encounterTypes": [],
        "operationalEncounterTypes": [],
        "operationalPrograms": [],
        "operationalSubjectTypes": ["./operationalModules/operationalSubjectTypes.json"],
        "users": {
            "dev": ["./users/dev-users.json"],
        },
        "videos": [],
        "rules": ["./common/rules.js"],
        "organisationSql": []
    }
}, rulesConfigInfra);
