const { Products } = require("../models");
const { Category } = require("../models");
const fs = require("fs");

exports.addProduct = (req, res) => {
  const product = {
    product_name: req.body.product_name,
    description: req.body.description,
    price: req.body.price,
    categoryId: req.body.categoryId,
    image: `uploads/products/${req.file.filename}`,
    product_color: req.body.product_color,
    quantity: req.body.quantity
  };
  Products.create(product)
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res
        .status(500)
        .send({
          err: err.message || "There was an error while creating the product",
        })
    );
};

exports.getAllProducts = (req, res) => {
  Products.findAll({include: Category})
    .then((products) => res.json(products))
    .catch((err) =>
      res.status(500).send({ err: err.message || "There was an error " })
    );
};

exports.getOneProduct = (req, res) => {
  const id = req.params.id;
  Products.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Product with id=${id}.` });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Error retrieving Product." });
    });
};


exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.image) {
            const imgName = product.image.split('/').pop();
            const imgPath = './_uploads/products/' + imgName;

            fs.unlink(imgPath, (err) => {
                if (err) {
                console.error(err);
                return;
                }
                console.log('File has been delete');
            });
        }
        await Products.destroy({ where: { id: id } });
        return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  Products.update(req.body, { where: { id: id } })
    .then((count) => {
      if (count) {
        res.send({ message: "Product updated successfully" });
      } else {
        res.status(404).send({ message: `Cannot find Product with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Product with id=" + id,
      });
    });
};



