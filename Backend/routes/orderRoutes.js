const withAuthAdmin = require ('../middleware/withAuthAdmin')
const withAuth = require ('../middleware/withAuth')

module.exports = (app, db) => {
    const UserModel = require("../models/UserModel")(db)
    const ProgramModel = require("../models/ProgramModel")(db)
    const OrderModel = require("../models/OrderModel")(db)
    const OrderDetailModel = require("../models/OrderDetailModel")(db)
    const orderController = require("../controllers/orderController")(UserModel, ProgramModel, OrderModel, OrderDetailModel)
    //route to get all orders
    app.get('/api/orders', withAuthAdmin, orderController.getAllOrders)
    //route to get one order by id
    app.get('/api/order/:id', withAuthAdmin, orderController.getOneOrderById)
    //route to save order
    app.post('/api/order/save', withAuth, orderController.saveOneOrder)
    //route to proceed to the payment
    app.post('/api/order/payment', withAuth, orderController.proceedPayment)
    //route to update payment status
    app.put('/api/order/status', withAuthAdmin, orderController.updateOrderStatus)
}