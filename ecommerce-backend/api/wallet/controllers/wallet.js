'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {

  async update(ctx) {
    const { id } = ctx.params;

    let entity;
    if (ctx.is('multipart')) {
      const { balance } = parseMultipartData(ctx);
      entity = await strapi.services.wallet.update({ id }, balance);
    } else {
      entity = await strapi.services.wallet.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.wallet });
  },
};