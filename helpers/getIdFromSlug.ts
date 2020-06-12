// import { NextRouter } from "next/router";
// import { unprefixUrl } from "@hackney/mat-process-utils/dist/esm/helpers/unprefixUrl";
import { NextRouter } from "next/dist/next-server/lib/router/router";
import { unprefixUrl } from "@hackney/mat-process-utils/dist/esm/helpers/unprefixUrl";
// import { unprefixUrl } from "@hackney/mat-process-utils/dist/esm/helpers";

const idFromSlug = (
  router: NextRouter,
  slug: string | string[] | undefined
): string | undefined => {
  if (!slug || typeof slug === "string") {
    return;
  }

  const slugParts = unprefixUrl(router, {
    pathname: `/${slug.join("/")}`,
  })
    .pathname.split("/")
    .slice(1);

  if (slugParts.length < 2) {
    return;
  }

  return slugParts[slugParts.length - 1];
};

export default idFromSlug;
