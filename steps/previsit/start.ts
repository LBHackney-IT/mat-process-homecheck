// import { makeUnableToEnterSubmit } from "../../components/makeUnableToEnterSubmit";
// import PageSlugs from "../PageSlugs";
import React from "react";
import PageTitles from "../PageTitles";
import PageSlugs from "../PageSlugs";
import { makeSubmit } from "../../components/makeSubmit";
import { makeUnableToEnterSubmit } from "../../components/makeUnableToEnterSubmit";
import {
  ComponentWrapper,
  StaticComponent,
} from "remultiform/dist/esm/component-wrapper";
import {
  Heading,
  HeadingLevels,
  Paragraph,
} from "lbh-frontend-react/dist/esm/components/typography";
import {
  List,
  ListTypes,
  ListProps,
} from "lbh-frontend-react/dist/esm/components/List";
import { Link } from "lbh-frontend-react/dist/esm/components/Link";
// import { makeSubmit } from "@hackney/mat-process-utils/dist/esm/components/makeSubmit";
// import { ComponentWrapper } from "remultiform/dist/esm/component-wrapper/ComponentWrapper";
// import {
//   HeadingLevels,
//   Heading,
// } from "lbh-frontend-react/dist/esm/components/typography/Heading";
// import {
//   ListTypes,
//   ListProps,
//   List,
// } from "lbh-frontend-react/dist/esm/components";
// import { StaticComponent } from "remultiform/dist/esm/component-wrapper/StaticComponent";
// import { Paragraph } from 'lbh-frontend-react/dist/esm/components/typography/Paragraph';

const step = {
  title: PageTitles.Start,
  heading: "Start Tenancy and Household Check",
  step: {
    slug: PageSlugs.Start,
    nextSlug: PageSlugs.AboutVisit,
    submit: (nextSlug?: string): ReturnType<typeof makeSubmit> =>
      makeUnableToEnterSubmit({
        slug: nextSlug as PageSlugs | undefined,
        value: "Start visit with tenant",
      }),
    componentWrappers: [
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "heading",
          Component: Heading,
          props: {
            level: HeadingLevels.H2,
            children: "About Tenancy and Household Check",
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-1",
          Component: Paragraph,
          props: {
            children: "",
            //   <strong>
            //     "Please read the following text to the tenant(s) to explain
            //     why we collect information from them and what we do with it."
            //   </strong>
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-2",
          Component: Paragraph,
          props: {
            children:
              "Housing Services carry out unannounced visits at tenants' homes.",
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-3",
          Component: Paragraph,
          props: {
            children: "The information we collect from our visits helps us to:",
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-3-list",
          Component: List,
          props: {
            items: [
              "maintain up-to-date records of who lives at a property",
              "ensure properties are being maintained",
              "and identify any support needs.",
            ],
            type: ListTypes.Bullet,
          } as ListProps,
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-4",
          Component: Paragraph,
          props: {
            children:
              "We can also give advice about any tenancy issues or other enquiries.",
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-5",
          Component: Paragraph,
          props: {
            children:
              "All the information collected from you will be stored electronically and kept secure. Once stored, it can be accessed by the Council’s Housing team and may be shared internally and with partner organisations, for instance, if you have medical or support needs.",
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-6",
          Component: Paragraph,
          props: {
            children:
              "We will keep your information for as long as the Council’s data retention schedule permits.",
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-7",
          Component: Paragraph,
          props: {
            children: "",
            //  "
            //     More about how we hold information about you and your access to
            //     it can be found on the{" "}
            //     <Link href={"https://hackney.gov.uk/privacy"} target="_blank">
            //       privacy notice page
            //     </Link>{" "}
            //     (opens in a new tab) of the Hackney Council website.
            //   "
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-8",
          Component: Paragraph,
          props: {
            children: "Are you OK to start this visit?",
          },
        })
      ),
    ],
  },
};

export default step;
