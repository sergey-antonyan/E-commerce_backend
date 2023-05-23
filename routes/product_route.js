const {addProduct, getAllProducts, getOneProduct, deleteProduct, updateProduct} = require('../controllers/product_controller')
const { upload} = require('../middleware/multer')

exports.create_product_router = (app)=>{
  app.get('/products' , getAllProducts);
  app.get('/products/:id' , getOneProduct);
  app.delete('/products/:id' , deleteProduct);
  app.put('/products/:id',updateProduct );
  app.post('/products', upload.single('image'), addProduct);
 }