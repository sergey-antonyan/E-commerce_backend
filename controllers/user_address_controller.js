import { User_Address } from '../models'

exports.createUserAddress = (req, res) => {
  const userAddressData = {
    userId: req.body.userId, 
    addressId: req.body.addressId 
  };

  User_Address.create(userAddressData)
    .then(() => {
      res.status(201).send(userAddressData);
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

exports.updateUserAddress = (req,res)=>{
  
}