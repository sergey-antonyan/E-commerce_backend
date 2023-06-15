const {addProductToCart, deleteProductFromCart, getCartItems, getOneCart, deleteAllProductsFromCart, updateCartItem} = require('../controllers/shoping_cart_controller')
const { upload} = require('../middleware/multer')

exports.create_cart_router = (app)=>{
  app.post('/cart',  addProductToCart);
  app.delete('/cart/:userId/:productId', deleteProductFromCart);
  app.get('/cart/:userId', getCartItems);
  app.delete('/carts/:userId', deleteAllProductsFromCart);
  app.put('/cart/:userId/:productId', updateCartItem)
}
