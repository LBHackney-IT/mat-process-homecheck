import { NextRouter } from "next/router";
import prefixUrl from "../helpers/prefixUrl";

enum PageSlugs {
  // General
  Index = "",
  Loading = "loading",
  Sections = "sections",

  // Previsit
  Outside = "outside",
  Start = "start",

  // ID, residency, and tenant information
  PresentForCheck = "present-for-check",
  Verify = "verify",
  Id = "id",
  NextOfKin = "next-of-kin",
  Carer = "carer",
  OtherSupport = "other-support",

  // Household
  Household = "household",
  Rent = "rent",
  OtherProperty = "other-property",

  // Property inspection
  AboutProperty = "about-property",
  Rooms = "rooms",
  LaminatedFlooring = "laminated-flooring",
  StructuralChanges = "structural-changes",
  Damage = "damage",
  Roof = "roof",
  Loft = "loft",
  Garden = "garden",
  Repairs = "repairs",
  StoringMaterials = "storing-materials",
  FireExit = "fire-exit",
  SmokeAlarm = "smoke-alarm",
  MetalGates = "metal-gates",
  DoorMats = "door-mats",
  CommunalAreas = "communal-areas",
  Pets = "pets",
  AntisocialBehaviour = "antisocial-behaviour",
  OtherComments = "other-comments",

  // Wellbeing support
  Health = "health",
  Disability = "disability",
  SupportNeeds = "support-needs",

  // Review and submit
  Review = "review",
  ManagerReview = "manager-review",
  ClosedReview = "closed-review",
  Submit = "submit",
  Confirmed = "confirmed",

  // Pause
  Pause = "pause",
  Paused = "paused",
}

const slugs: {
  [Name in PageSlugs]: boolean;
} = {
  "": false,
  loading: false,
  sections: false,
  outside: true,
  start: true,
  "present-for-check": true,
  verify: false,
  id: true,
  "next-of-kin": true,
  carer: true,
  "other-support": true,
  household: true,
  rent: true,
  "other-property": true,
  "about-property": true,
  rooms: true,
  "laminated-flooring": true,
  "structural-changes": true,
  damage: true,
  roof: true,
  loft: true,
  garden: true,
  repairs: true,
  "storing-materials": true,
  "fire-exit": true,
  "smoke-alarm": true,
  "metal-gates": true,
  "door-mats": true,
  "communal-areas": true,
  pets: true,
  "antisocial-behaviour": true,
  "other-comments": true,
  health: true,
  disability: false,
  "support-needs": true,
  review: false,
  "manager-review": false,
  "closed-review": false,
  submit: false,
  confirmed: false,
  pause: false,
  paused: false,
};

export const stepSlugs = Object.entries(slugs)
  .filter(([, include]) => include)
  .reduce((s, [slug]) => [...s, slug as PageSlugs], [] as PageSlugs[]);

export const repeatingStepSlugs = [
  PageSlugs.Id,
  PageSlugs.NextOfKin,
  PageSlugs.Carer,
  PageSlugs.OtherSupport,
];

export const urlObjectForSlug = (
  router: NextRouter,
  slug: string,
  query?:
    | {
        [s: string]: string;
      }
    | undefined
): { pathname: string } => {
  return prefixUrl(router, { pathname: `/${slug}`, query: query });
};

export default PageSlugs;
