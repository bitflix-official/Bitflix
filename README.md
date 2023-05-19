<h1 align="center">
  <br />
  <a href="https://bitflixapp.com">
    <img width="100" src="https://bitflixapp.com/_next/static/media/logo.25407f8c.png" alt="Bitflix" />
  </a>
  <br />
  Bitflix
</h1>

<h4 align="center">Bitflix is an open source web application to watch movies and TV shows with multi-language subtitles completely for free.</h4>

## Motivation
Nowadays watching a movie or a TV Show episode could be a little hard. We have a lot of different streaming applications where the content is really different between them and the user has to pay all of them to have access to a good amount of movies and TV Shows.
Of course, we all know some free websites where there is a lot of content but at the same time this apps are managed by people with economic interests, so the final result is a product with a lot of ads that make the UI/UX worse.
Our idea behind Bitflix is just to make an infinite-content free web application without any ad, focusing on the user experience.

## Screenshots
<img width="1402" alt="screenshot_1" src="https://user-images.githubusercontent.com/27747658/157375297-47344d57-576e-4838-9b2c-37a52e6a1c1d.png">
<img width="1433" alt="screenshot_2" src="https://user-images.githubusercontent.com/27747658/157375376-bd18e955-f3ff-4ca6-92a5-c7728acaaf33.png">
<img width="1901" alt="screenshot_3" src="https://user-images.githubusercontent.com/27747658/157375557-112be792-787b-4ec5-bf96-4e10e013eddc.png">
<img width="1466" alt="screenshot_4" src="https://user-images.githubusercontent.com/27747658/157375208-16e0c1f9-cef5-4034-9517-8344194f34af.png">




## UI Tech stack
Our system is built using the following technologies:
#### <a href="https://nextjs.org/">Next.js</a>
"Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed."
#### <a href="https://tailwindcss.com/">Tailwind</a>
"Rapidly build modern websites without ever leaving your HTML."
#### <a href="https://videojs.com/">Video.js</a>
"Make your player yours with the world's most popular open source HTML5 player framework"
#### <a href="https://www.radix-ui.com/docs/primitives/overview/introduction">Radix UI</a>
"An open-source UI component library for building high-quality, accessible design systems and web apps."

## Getting started
<code>git clone https://github.com/bitflix-official/Bitflix && cd Bitflix</code>
<br />
<br />
<code>yarn add</code>
<br />
### Environment
Create an <code>.env.local</code> file at the root of the project with the following variables:
<br />
- <code>NEXT_PUBLIC_SUPABASE_URL</code>: Database where Bitflix's users and their data like lists and profile images are hosted. To avoid issues on the production database, I suggest you to <a href="https://app.supabase.io/">create your own database</a> with a 'profiles' table with the following schema:<br /><br /> <img width="1200" alt="image" src="https://user-images.githubusercontent.com/27747658/157371850-7765d318-722a-4cd8-a59d-a7db99e9ef83.png"><br />Once you have done that, add your supabase url as a value.
- <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>: Same as before, once you have done your 'profiles' database on Supabase with the previously mentioned schema, add your supabase anon key as a value.
- <code>NEXT_PUBLIC_TMDB_API_KEY=YOUR_TMDB_API_KEY</code>
- <code>NEXT_PUBLIC_STREAMING_URL=YOUR_OWN_PEERFLIX_SERVER OR https://bitflix-api.herokuapp.com</code>
- <code>NEXT_PUBLIC_SUBTITLES_URL=YOUR_OWN_SUBTITLES_SERVER OR https://bitflix-subs.herokuapp.com</code>
- <code>NEXT_PUBLIC_TV_URL=YOUR_OWN_TV_SERVER OR https://bitflix-tv.herokuapp.com</code>
<br />
<code>yarn run dev</code>
<br />
<br />
App should have been started on localhost:3000 🚀
