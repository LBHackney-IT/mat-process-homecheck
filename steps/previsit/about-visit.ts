// import React from "react";

// import PageSlugs from "../PageSlugs";
// import PageTitles from "../PageTitles";
// import { DynamicComponent } from "remultiform/dist/esm/component-wrapper/DynamicComponent";
// import {
//   ComponentDatabaseMap,
//   ComponentValue,
//   ComponentWrapper,
// } from "remultiform/dist/esm/component-wrapper";
// // import { ComponentWrapper } from "remultiform";
// import { PostVisitActionInput } from "@hackney/mat-process-utils/dist/esm/components/PostVisitActionInput";
// import FieldsetLegend} from "@hackney/mat-process-utils/dist/esm/components"

// import { Notes } from "@hackney/mat-process-utils/dist/esm/schema/Notes";
// import { getKeyFromSlug } from "@hackney/mat-process-utils/dist/esm/helpers/getKeyFromSlug";
// import { makeSubmit } from "../../components/makeSubmit";
// import { RadioButtons } from "../../components/RadioButtons";
// // import { RadioButtons } from '@hackney/mat-process-utils/dist/esm/components/RadioButtons';
// import ProcessDatabaseSchema from "../../storage/ProcessDatabaseSchema";
// import { FieldsetLegend } from "@hackney/mat-process-utils/dist/esm/components/FieldsetLegend"
// // import { FieldsetLegend } from '@hackney/mat-process-utils/dist/esm/components';
// import keyFromSlug from '../../helpers/getKeyFromSlugs';

// const step = {
//   title: PageTitles.AboutVisit,
//   heading: "About the visit",
//   step: {
//     slug: PageSlugs.AboutVisit,
//     nextSlug: PageSlugs.Sections,
//     submit: (nextSlug?: string): ReturnType<typeof makeSubmit> =>
//       makeSubmit({
//         slug: nextSlug as PageSlugs | undefined,
//         value: "Save and continue",
//       }),
//     componentWrappers: [
//       ComponentWrapper.wrapDynamic(
//         new DynamicComponent({
//           key: "unannounced-visit",
//           Component: RadioButtons,
//           props: {
//             name: "unannounced-visit",
//             legend: (
//               <FieldsetLegend>Is this an unannounced visit?</FieldsetLegend>
//             ) as React.ReactNode,
//             radios: [
//               {
//                 label: "Yes",
//                 value: "yes",
//               },
//               {
//                 label: "No",
//                 value: "no",
//               },
//             ],
//           },
//           defaultValue: "",
//           emptyValue: "",
//           databaseMap: new ComponentDatabaseMap<
//             ProcessDatabaseSchema,
//             "isUnannouncedVisit"
//           >({
//             storeName: "isUnannouncedVisit",
//             key: getKeyFromSlug(),
//             property: ["value"],
//           }),
//         })
//       ),
//       ComponentWrapper.wrapDynamic(
//         new DynamicComponent({
//           key: "unannounced-visit-notes",
//           Component: PostVisitActionInput,
//           props: {
//             label: {
//               value: "Explain why this visit was pre-arranged.",
//             } as { id?: string; value: React.ReactNode },
//             name: "unannounced-visit-notes",
//           },
//           renderWhen(stepValues: {
//             "unannounced-visit"?: ComponentValue<
//               ProcessDatabaseSchema,
//               "isVisitInside"
//             >;
//           }): boolean {
//             return stepValues["unannounced-visit"] === "no";
//           },
//           defaultValue: [] as Notes,
//           emptyValue: [] as Notes,
//           databaseMap: new ComponentDatabaseMap<
//             ProcessDatabaseSchema,
//             "isUnannouncedVisit"
//           >({
//             storeName: "isUnannouncedVisit",
//             key: getKeyFromSlug()
//             property: ["notes"],
//           }),
//         })
//       ),
//       ComponentWrapper.wrapDynamic(
//         new DynamicComponent({
//           key: "inside-property",
//           Component: RadioButtons,
//           props: {
//             name: "inside-property",
//             legend: (
//               <FieldsetLegend>
//                 Is it taking place inside a tenant&apos;s home?
//               </FieldsetLegend>
//             ) as React.ReactNode,
//             radios: [
//               {
//                 label: "Yes",
//                 value: "yes",
//               },
//               {
//                 label: "No",
//                 value: "no",
//               },
//             ],
//           },
//           defaultValue: "",
//           emptyValue: "",
//           databaseMap: new ComponentDatabaseMap<
//             ProcessDatabaseSchema,
//             "isVisitInside"
//           >({
//             storeName: "isVisitInside",
//             key: keyFromSlug(),
//             property: ["value"],
//           }),
//         })
//       ),
//       ComponentWrapper.wrapDynamic(
//         new DynamicComponent({
//           key: "inside-property-notes",
//           Component: PostVisitActionInput,
//           props: {
//             label: {
//               value:
//                 "Explain why this visit is not happening inside a tenant's home.",
//             } as { id?: string; value: React.ReactNode },
//             name: "inside-property-notes",
//           },
//           renderWhen(stepValues: {
//             "inside-property"?: ComponentValue<
//               ProcessDatabaseSchema,
//               "isVisitInside"
//             >;
//           }): boolean {
//             return stepValues["inside-property"] === "no";
//           },
//           defaultValue: [] as Notes,
//           emptyValue: [] as Notes,
//           databaseMap: new ComponentDatabaseMap<
//             ProcessDatabaseSchema,
//             "isVisitInside"
//           >({
//             storeName: "isVisitInside",
//             key: keyFromSlug(),
//             property: ["notes"],
//           }),
//         })
//       ),
//     ],
//   },
// };

// export default step;
