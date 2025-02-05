import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "youtube",
    plugin: "yt-video-clip",
    type: 'json',
    
  });
};

export default register;
