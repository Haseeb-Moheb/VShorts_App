import { createClient } from '@sanity/client';

import { sanityConfig } from './sanity.config';

// Server-only Sanity client with write access.
// Import this ONLY from pages/api/* and getServerSideProps/getStaticProps.
if (typeof window !== 'undefined') {
  throw new Error('lib/sanity.server must not be imported in browser code');
}

const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.warn('SANITY_WRITE_TOKEN is not set; Sanity writes will fail');
}

export const serverClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token,
});
