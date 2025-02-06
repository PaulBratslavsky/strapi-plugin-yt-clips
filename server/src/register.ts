import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "strapi-plugin-yt-clips",
    plugin: "strapi-plugin-yt-clips",
    type: 'json',
    
  });
};

export default register;
