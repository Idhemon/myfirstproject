module.exports = (_db) => {
    db = _db
    return OrderDetailModel
}

class OrderDetailModel {


    //Saving an orderDetail
    static saveOneOrderDetails(orderId, unitPrice, programId) {
        //1 = quantity in cart, impossible to buy the same program multiple times
        //programs is an object who has proprietes for programs.id
        return db.query(`INSERT INTO orderdetails(orders_id, unit_price, programs_id) VALUES (?, ?, ?)`,[orderId, unitPrice, programId])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    
    
    //Retrieve of all details of an order by id
    static getDetailsById(orderId) {
        return db.query(`SELECT orderdetails.id, orderdetails.unit_price, name, description, price,              picture, alt 
                        FROM orderdetails 
                        INNER JOIN programs 
                        ON programs.id = orderdetails.programs_id 
                        WHERE orderdetails.orders_id = ?`, [orderId])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
}