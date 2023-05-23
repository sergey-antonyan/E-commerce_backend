const {getCategories, getOneCategory, deleteCategory, updateCategory, addCategory} = require('../controllers/category_controller');

exports.create_category_router = (app)=>{
 app.get('/category' , getCategories);
 app.get('/category/:id' , getOneCategory);
 app.delete('/category/:id' , deleteCategory);
 app.put('/category/:id',updateCategory );
 app.post('/category', addCategory);
}