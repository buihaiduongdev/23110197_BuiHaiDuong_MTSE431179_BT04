const { prisma } = require("../config/database");

const getAllProducts = async () => {
    try {
        let result = await prisma.product.findMany();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getAllProducts
}
