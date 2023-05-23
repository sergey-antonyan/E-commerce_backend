const { Address } = require("../models");

exports.addAddress = (req, res) => {
  const product = {
    Address1: req.body.Address1,
    Address2: req.body.Address2,
    city: req.body.city,
    region: req.body.region,
    country: req.body.country,
    postal_code: req.body.postal_code,
    Phone_number: req.body.Phone_number
  };
  Address.create(product)
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res
        .status(500)
        .send({
          err: err.message || "There was an error while creating the product",
        })
    );
};

exports.getAllAddress = (req, res) => {
  Address.findAll()
    .then((products) => res.json(products))
    .catch((err) =>
      res.status(500).send({ err: err.message || "There was an error " })
    );
};

exports.getOneAddress = (req, res) => {
  const id = req.params.id;
  Address.findByPk(id).then((data) => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ message: `Cannot find Product with id=${id}.` });
    }
  });
};

exports.deleteAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Address.destroy({ where: { id: id } });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAddress = (req, res) => {
  const id = req.params.id;
  Address.update(req.body, { where: { id: id } })
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



