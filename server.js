const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors')
const {create_category_router} = require('./routes/category_route')
const {create_product_router} = require('./routes/product_route');
const {create_address_router} = require('./routes/address_route');
const {create_user_routes} = require('./routes/user_route');
const {create_cart_router} = require('./routes/cart_route');
app.use(express.json());
app.use(cors({
  origin: "*"
}));
const { Sequelize } = require('sequelize');
app.use('/uploads', express.static('./_uploads'));

const sequelize = new Sequelize('my_new_database123', 'postgres', 'Y1012Jqkhkp,', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();
create_address_router(app)
create_product_router(app);
create_category_router(app);
create_user_routes(app);
create_cart_router(app)

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})