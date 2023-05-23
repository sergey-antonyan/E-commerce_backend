const {Category} = require('../models');

exports.addCategory = async(req, res)=>{
  try{
      const category_name = req.body.category_name;
      console.log(req.body);
      const data = await Category.create({category_name:category_name})
      res.status(201).json(data)
  }
  catch(err){
      res.status(500).json({error: err.message})
  }
};

exports.getCategories = async(req,res)=>{
  try{
    const category_name = req.body.category_name;
    const data = await Category.findAll({category_name:category_name});
    res.status(201).json(data)
  }
  catch(err){
    res.status(500).json({error: err.message})
  }
}

exports.getOneCategory = (req,res) => {
  const id = req.params.id;
    Category.findByPk(id)
      .then((data) => {
        if(data){
          res.send(data);
        }else{
          res.status(404).send({message: `Cannot find Product with id=${id}.`});
        }
      })
  }


exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.destroy({ where: { id: id } });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = (req,res)=>{
  const id = req.params.id;
  Category.update(req.body,{where : {id:id}})
    .then((count)=> {
      if(count){
        res.send({message: 'Product updated successfully'})
      }else{
        res.status(404).send({message: `Cannot find Product with id=${id}.`});
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Product with id=" + id,
      });
    });
}