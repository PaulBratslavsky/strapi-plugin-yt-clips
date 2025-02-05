# yt-video-clip

Select video clip.


```
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", 'https://www.youtube.com'], // Allow self and YouTube
          frameSrc: ["'self'", 'https://www.youtube.com'], // Allow framing from YouTube
        },
      },
    },
  },
  'strapi::poweredBy', // here
  {
    name: 'strapi::cors',
    config: {
      enabled: true, // deprecated in v4.25.8
      headers: '*',
      origin: ['http://localhost:1337', 'http://example2'],
    },
  },
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```# strapi-plugin-yt-clips
