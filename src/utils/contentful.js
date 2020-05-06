import getConfig from 'next/config';
import axios from 'axios';

const { serverRuntimeConfig } = getConfig();

export const getUpcoming = async () => {
  try {
    const base = `https://cdn.contentful.com/spaces/${serverRuntimeConfig.contentful.spaceId}/environments/master`;
    const url = `${base}/entries?content_type=event&access_token=${serverRuntimeConfig.contentful.token}`;
    const result = await axios.get(url);

    const getById = (elem, id) => elem.filter((e) => e.sys.id === id)[0];

    return result.data.items
      .map((item) => item.fields)
      .map((item) => ({
        ...item,
        program: getById(result.data.includes.Entry, item.program.sys.id).fields,
        themeBackgrounds: !item.themeBackgrounds
          ? []
          : item.themeBackgrounds.map((bg) => getById(result.data.includes.Asset, bg.sys.id).fields),
      }))
      .filter((e) => e.program.name === 'Virtual CodeDay')
      .filter((e) => new Date(e.endsAt) > new Date());
  } catch (ex) {
    return [];
  }
};
