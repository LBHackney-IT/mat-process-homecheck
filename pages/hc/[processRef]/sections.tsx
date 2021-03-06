import { Paragraph } from "lbh-frontend-react/components";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { StoreValue } from "remultiform/database";
import { TaskList, TaskListStatus } from "../../../components/TaskList";
import { TenancySummary } from "../../../components/TenancySummary";
import getProcessRef from "../../../helpers/getProcessRef";
import useDataValue from "../../../helpers/useDataValue";
import useValidateData from "../../../helpers/useValidateData";
import MainLayout from "../../../layouts/MainLayout";
import PageSlugs, { urlObjectForSlug } from "../../../steps/PageSlugs";
import PageTitles from "../../../steps/PageTitles";
import ProcessDatabaseSchema, {
  ProcessRef,
} from "../../../storage/ProcessDatabaseSchema";
import Storage from "../../../storage/Storage";

interface Status {
  loading: boolean;
  status: TaskListStatus | undefined;
  errors: Error[] | undefined;
}

const useIdAndResidencyStatus = (
  processRef: ProcessRef | undefined
): Status => {
  const started = useValidateData(
    Storage.ProcessContext,
    ["tenantsPresent"],
    processRef,
    (valueSets) => {
      const tenantsPresentSet = valueSets.tenantsPresent;

      if (tenantsPresentSet === undefined || processRef === undefined) {
        return false;
      }

      const tenantsPresent = tenantsPresentSet[processRef];
      const completedFirstStep = tenantsPresent !== undefined;

      return completedFirstStep;
    }
  );

  const tenantsPresent = useDataValue(
    Storage.ProcessContext,
    "tenantsPresent",
    processRef,
    (values) => (processRef !== undefined ? values[processRef] : undefined)
  );

  const isCompleted = useValidateData(
    Storage.ProcessContext,
    ["tenantsPresent"],
    processRef,
    (valueSets) => {
      const tenantsPresentSet = valueSets.tenantsPresent;

      if (tenantsPresentSet === undefined || processRef === undefined) {
        return false;
      }

      const tenantsPresent = tenantsPresentSet[processRef];
      const completedFirstStep =
        tenantsPresent !== undefined && !!tenantsPresent.length;

      return completedFirstStep;
    }
  );

  const loading =
    tenantsPresent.loading || started.loading || isCompleted.loading;

  const errors = [];

  if (tenantsPresent.error) {
    errors.push(tenantsPresent.error);
  }

  if (started.error) {
    errors.push(started.error);
  }

  if (isCompleted.error) {
    errors.push(isCompleted.error);
  }

  // Note that we don't check the last step like we do for other sections, as
  // no step after residency creates an empty object when submitting without
  // answering any questions.
  return {
    loading,
    status: loading
      ? undefined
      : started.result
      ? isCompleted.result
        ? TaskListStatus.Completed
        : TaskListStatus.Started
      : TaskListStatus.NotStarted,
    errors: errors.length > 0 ? errors : undefined,
  };
};

const useHouseholdStatus = (processRef: ProcessRef | undefined): Status => {
  const started = useValidateData(
    Storage.ProcessContext,
    ["household"],
    processRef,
    (valueSets) => {
      const householdSet = valueSets.household;

      if (householdSet === undefined || processRef === undefined) {
        return false;
      }

      const household = householdSet[processRef];
      const completedFirstStep = household?.documents !== undefined;

      return completedFirstStep;
    }
  );

  const completed = useValidateData(
    Storage.ProcessContext,
    ["household"],
    processRef,
    (valueSets) => {
      const householdSet = valueSets.household;

      if (householdSet === undefined || processRef === undefined) {
        return false;
      }

      const household = householdSet[processRef];
      const completedLastStep = household?.otherProperty !== undefined;

      return completedLastStep;
    }
  );

  const loading = started.loading || completed.loading;

  const errors = [];

  if (started.error) {
    errors.push(started.error);
  }

  if (completed.error) {
    errors.push(completed.error);
  }

  return {
    loading,
    status: loading
      ? undefined
      : started.result
      ? completed.result
        ? TaskListStatus.Completed
        : TaskListStatus.Started
      : TaskListStatus.NotStarted,
    errors: errors.length > 0 ? errors : undefined,
  };
};

const usePropertyInspectionStatus = (
  processRef: ProcessRef | undefined
): Status => {
  const started = useValidateData(
    Storage.ProcessContext,
    ["property"],
    processRef,
    (valueSets) => {
      const propertySet = valueSets.property;

      if (propertySet === undefined || processRef === undefined) {
        return false;
      }

      const property = propertySet[processRef];
      const completedFirstStep = property?.rooms !== undefined;

      return completedFirstStep;
    }
  );

  const completed = useValidateData(
    Storage.ProcessContext,
    ["property"],
    processRef,
    (valueSets) => {
      const propertySet = valueSets.property;

      if (propertySet === undefined || processRef === undefined) {
        return false;
      }

      const property = propertySet[processRef];
      const completedLastStep = property?.otherComments !== undefined;

      return completedLastStep !== undefined;
    }
  );

  const loading = started.loading || completed.loading;

  const errors = [];

  if (started.error) {
    errors.push(started.error);
  }

  if (completed.error) {
    errors.push(completed.error);
  }

  return {
    loading,
    status: loading
      ? undefined
      : started.result
      ? completed.result
        ? TaskListStatus.Completed
        : TaskListStatus.Started
      : TaskListStatus.NotStarted,
    errors: errors.length > 0 ? errors : undefined,
  };
};

