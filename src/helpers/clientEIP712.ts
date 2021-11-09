import Client from "@snapshot-labs/snapshot.js/src/sign";
import { OFFCHAIN_HUB_LINK } from "./constants";

const client = new Client(OFFCHAIN_HUB_LINK);

export default client;
