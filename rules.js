const moment = require("moment");
const _ = require("lodash");
import {
    RuleFactory,
    FormElementsStatusHelper,
    FormElementStatusBuilder,
    StatusBuilderAnnotationFactory,
    FormElementStatus,
    VisitScheduleBuilder
} from 'rules-config/rules';

const RegistrationViewFilter = RuleFactory("cc10c94c-c1b6-4957-8738-da4a3bc2ea09", "ViewFilter");

const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

@RegistrationViewFilter("f24d531d-355c-403d-8325-7d2ea0661496", "Kalap Registration View Filter", 100.0, {})
class RegistrationHandlerKalap {
    static exec(individual, formElementGroup) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new RegistrationHandlerKalap(), individual, formElementGroup);
    }

    _getStatusBuilder(individual, formElement) {
        return new FormElementStatusBuilder({individual, formElement});
    }

    @WithStatusBuilder
    maritalStatus([], statusBuilder){
        statusBuilder.skipAnswers('Divorced', 'Unmarried', 'Remarried', 'Other');
    }

    @WithStatusBuilder
    casteCategory([], statusBuilder){
        statusBuilder.skipAnswers('ST');
    }

    @WithStatusBuilder
    economicStatus([], statusBuilder){
        statusBuilder.skipAnswers('No');
    }

    typeOfFacilityVisitedByFamilyMembersInLast12Months(individual, formElement) {
        const statusBuilder = this._getStatusBuilder(individual, formElement);
        statusBuilder.show().when.valueInRegistration("Family member visited healthcare facility in last 12 months").containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    healthcareExperienceAtOutpatientFacility(individual, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({individual:individual, formElement:fe});
        statusBuilder.show().when.valueInRegistration("Type of facility visited by family members in last 12 months").containsAnyAnswerConceptName("Outpatient", "Both");
        return statusBuilder.build();
        })
    }

    healthcareExperienceAtInpatientFacility(individual, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({individual:individual, formElement:fe});
        statusBuilder.show().when.valueInRegistration("Type of facility visited by family members in last 12 months").containsAnyAnswerConceptName("Inpatient", "Both");
        return statusBuilder.build();
        })
    }


}

module.exports = {RegistrationHandlerKalap}

