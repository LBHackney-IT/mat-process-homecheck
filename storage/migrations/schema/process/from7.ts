import { Upgrade } from "remultiform/database";
import ProcessDatabaseSchema from "../../../ProcessDatabaseSchema";

const upgradeSchema = (_: Upgrade<ProcessDatabaseSchema["schema"]>): void => {
  // upgrade.createStore("unableToEnter");
};
export default upgradeSchema;
