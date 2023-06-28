import jwt from 'jsonwebtoken'
import Order from '../models/order'
import Cart from "../models/cart"


export const getOrderList = async (req, res) => {
    try {
      const orders = await Order.find().populate("productId"); // Sử dụng populate để lấy thông tin của sản phẩm
        if(!orders){
            return res.status(400).json({
                message: "Bạn chưa có đơn hàng nào"
            })
        }
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  export const get = async function (req, res) {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) {
            return res.json({
                message: "Không có dữ liệu nào",
            });
        }
        return res.json(order);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

  export const createOrder = async (req, res) => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ message: "Bạn thực hiện đăng nhập " });
      }
  
      const token = req.headers.authorization.split(" ")[1];
  
      jwt.verify(token, "manhcx", async (err, payload) => {
        if (err) {
          if (err.name === "JsonWebTokenError") {
            return res.json({
              message: "Token không hợp lệ",
            });
          }
          if (err.name === "TokenExpiredError") {
            return res.json({
              message: "Token hết hạn",
            });
          }
        }
  
        const { products } = req.body;
  
        // Create an array to store the processed order items
        const orderItems = [];
  
        // Iterate over each product in the request body
        for (const product of products) {
          const { productId, quantity, totalPrice } = product;
  
          // Create a new order item
          const orderItem = new Order({
            productId: productId,
            quantity: quantity,
            totalPrice: totalPrice,
          });
  
          // Add the order item to the array
          orderItems.push(orderItem);
        }
  
        // Save the order items to the database
        const savedOrders = await Order.insertMany(orderItems);
  
        if (savedOrders) {
          // Delete the selected products from the cart
          const userId = payload.userId;
          const cart = await Cart.findOne({ userId });
          if (cart) {
            for (const product of products) {
              const productId = product.productId;
              cart.productId = cart.productId.filter(
                (p) => p.productId.toString() !== productId.toString()
              );
            }
            await cart.save();
          }
  
          return res
            .status(201)
            .json({ message: "Đơn hàng đã tạo thành công" });
        } else {
          return res.status(400).json({ message: "Không thể tạo đơn hàng" });
        }
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  export const removeOrder = async function (req, res) {
    try {
        const productOrder = await Order.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            productOrder,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const updateOrder = async function (req, res) {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.json({
        message: "Cập nhật không thành công",
      });
    }
    return res.json({
      message: "Cập nhật thành công",
      order
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
  
  