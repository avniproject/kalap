const regForm = require('./registrationForm.json');
const ascending = (a,b)=> a.displayOrder - b.displayOrder;
const obs = regForm.formElementGroups.sort(ascending).map(k => k.formElements.sort(ascending)).reduce((a, b) => a.concat(b), []).map(fm => {
    if (fm.type === 'MultiSelect') {
        return `multi_select_coded(i.observations->'${fm.concept.uuid}')::TEXT as "${fm.name}"`;
    } else {
        return `single_select_coded(i.observations->>'${fm.concept.uuid}')::TEXT as "${fm.name}"`;
    }
});
console.log('--generated using kalap-repo/report.js script');
console.log('--temp usage. the script to be remove');
console.log('SELECT i.first_name,\n' +
    '       i.last_name,\n' +
    '       g.name,\n' +
    '       a.title,\n');
console.log(obs.join(',\n'));
console.log('from individual i\n' +
    '       LEFT OUTER JOIN gender g ON g.id = i.gender_id\n' +
    '       LEFT OUTER JOIN address_level a ON i.address_id = a.id;');
