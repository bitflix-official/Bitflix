const withOffline = require('next-offline');

const nextConfig = {
  images: {
    domains: ['yts.mx', process.env.NEXT_PUBLIC_SUPABASE_URL, 'www.themoviedb.org'],
    loader: 'akamai',
    path: '',
  },
};

module.exports = withOffline(nextConfig);
