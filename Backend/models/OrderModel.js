module.exports = (_db) => {
    db = _db
    return OrderModel
}

class OrderModel {
    
    //Retrieve of all orders
    static getAllOrders() {
        return db.query(`SELECT orders.id, orders.users_id, orders.total_price, orders.status, orders             .created_at, orderdetails.unit_price, orderdetails.programs_id
                        FROM orders
                        INNER JOIN orderdetails 
                        ON orderdetails.orders_id = orders.id
                        `)
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    //Retrieve of an order by id
    static getOneOrderById(id) {
         return db.query(`SELECT orders.id, orders.users_id, orders.total_price, orders.status, orders             .created_at, orderdetails.unit_price, orderdetails.programs_id
                        FROM orders
                        INNER JOIN orderdetails
                        ON orderdetails.orders_id = orders.id
                        WHERE orders.id = ?`, [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    
    
    //Validation of an order
    static saveOneOrder(userId, totalAmount) {
        return db.query(`INSERT INTO orders (users_id, total_price) 
                        VALUES (?, ?)`, [userId, totalAmount])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    //Update order status
    static updateOrderStatus(orderId, status){
        return db.query(`UPDATE orders SET status = ? WHERE id = ?`, [status, orderId])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    //Update total price
    static updateTotalPrice(orderId, totalPrice) {
        return db.query(`UPDATE orders SET total_price = ? WHERE id = ?`, [totalPrice, orderId])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
}