import { projectSchema } from "./project";
import { insightSchema } from "./insight";
import { teamMemberSchema } from "./teamMember";
import { serviceSchema } from "./service";
import { whyReasonSchema } from "./whyReason";
import { regionSchema } from "./region";
import { siteSettingsSchema } from "./siteSettings";

export const schemaTypes = [
  projectSchema,
  insightSchema,
  teamMemberSchema,
  serviceSchema,
  whyReasonSchema,
  regionSchema,
  siteSettingsSchema,
];