const useWellbeingSupportStatus = (
  processRef: ProcessRef | undefined
): Status => {
  const started = useValidateData(
    Storage.ProcessContext,
    ["healthConcerns"],
    processRef,
    (valueSets) => {
      const healthConcernsSet = valueSets.healthConcerns;

      if (healthConcernsSet === undefined || processRef === undefined) {
        return false;
      }

      const healthConcerns = healthConcernsSet[processRef];
      const completedFirstStep = healthConcerns !== undefined;

      return completedFirstStep;
    }
  );

  const completed = useValidateData(
    Storage.ProcessContext,
    ["healthConcerns", "supportNeeds"],
    processRef,
    (valueSets) => {
      const healthConcernsSet = valueSets.healthConcerns;
      const supportNeedsSet = valueSets.supportNeeds;

      if (
        healthConcernsSet === undefined ||
        supportNeedsSet === undefined ||
        processRef === undefined
      ) {
        return false;
      }

      const healthConcerns = healthConcernsSet[processRef] as
        | StoreValue<ProcessDatabaseSchema["schema"], "healthConcerns">
        | undefined;
      const supportNeeds = supportNeedsSet[processRef];
      const completedLastStep =
        healthConcerns?.value === "no" || supportNeeds !== undefined;

      return completedLastStep;
    }
  );

  const loading = started.loading || completed.loading;

  const errors = [];

  if (started.error) {
    errors.push(started.error);
  }

  if (completed.error) {
    errors.push(completed.error);
  }

  return {
    loading: started.loading || completed.loading,
    status: loading
      ? undefined
      : started.result
      ? completed.result
        ? TaskListStatus.Completed
        : TaskListStatus.Started
      : TaskListStatus.NotStarted,
    errors: errors.length > 0 ? errors : undefined,
  };
};

export const SectionsPage: NextPage = () => {
  const router = useRouter();

  const processRef = getProcessRef(router);

  const tenancyData = useDataValue(
    Storage.ExternalContext,
    "tenancy",
    processRef,
    (values) => (processRef ? values[processRef] : undefined)
  );
  const residentData = useDataValue(
    Storage.ExternalContext,
    "residents",
    processRef,
    (values) => (processRef ? values[processRef] : undefined)
  );

  const tenantInfoStatus = useIdAndResidencyStatus(processRef);
  const householdStatus = useHouseholdStatus(processRef);
  const propertyInspectionStatus = usePropertyInspectionStatus(processRef);
  const wellbeingSupportStatus = useWellbeingSupportStatus(processRef);

  return (
    <MainLayout title={PageTitles.Sections} heading="Home Check" pausable>
      <TenancySummary
        details={{
          address: residentData.result
            ? residentData.result.address
            : residentData.error
            ? ["Error"]
            : undefined,
          tenants: residentData.result
            ? residentData.result.tenants.map((tenant) => tenant.fullName)
            : residentData.error
            ? ["Error"]
            : undefined,
          tenureType: tenancyData.result
            ? tenancyData.result.tenureType
            : tenancyData.error
            ? "Error"
            : undefined,
          startDate: tenancyData.result
            ? tenancyData.result.startDate
            : tenancyData.error
            ? "Error"
            : undefined,
        }}
      />

      {tenantInfoStatus.loading ? (
        <Paragraph>Checking process status...</Paragraph>
      ) : (
        <>
          <Paragraph>
            {tenantInfoStatus.status === TaskListStatus.Completed
              ? "Please complete the remaining sections."
              : "To begin the check, verify the tenant's ID and proof of residency."}
          </Paragraph>

          <TaskList
            items={[
              {
                name: "Tenant information",
                url: urlObjectForSlug(router, PageSlugs.PresentForCheck),
                status: tenantInfoStatus.status,
              },
              {
                name: "Household",
                url: urlObjectForSlug(router, PageSlugs.Household),
                status:
                  tenantInfoStatus.status === TaskListStatus.Completed
                    ? householdStatus.status
                    : TaskListStatus.Unavailable,
              },
              {
                name: "Property inspection",
                url: urlObjectForSlug(router, PageSlugs.Rooms),
                status:
                  tenantInfoStatus.status === TaskListStatus.Completed
                    ? propertyInspectionStatus.status
                    : TaskListStatus.Unavailable,
              },
              {
                name: "Wellbeing support",
                url: urlObjectForSlug(router, PageSlugs.Health),
                status:
                  tenantInfoStatus.status === TaskListStatus.Completed
                    ? wellbeingSupportStatus.status
                    : TaskListStatus.Unavailable,
              },
              {
                name: "Review and submit",
                url: urlObjectForSlug(router, PageSlugs.Review),
                status:
                  tenantInfoStatus.status === TaskListStatus.Completed
                    ? TaskListStatus.NotStarted
                    : TaskListStatus.Unavailable,
              },
            ]}
          />
        </>
      )}
    </MainLayout>
  );
};

export default SectionsPage;
