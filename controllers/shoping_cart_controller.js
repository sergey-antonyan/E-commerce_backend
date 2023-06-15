const { Shoping_Cart } = require('../models');

exports.addProductToCart = function (req, res, next) {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: 'Invalid request. Missing required fields.' });
  }

  Shoping_Cart.create({
    userId: userId,
    productId: productId,
    quantity: quantity
  })
    .then(savedCartItem => res.json(savedCartItem))
    .catch(err => {
      console.error(err);
      let error = new Error('Failed to add item to cart.');
      error.status = 500;
      return next(error);
    });
};


//

exports.getOneCart = function (req, res) {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'Invalid request. Missing required fields.' });
  }

  Shoping_Cart.findAll({
    where: { userId },
    include: [
      {
        model: Users,
        attributes: ['firstName'],
      },
      {
        model: Products,
        attributes: ['product_name'],
      },
    ],
    attributes: ['quantity'],
  })
    .then(cart => {
      if (cart) {
        res.send(cart);
      } else {
        res.status(404).send({ message: `Cannot find cart for userId=${userId}.` });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: 'Failed to retrieve cart.' });
    });
};





exports.getCartItems = function(req,res){
  const { userId } = req.params;
  
  Shoping_Cart.findAll()
    .then((cartItems) => res.json(cartItems))
    .catch((err)=>
      res.status(500).send({ err: err.message || "There was an error " }))
}

exports.deleteProductFromCart = function (req, res, next) {
  const { userId, productId } = req.params;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'Invalid request. Missing required fields.' });
  }

  Shoping_Cart.findOne({ where: { userId, productId } })
    .then(cartItem => {
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found.' });
      }

      return cartItem.destroy();
    })
    .then(() => res.status(204).end())
    .catch(err => {
      console.error(err);
      let error = new Error('Failed to delete product from cart.');
      error.status = 500;
      return next(error);
    });
};

exports.updateCartItem = async function(req, res) {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const cartItem = await Shoping_Cart.findOne({
      where: { userId: userId, productId: productId },
    });

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.json(cartItem);
    } else {
      res.status(404).json({ error: 'CartItem not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


async function incrementCartItem(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const cartItem = await Shoping_cart.findOne({ where: { productId: id } });
    if (!cartItem) {
      return res.status(400).json({ error: 'CartItem not found' });
    }
    const updatedQuantity = cartItem.quantity + quantity;
    await Shoping_cart.update({ quantity: updatedQuantity }, { where: { productId: id } });
    const updatedCartItem = await Shoping_cart.findOne({ where: { productId: id } });
    res.json({ cartItem: updatedCartItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function decrementCartItem(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const cartItem = await Shoping_cart.findOne({ where: { productId: id } });
    if (!cartItem) {
      return res.status(400).json({ error: 'CartItem not found' });
    }
    const updatedQuantity = cartItem.quantity - quantity;
    if (updatedQuantity < 1) {
      return res.status(400).json({ error: 'Quantity cannot be less than 1' });
    }
    await Shoping_cart.update({ quantity: updatedQuantity }, { where: { productId: id } });
    const updatedCartItem = await Shoping_cart.findOne({ where: { productId: id } });
    res.json({ cartItem: updatedCartItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



// exports.updateCartItem = (req, res) => {
//   const { userId, id } = req.params;
//   const { quantity } = req.body;

//   Shoping_Cart.update(
//     { quantity },
//     { where: { userId, id } }
//   )
//     .then((count) => {
//       if (count > 0) {
//         res.send({ message: "Cart item updated successfully" });
//       } else {
//         res.status(404).send({ message: `Cannot find cart item with userId=${userId} and id=${id}.` });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || `Error updating cart item with userId=${userId} and id=${id}`,
//       });
//     });
// };


// Assuming you have imported the necessary models and Sequelize instance


exports.deleteAllProductsFromCart = function (req, res, next) {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'Invalid request. Missing required fields.' });
  }

  Shoping_Cart.destroy({ where: { userId } })
    .then(() => res.status(204).end())
    .catch(err => {
      console.error(err);
      let error = new Error('Failed to delete products from cart.');
      error.status = 500;
      return next(error);
    });
};









// const { Shoping_Cart } = require('../models');

// exports.add = function (req, res, next) {
//   const { userId, productId, quantity } = req.body;

//   Shoping_Cart.findOne({ userId } )
//     .then(cart => {
//       if (!cart && quantity <= 0) {
//         throw new Error('Invalid request');
//       } else if (cart) {
//         const indexFound = cart.items.findIndex(item => {
//           return item.productId === productId;
//         });
//         if (indexFound !== -1 && quantity <= 0) {
//           cart.items.splice(indexFound, 1);
//         } else if (indexFound !== -1) {
//           cart.items[indexFound].quantity += quantity;
//         } else if (quantity > 0) {
//           cart.items.push({
//             productId: productId,
//             quantity: quantity
//           });
//         } else {
//           throw new Error('Invalid request');
//         }
//         return cart.save();
//       } else {
//         const cartData = {
//           userId: userId,
//           items: [
//             {
//               productId: productId,
//               quantity: quantity
//             }
//           ]
//         };
//         cart = new Shoping_Cart(cartData);
//         return cart.save();
//       }
//     })
//     .then(savedCart => res.json(savedCart))
//     .catch(err => {
//       let error;
//       if (err.message === 'Invalid request') {
//         error = new Error(err.message);
//         error.status = 400;
//       } else {
//         error = new Error(err.message);
//         error.status = 404;
//       }
//       return next(error);
//     });
// };
