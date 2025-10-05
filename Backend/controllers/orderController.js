const dotenv = require("dotenv")
dotenv.config()
const stripe = require("stripe")(process.env.STRIPE_SECRET)

module.exports = (UserModel, ProgramModel, OrderModel, OrderDetailModel) => {
    
    //controller to get ALL orders
    const getAllOrders = async (req,res) => {
        try {
            const orders = await OrderModel.getAllOrders()
            //❌️
            if (orders.code) {
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            }
            //✅️ 
            else {
                res.json({status: 200, result: orders})
            }
        }
        //❌️
        catch (err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    
    //controller to get one order by id
    const getOneOrderById = async (req,res) => {
        try {
            const order = await OrderModel.getOneOrderById(req.params.id)
            //❌️
            if (order.code) {
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            }
            //✅️ 
            else {
                
                
                //Retrieve the user infos
                const user = await UserModel.getOneUserById(order[0].users_id)
                //❌️
                if (user.code) {
                    res.json({status: 500, msg: "Erreur survenue lors de la récupération des infos utilisateur"})
                }
                //✅️ 
                    const infosUser = {
                        firstname   : user[0].firstname,
                        lastname    : user[0].lastname,
                        phone       : user[0].phone,
                        email       : user[0].email,
                        number      : user[0].number,
                        street      : user[0].street,
                        zip         : user[0].zip_code,
                        city        : user[0].city
                    }
                    const orderDetails = await OrderDetailModel.getDetailsById(req.params.id)
                    //❌️
                    if (orderDetails.code) {
                         res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.3"})
                    }
                    //✅️ 
                    else {
                         res.json({status: 200, order: order[0], user: infosUser, orderDetail: orderDetails })
                    }
                
            }
        }
        //❌️
        catch(err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    
    //controller to save one order
    const saveOneOrder = async (req,res) => {
        try {
            //TotalAmount is initialized to 0
            let totalPrice = 0
            //details is an array that stores program details
            let details = []
            //Promise.all is used to execute multiple promises in parallel
            const programs = await Promise.all (
                //🔄 req.body.cart.map iterates over each item in the cart
                req.body.cart.map(async (p) => {
                    //Price recovery
                    const program = await ProgramModel.getPriceCommandById(p.id)
                    //❗️ 
                    if(!program || program.code) {
                        res.json({status: 500, msg: "Problème lors de la recherche du prix du programme"})
                    }
                    //❓️ 
                    if(program[0]){
                    //Addition of the price of the different programs present in the cart
                    totalPrice += program[0].price
                    //✅️ The program details (id and price) are added to the details array
                    details.push({id : program[0].id, price : program[0].price})
                    }
                    else {
                        //❌️
                        throw new Error(`Aucun programme trouvé avec l'ID: ${p.id}`)
                    }
                })
            )
            //Register an order
            const orderRegister = await OrderModel.saveOneOrder(req.body.users_id, totalPrice)
            //❌️If error code
            if (orderRegister.code) {
                res.json({status: 500, msg: "Problème lors de l'enregistrement de la commande"})
            }
            
            //🔄 Loop to save the details for each program purchased
            //For each detail, record the order details, passing the program id, price and the newly created order id
            const saveDetails = await Promise.all(
                details.map(detail => {
                    return OrderDetailModel.saveOneOrderDetails(orderRegister.insertId, detail.price, detail.id)
                })
            )
            //❌️
            if(saveDetails.some(detail => detail.code)) {
                return res.status(500).json({status:500, msg:"Problème lors de l'enregistrement des détails de la commande"})
            }
            //✅️ 
            res.json({status: 200, msg: "La commande a bien été enregistrée", orderId : orderRegister.insertId})     
        }
        //❌️
        catch (err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    
    
    
    //Controller to manage the payment
    const proceedPayment = async (req,res) => {
        try {
            //Retrieve of the order
            const orders = await OrderModel.getOneOrderById(req.body.order)
            //❌️
            if (orders.code) {
                return res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            }
            
            const totalPrice = orders[0].total_price
            //If the order is successfully retrieved, a payment intent is created using Stripe
            const paymentIntent = await stripe.paymentIntents.create({
                //*100 because the amount is waiting in cents
                amount : Math.round(totalPrice * 100),
                //the payment currency to be made is indicated
                currency : "eur",
                //checking if the payment is valid or not
                metadata : {integration_check: "accept_a_payment"},
                //the user receives payment confirmation by email
                receipt_email : req.body.email
            })
            //✅️ 
            res.json({status: 200, client_secret: paymentIntent.client_secret})
            
        }
        //❌️
        catch (err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    
    
    //controller to update payment status
    const updateOrderStatus = async (req,res) => {
        try {
            const { order, status } = req.body
            
            const isValidated = await OrderModel.updateOrderStatus(order, status)
            //❌️
            if(isValidated.code) {
                res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.1"})
            }
            //✅️ 
            else {
                res.json({status: 200, msg: "Le status a été mis à jour"})
            }
        }
        //❌️
        catch(err) {
            res.json({status: 500, msg: "Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.2"})
        }
    }
    
    return {
        getAllOrders,
        getOneOrderById,
        saveOneOrder,
        proceedPayment,
        updateOrderStatus
    }
}