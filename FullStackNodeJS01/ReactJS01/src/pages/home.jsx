import { useEffect, useState } from "react";
import { Row, Col, Card, Badge, Button, Spin } from "antd";
import axios from "../util/axios.customize";
import heroImg from "../assets/hero.png";
import kitImg from "../assets/kit.png";
import keycapsImg from "../assets/keycaps.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/v1/api/products");
        if (res && res.EC === 0) {
          setProducts(res.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const displayProducts =
    products?.length > 0
      ? products
      : [
          {
            id: 1,
            name: "KeyCraft K65 Ultra",
            price: 249,
            isNew: true,
            image: kitImg,
            description: "Premium Gasket Mount Kit",
          },
          {
            id: 2,
            name: "Nebula PBT Keycaps",
            price: 85,
            isHot: true,
            image: keycapsImg,
            description: "Limited Edition Keycaps",
          },
          {
            id: 3,
            name: "Obsidian Switches",
            price: 55,
            isNew: true,
            image: kitImg,
            description: "Mechanical Switches",
          },
          {
            id: 4,
            name: "Aviator Coiled Cable",
            price: 45,
            isHot: false,
            image: keycapsImg,
            description: "Premium Coiled Cable",
          },
        ];

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen text-left">
      {/* Promotion Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-12 h-64 md:h-96 group">
        <img
          src={heroImg}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt="Promotion"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
          <Badge count="Sale 30%" className="mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Summer Keyboard Sale
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-md opacity-90"></p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full w-fit transition-all shadow-lg">
            Shop Now
          </button>
        </div>
      </div>

      {/* Latest Products */}
      <Spin spinning={loading} tip="Loading products...">
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black!">New Arrivals</h2>
            <Button type="link">View All</Button>
          </div>
          <Row gutter={[24, 24]}>
            {displayProducts
              .filter((p) => p.isNew)
              .map((product) => (
                <Col xs={24} sm={12} lg={6} key={product.id}>
                  <Card
                    hoverable
                    className="rounded-2xl overflow-hidden border-none shadow-sm hover:shadow-xl transition-shadow"
                    cover={
                      <div className="h-48 overflow-hidden">
                        <img
                          alt={product.name}
                          src={product.image}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    }
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg m-0 text-black! truncate w-3/4">
                          {product.name}
                        </h3>
                        <span className="text-purple-600 font-bold">
                          ${product.price}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {product.description}
                      </p>
                      <Button
                        type="primary"
                        block
                        className="mt-4 rounded-lg bg-purple-600 border-none hover:bg-purple-700"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>

        {/* Best Sellers */}
        <div>
          <h2 className="text-3xl font-bold text-black! mb-8">Best Sellers</h2>
          <Row gutter={[24, 24]}>
            {displayProducts
              .filter((p) => !p.isNew || p.isHot)
              .map((product) => (
                <Col xs={24} sm={12} lg={6} key={product.id}>
                  <Card
                    hoverable
                    className="rounded-2xl overflow-hidden border-none shadow-sm hover:shadow-xl transition-shadow"
                    cover={
                      <div className="h-48 overflow-hidden">
                        <img
                          alt={product.name}
                          src={product.image}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    }
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="font-bold text-lg m-0 text-black!">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 font-bold text-xl">
                          ${product.price}
                        </span>
                        {product.isHot && <Badge status="error" text="HOT" />}
                      </div>
                      <Button
                        type="default"
                        block
                        className="mt-4 rounded-lg hover:border-purple-600 hover:text-purple-600"
                      >
                        Quick View
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      </Spin>

      <div className="mt-20 py-12 border-t border-gray-200 text-center text-gray-500">
        <p>Bùi Hải Dương - 23110197</p>
      </div>
    </div>
  );
};

export default Home;
