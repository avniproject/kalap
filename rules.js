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

const WithStatusBuilder = StatusBuilderAnnotationFactory('individual', 'formElement');

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

    @WithStatusBuilder
    typeOfFacilityVisitedByFamilyMembersInLast12Months([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Family member visited healthcare facility in last 12 months").is.yes;
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
        })
    }

    facilityFromWhereChildRecievedImmunization(individual,formElement){
        const  statusBuilder = this._getStatusBuilder(individual, formElement);
        statusBuilder.show().when.valueInRegistration("Whether immunization received by child").is.yes;
        return statusBuilder.build();
    }

    doTheyVisitDoctorForARegularHealthCheckUp(individual, formElement) {
        let statusBuilder = new FormElementStatusBuilder({individual:individual, formElement:formElement});
        let observation = individual.findObservation("Number of people above age 60 dependent on family");
        let value = observation && observation.getValue();
        statusBuilder.show().whenItem(value).greaterThan(0);
        return statusBuilder.build();
    }


    @WithStatusBuilder
    numberOfHealthCheckupVisitsAnnuallyByElderly([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether elderly family members visit doctor for regular health checkup").is.yes;
    }

    @WithStatusBuilder
    facilityVisitedByElderly([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether elderly family members visit doctor for regular health checkup").is.yes;
    }

    @WithStatusBuilder
    reasonForNotDoingRegularHealthCheckUpsByElderly([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether elderly family members visit doctor for regular health checkup").is.no;
    }

    @WithStatusBuilder
    howManyCases([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether family with history of TB").is.yes;
    }

    @WithStatusBuilder
    whereWereTheCasesDiagnosed([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether family with history of TB").is.yes;
    }

    @WithStatusBuilder
    howManyPatientsInFamilyDidNotCompleteTbTreatment([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether family with history of TB").is.yes;
    }

    @WithStatusBuilder
    reasonForAnyoneNotCompletingTbTreatment([], statusBuilder) {
        console.log("came to reasonForAnyoneNotCompletingTbTreatment");
        let obs = statusBuilder.context.individual.findObservation("Number of TB patients in family who did not complete treatment");
        let value = obs && obs.getValue();
        statusBuilder.show().whenItem(value).is.greaterThan(0);
    }

    @WithStatusBuilder
    tbTreatmentCentre([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether family with history of TB").is.yes;
    }

    @WithStatusBuilder
    expenditureOnMedicalServicesDuringTbTreatmentOfFamilyMembers([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether family with history of TB").is.yes;
    }

    @WithStatusBuilder
    expenditureOnTravelFoodAndStayDuringTbTreatmentOfFamilyMembers([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether family with history of TB").is.yes;
    }

    @WithStatusBuilder
    lossOfWagesDuringTbTreatmentOfFamilyMembers([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether family with history of TB").is.yes;
    }

    @WithStatusBuilder
    numberOfPeopleWhoHaveDiedOfTbInTheFamily([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether family with history of TB").is.yes;
    }

    ifYesHaveTheyUndergoneTreatmentForTheseConditions(individual,formElement){
        const  statusBuilder = this._getStatusBuilder(individual, formElement);
        statusBuilder.show().when.valueInRegistration("Other health conditions in past 1 year in family").containsAnyAnswerConceptName("Respiratory disorders","Oral health disorders","Mental health issues","Sexual health disorders","Animal attack, snake bite, insect bite");
        return statusBuilder.build();
    }

    @WithStatusBuilder
    reasonForDeathEventInTheFamilyInLast1Year([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether death event in the family in last 1 year").is.yes;
    }

    @WithStatusBuilder
    reasonForMobilityIssuesInFamily([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether anyone in family has mobility issues").is.yes;
    }
     @WithStatusBuilder
     isToiletSharedWithAnotherFamily([], statusBuilder) {
            statusBuilder.show().when.valueInRegistration("Whether toilet at home").is.yes;
    }

    @WithStatusBuilder
    toiletVerifedByTheInterviewer([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether toilet at home").is.yes;
    }

    @WithStatusBuilder
    frequencyOfCleaningLivestockPen([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether family owns livestock").is.yes;
    }

    @WithStatusBuilder
    whetherFamilyMembersWashHandsWithSoapAfterCleaningTheLivestockPen([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether family owns livestock").is.yes;
    }

    @WithStatusBuilder
    sourceOfRecievingHealthRelatedAwarenessInformationInLast1Year([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether any health related awareness/information received in last 1 year").is.yes;
    }



}

module.exports = {RegistrationHandlerKalap}

