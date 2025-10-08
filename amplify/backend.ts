import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { storage } from "./storage/resource";

const backend = defineBackend({
  auth,
  storage,
});
// extract L1 CfnUserPool resources
const { cfnUserPool } = backend.auth.resources.cfnResources;
// modify cfnUserPool policies directly
cfnUserPool.policies = {
  passwordPolicy: {
    minimumLength: 8,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: false,
    requireUppercase: false,
  },
};
