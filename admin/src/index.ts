// import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

export default {
  register(app: any) {
  
    app.customFields.register({
      name: 'strapi-plugin-yt-clips',
      pluginId: PLUGIN_ID,
      icon: PluginIcon,
      type: 'json',
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: "Youtube Clips",
      },  
      intlDescription: {
        id: `${PLUGIN_ID}.plugin.description`,
        defaultMessage: "Youtube Clips",
      },
      components: {
        Input: async () => import('./components/Input'),
      },
      inputSize: {
        // optional
        default: 12,
        isResizable: true,
      },
      
      options: {
        // declare options here
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
