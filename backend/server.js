import express from 'express'
import dotenv from 'dotenv'
import product from './routers/ProductRouters.js'
import billingDetail from './routers/BillingDetailRouters.js'
import Order from './routers/OrderRouters.js'
import OrderItem from './routers/OrderItemROuters.js'
import Checkout from './routers/CheckoutRouters.js'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(cors({
    origin: "http://localhost:5173" // front-end ของคุณ
}));
const port = process.env.PORT

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world')
})
app.use('/product', product)
app.use('/billing-details',billingDetail)
app.use('/orders',Order)
app.use('/ordersitem',OrderItem)
app.use('/checkout',Checkout)

app.listen(port, () => {
    console.log('server run on port:', port);

})