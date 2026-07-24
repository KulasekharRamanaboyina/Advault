import { industryType } from './documents/industry'
import { brandType } from './documents/brand'
import { psychologyType } from './documents/psychology'
import { sourceType } from './documents/source'
import { campaignType } from './documents/campaign'
import { postType } from './documents/post'

import { timelineEventType } from './objects/timelineEvent'
import { mediaMixType } from './objects/mediaMix'
import { resultMetricType } from './objects/resultMetric'

export const schemaTypes = [
    industryType,
    brandType,
    psychologyType,
    sourceType,
    postType,

    timelineEventType,
    mediaMixType,
    resultMetricType,
    campaignType,
]