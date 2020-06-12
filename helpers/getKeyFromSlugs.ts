import router from "next/router";
import isServer from "./isServer";
//import { getIdFromSlug } from '@hackney/mat-process-utils/dist/esm/helpers/getIdFromSlug';
import { getProcessRef } from "@hackney/mat-process-utils/dist/esm/helpers/getProcessRef";
import idFromSlug from "./getIdFromSlug";

const keyFromSlug = (expectId = false): (() => string) => (): string => {
  if (isServer) {
    return "";
  }

  // `router.query` might be an empty object when first loading a page for
  // some reason.
  const slug = router.query.slug;

  const id = idFromSlug(router, slug);

  if (id) {
    return id;
  } else if (expectId) {
    throw new Error("No ID found in the slug");
  }

  const processRef = getProcessRef(router);

  if (processRef) {
    return processRef;
  }

  throw new Error("No key found in the slug");
};

export default keyFromSlug;
