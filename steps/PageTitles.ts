// import { NextRouter } from "next/router";
// // import prefixUrl from "../helpers/prefixUrl";

// enum PageSlugs {
//   // General
//   Index = "",
//   Loading = "loading",
//   Sections = "sections",

//   // Previsit
//   Outside = "outside",
//   Start = "start",
//   AboutVisit = "about-visit",
// }

// const slugs: {
//   [Name in PageSlugs]: boolean;
// } = {
//   "": false,
//   loading: false,
//   sections: false,
//   outside: true,
//   start: true,
//   "about-visit": true,
//   //   "manager-review": false,
//   //   "closed-review": false,
//   //   submit: false,
//   //   confirmed: false,
//   //   pause: false,
//   //   paused: false,
// };

// export const stepSlugs = Object.entries(slugs)
//   .filter(([, include]) => include)
//   .reduce((s, [slug]) => [...s, slug as PageSlugs], [] as PageSlugs[]);

// // export const repeatingStepSlugs = [
// //   PageSlugs.Id,
// //   PageSlugs.Residency,
// //   PageSlugs.TenantPhoto,
// //   PageSlugs.NextOfKin,
// //   PageSlugs.Carer,
// //   PageSlugs.OtherSupport,
// // ];

// export const urlObjectForSlug = (
//   router: NextRouter,
//   slug: string,
//   query?:
//     | {
//         [s: string]: string;
//       }
//     | undefined
// ): { pathname: string } => {
//   return prefixUrl(router, { pathname: `/${slug}`, query: query });
// };

// export default PageSlugs;
