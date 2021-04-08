'use strict';


module.exports = {

    async create(ctx) {

        console.log('###########################')
        console.log(ctx.request.body.product);
        console.log(ctx.state.user.balance);
        console.log(ctx.state.user.id);
        console.log('###########################')
     
        const {
            city,
            address,
            postal_code,
            amount,
        } = ctx.request.body;

        const product = await strapi.query('Product').findOne({ id: ctx.request.body.product.id});
        console.log(product.quantity);
        const wallet = ctx.state.user.balance;
        const total_price = product.price * amount;

        if(product != null && wallet <= total_price){
            try{
                const order = await strapi.query('Order').create({
                    city,
                    address,
                    postal_code,
                    amount,
                    total_price,
                    product,
                    user: ctx.state.user.id
                })

                await starpi.query('User').update({id: ctx.state.user.id},{balance: ctx.state.user.balance - total_price});
                await strapi.query('Product').update({id: product.id},{quantity: ctx.product.quantity - amount});
                
                console.log('***************************')
                console.log(ctx.state.user.balance);
                console.log(ctx.product.quantity);
                console.log(order);                
                return {
                    'status': 200,
                    'message': `New order #${order.id} created successfully!`
                };        
    
            }
            catch(err) {
                console.log(err)
                return {
                    'status': 400,
                    'message': "Failed to create order"
                };
            }
        }
    },

    async update(ctx) {
        return strapi.query('Order').update({id: ctx.params.id},{status: ctx.request.body.status});
    }
};
