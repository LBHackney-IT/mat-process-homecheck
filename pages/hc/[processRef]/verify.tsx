import formatDate from "date-fns/format";
import {
  Button,
  Heading,
  HeadingLevels,
  Link,
  Paragraph,
} from "lbh-frontend-react/components";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Table } from "../../../components/Table";
import { TenancySummary } from "../../../components/TenancySummary";
import getProcessRef from "../../../helpers/getProcessRef";
import slugWithId from "../../../helpers/slugWithId";
import urlsForRouter from "../../../helpers/urlsForRouter";
import useDataSet from "../../../helpers/useDataSet";
import useDataValue from "../../../helpers/useDataValue";
import MainLayout from "../../../layouts/MainLayout";
import PageSlugs, { urlObjectForSlug } from "../../../steps/PageSlugs";
import PageTitles from "../../../steps/PageTitles";
import Storage from "../../../storage/Storage";

export const VerifyPage: NextPage = () => {
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
  const tenantsPresent = useDataValue(
    Storage.ProcessContext,
    "tenantsPresent",
    processRef,
    (values) => (processRef ? values[processRef] : undefined)
  );

  const tenants = residentData.result?.tenants || [];
  const tenantIds = tenants.map((tenant) => tenant.id);

  const nextOfKinData = useDataSet(
    Storage.ResidentContext,
    "nextOfKin",
    tenantIds
  );

  const tenantData = tenants.map((tenant) => ({
    id: tenant.id,
    name: tenant.fullName,
    dateOfBirth: tenant.dateOfBirth,
    status:
      nextOfKinData.result && nextOfKinData.result[tenant.id]?.fullName
        ? true
        : false,
  }));

  const tableRows = tenantData.map((tenant) => {
    return [
      tenant.name,
      formatDate(tenant.dateOfBirth, "d MMMM yyyy"),
      <Link
        key="edit-link"
        href={
          urlObjectForSlug(router, slugWithId(PageSlugs.NextOfKin, tenant.id))
            .pathname
        }
      >
        {tenantsPresent.loading ? "Loading..." : "Edit"}
      </Link>,
    ];
  });

  const { href, as } = urlsForRouter(
    router,
    urlObjectForSlug(router, PageSlugs.Sections)
  );

  const button = (
    <Button disabled={!href.pathname || !as.pathname} data-testid="submit">
      Save and continue
    </Button>
  );

  return (
    <MainLayout title={PageTitles.Verify} heading="Tenant details" pausable>
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

      <Paragraph>
        For this section, tenants will need to provide proof of ID and
        residency.
      </Paragraph>
      <Paragraph>
        If any tenants are not present for this visit, only proof of residency
        is required for those tenants.
      </Paragraph>

      <Heading level={HeadingLevels.H2}>Select a tenant to check</Heading>

      <Table
        headings={["Tenant", "Date of birth", "Action"]}
        rows={tableRows}
      />

      {href.pathname && as.pathname ? (
        <NextLink href={href} as={as}>
          {button}
        </NextLink>
      ) : (
        button
      )}
    </MainLayout>
  );
};

export default VerifyPage;
