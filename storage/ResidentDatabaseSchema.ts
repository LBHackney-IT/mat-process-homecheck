import { NamedSchema, StoreNames } from "remultiform/database";
import { Notes } from "./DatabaseSchema";
import databaseSchemaVersion from "./databaseSchemaVersion";

export type ResidentRef = string;

export const residentDatabaseName = `mat-process-${
  process.env.PROCESS_NAME
}-resident-${process.env.ENVIRONMENT_NAME || "unknown"}`;

type ResidentDatabaseSchema = NamedSchema<
  typeof residentDatabaseName,
  typeof databaseSchemaVersion,
  {
    nextOfKin: {
      key: ResidentRef;
      value: {
        fullName: string;
        relationship: string;
        mobileNumber: string;
        otherNumber: string;
        email: string;
        address: string;
      };
    };

    carer: {
      key: ResidentRef;
      value: {
        hasCarer: string;
        type: string;
        isLiveIn: string;
        liveInStartDate: string;
        fullName: string;
        phoneNumber: string;
        relationship: string;
        address: string;
        notes: Notes;
      };
    };

    otherSupport: {
      key: ResidentRef;
      value: {
        fullName: string;
        role: string;
        phoneNumber: string;
      };
    };

    disabilities: {
      key: ResidentRef;
      value: {
        what: string[];
      };
    };

    signature: {
      key: ResidentRef;
      value: string;
    };
  }
>;

const storeNames: {
  [Name in StoreNames<ResidentDatabaseSchema["schema"]>]: boolean;
} = {
  nextOfKin: true,
  carer: true,
  otherSupport: true,
  disabilities: true,
  signature: true,
};

export const residentStoreNames = Object.entries(storeNames)
  .filter(([, include]) => include)
  .reduce(
    (names, [name]) => [
      ...names,
      name as StoreNames<ResidentDatabaseSchema["schema"]>,
    ],
    [] as StoreNames<ResidentDatabaseSchema["schema"]>[]
  );

export const residentNotesPaths: {
  [Name in StoreNames<ResidentDatabaseSchema["schema"]>]: string[] | never[];
} = {
  carer: ["notes"],
  nextOfKin: [],
  otherSupport: ["notes"],
  disabilities: [],
  signature: [],
};

export const residentPostVisitActionMap: {
  [storeName in StoreNames<ResidentDatabaseSchema["schema"]>]: {
    [path: string]: { category: string; subcategory: string };
  };
} = {
  carer: {
    notes: {
      category: "19",
      subcategory: "100000582",
    },
  },
  nextOfKin: {},
  otherSupport: {
    notes: {
      category: "19",
      subcategory: "100000300",
    },
  },
  disabilities: {},
  signature: {},
};

export default ResidentDatabaseSchema;
