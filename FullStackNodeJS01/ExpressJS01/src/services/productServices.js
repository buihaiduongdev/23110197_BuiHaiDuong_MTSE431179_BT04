const { prisma } = require("../config/database");

const getAllProducts = async (filters = {}) => {
  try {
    const { search, categoryId, minPrice, maxPrice, sortBy } = filters;

    let where = {};
    if (search) {
      where.name = { contains: search };
    }
    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    let orderBy = {};
    if (sortBy === "price_asc") orderBy.price = "asc";
    else if (sortBy === "price_desc") orderBy.price = "desc";
    else orderBy.createdAt = "desc";

    let result = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getProductById = async (id) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    });
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const seedProductsService = async () => {
  try {
    // Create Categories
    const categories = [
      { name: "Keyboards" },
      { name: "Keycaps" },
      { name: "Switches" },
      { name: "Accessories" },
    ];

    for (const cat of categories) {
      await prisma.category.upsert({
        where: { name: cat.name },
        update: {},
        create: cat,
      });
    }

    const cats = await prisma.category.findMany();
    const catMap = {};
    cats.forEach((c) => (catMap[c.name] = c.id));

    const products = [
      {
        name: "KeyCraft K65 Ultra",
        price: 249,
        isNew: true,
        description:
          "Bộ kit bàn phím cơ Gasket Mount cao cấp với vỏ nhôm CNC và tạ tùy chỉnh cân nặng.",
        categoryId: catMap["Keyboards"],
        stock: 15,
        sold: 5,
        images: [
          "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
          "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800",
        ],
      },
      {
        name: "Obsidian Switches",
        price: 55,
        isNew: true,
        description:
          "Switch cơ học Linear được lube sẵn từ nhà máy, mang lại cảm giác gõ mượt mà và âm thanh trầm ấm.",
        categoryId: catMap["Switches"],
        stock: 100,
        sold: 45,
        images: [
          "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800",
          "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800",
        ],
      },
      {
        name: "Zenith Gasket Mount Kit",
        price: 320,
        isHot: true,
        description:
          "Trải nghiệm gõ phím đỉnh cao với cấu trúc Gasket Mount và kết nối 3 chế độ linh hoạt.",
        categoryId: catMap["Keyboards"],
        stock: 8,
        sold: 2,
        images: [
          "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
          "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800",
        ],
      },
    ];

    for (const p of products) {
      await prisma.product.upsert({
        where: { id: products.indexOf(p) + 1 },
        update: p,
        create: p,
      });
    }

    return { EC: 0, EM: "Seed dữ liệu thành công!" };
  } catch (error) {
    console.log(error);
    return { EC: -1, EM: "Lỗi server khi seed dữ liệu" };
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  seedProductsService,
};
