const {addAddress, getAllAddress, getOneAddress, deleteAddress, updateAddress} = require('../controllers/address_controller')

exports.create_address_router = (app)=>{
  app.post('/address', addAddress);
  app.get('/address' , getAllAddress);
  app.get('/address/:id' , getOneAddress);
  app.delete('/address/:id' , deleteAddress);
  app.put('/address/:id',updateAddress );
 }