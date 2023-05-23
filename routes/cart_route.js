const {addProductToCart, deleteProductFromCart, getCartItems, getOneCart, deleteAllProductsFromCart} = require('../controllers/shoping_cart_controller')
const { upload} = require('../middleware/multer')

exports.create_cart_router = (app)=>{
  app.post('/cart',  addProductToCart);
  app.delete('/cart/:productId', deleteProductFromCart)
  app.get('/cart', getCartItems)
  app.get('/cart/:userId', getOneCart)
  app.delete('/carts/:userId', deleteAllProductsFromCart)
 }