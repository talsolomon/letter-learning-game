import { Flag } from './types';
import { northAmericaFlags } from './flags/northAmericaFlags';
import { southAmericaFlags } from './flags/southAmericaFlags';
import { europeFlags } from './flags/europeFlags';
import { asiaFlags } from './flags/asiaFlags';
import { africaFlags } from './flags/africaFlags';
import { oceaniaFlags } from './flags/oceaniaFlags';

export type { Flag };

export const flags: Flag[] = [
  ...northAmericaFlags,  // 10 flags
  ...southAmericaFlags,  // 10 flags
  ...europeFlags,       // 15 flags
  ...asiaFlags,        // 15 flags
  ...africaFlags,      // 15 flags
  ...oceaniaFlags      // 10 flags
];

// Total: 75 flags 