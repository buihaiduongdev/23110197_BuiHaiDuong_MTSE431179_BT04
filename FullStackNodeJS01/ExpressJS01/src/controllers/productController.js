const { getAllProducts } = require("../services/productServices");

const getProducts = async (req, res) => {
    let results = await getAllProducts();
    return res.status(200).json({
        EC: 0,
        data: results
    })
}

module.exports = {
    getProducts
}
