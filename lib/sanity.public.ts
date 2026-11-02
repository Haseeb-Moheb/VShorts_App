import { createClient } from '@sanity/client';

import { sanityConfig } from './sanity.config';

// Read-only, tokenless client for published public data.
// Safe to use anywhere, including the browser.
export const publicClient = createClient({
  ...sanityConfig,
  useCdn: false,
});
