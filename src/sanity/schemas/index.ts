import { projectSchema } from "./project";
import { insightSchema } from "./insight";
import { teamMemberSchema } from "./teamMember";
import { serviceSchema } from "./service";
import { whyReasonSchema } from "./whyReason";
import { regionSchema } from "./region";
import { siteSettingsSchema } from "./siteSettings";
import { homePageSchema } from "./homePage";
import { aboutPageSchema } from "./aboutPage";
import { partnershipPageSchema } from "./partnershipPage";

export const schemaTypes = [
  projectSchema,
  insightSchema,
  teamMemberSchema,
  serviceSchema,
  whyReasonSchema,
  regionSchema,
  siteSettingsSchema,
  homePageSchema,
  aboutPageSchema,
  partnershipPageSchema,
];
