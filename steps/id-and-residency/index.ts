import ProcessStepDefinition from "../../helpers/ProcessStepDefinition";
import ResidentDatabaseSchema from "../../storage/ResidentDatabaseSchema";
import carer from "./carer";
import nextOfKin from "./next-of-kin";
import otherSupport from "./other-support";
import presentForCheck from "./present-for-check";

export const idAndResidencyProcessSteps = [presentForCheck];

export type IdAndResidencyResidentStoreNames =
  | "nextOfKin"
  | "carer"
  | "otherSupport";

export const idAndResidencyResidentSteps = [
  nextOfKin as ProcessStepDefinition<
    ResidentDatabaseSchema,
    IdAndResidencyResidentStoreNames
  >,
  carer as ProcessStepDefinition<
    ResidentDatabaseSchema,
    IdAndResidencyResidentStoreNames
  >,
  otherSupport as ProcessStepDefinition<
    ResidentDatabaseSchema,
    IdAndResidencyResidentStoreNames
  >,
];

const steps = [...idAndResidencyProcessSteps, ...idAndResidencyResidentSteps];

export default steps;
