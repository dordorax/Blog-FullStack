'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils'); 

module.exports = {

    async create(ctx) {

        const db_products = await strapi.query('products').find({products});

        let entity;
        if (ctx.is('multipart')) {

            const {
                city,
                address,
                postal_code,
                amount,
            } = parseMultipartData(ctx);
        
            entity = await strapi.services.order.create({
                user: ctx.state.user.id,
                city,
                address,
                postal_code,
                amount,
                products: db_products,
                total_price: db_products.price * amount,
            });
        } 
        else {

        entity = await strapi.services.order.create(ctx.request.body);

        } 

        return sanitizeEntity(entity, { model: strapi.models.order });
    },

    async update(ctx) {
        const { id } = ctx.params;
    
        let entity;
        if (ctx.is('multipart')) {
          const { status } = parseMultipartData(ctx);
          entity = await strapi.services.order.update({ id }, status);
        } else {
          entity = await strapi.services.order.update({ id }, ctx.request.body);
        }
    
        return sanitizeEntity(entity, { model: strapi.models.order });
    }
};
