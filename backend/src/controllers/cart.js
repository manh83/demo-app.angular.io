import Product from '../models/product';
import Cart from "../models/cart";
import User from "../models/user";
import jwt from 'jsonwebtoken';

export const getAllCartProducts = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Bạn chưa đăng nhập" });
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

      const user = await User.findById(payload._id).populate("carts");
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      let cart = null;
      if (user.carts.length > 0) {
        cart = await Cart.findById(user.carts[0]).populate("products");
      }

      if (!cart) {
        return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
      }

      return res.status(200).json({
        message: "Danh sách sản phẩm trong giỏ hàng",
        cart: cart.products,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const cartAddProduct = async (req, res) => {
  try {
    const productId = req.body.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Bạn chưa đăng nhập" });
    }

    try {
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

        const user = await User.findById(payload._id);
        if (!user) {
          return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        let cart = null;
        if (user.carts.length > 0) {
          cart = await Cart.findById(user.carts[0]);
        }

        if (!cart) {
          cart = new Cart();
          await cart.save();
          user.carts.push(cart);
          await user.save();
        }

        cart.products.push(product);
        await cart.save();

        return res.status(200).json({
          message: "Đã thêm sản phẩm vào giỏ hàng",
          dataCart: cart,
        });
      });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const removeProductCart = async (req, res) => {
  try {
    const productId = req.params.id;

    // Xóa sản phẩm khỏi giỏ hàng
    const cart = await Cart.findOneAndUpdate(
      { products: productId },
      { $pull: { products: productId } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
    }

    // Lấy danh sách sản phẩm trong giỏ hàng sau khi xóa
    const cartProducts = await Product.find({ _id: { $in: cart.products } });

    return res.json({
      message: "Xóa sản phẩm thành công",
      cart: cartProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const removeAllCart = async (req, res) => {
  try {
    // Lấy cart của người dùng từ token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "manhcx");
    const userId = decodedToken._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    let cart = null;
    if (user.carts.length > 0) {
      cart = await Cart.findById(user.carts[0]);
    }

    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    // Xóa tất cả sản phẩm trong giỏ hàng
    cart.products = [];
    await cart.save();

    return res.json({
      message: "Đã xóa tất cả sản phẩm trong giỏ hàng",
      cart: cart.products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};









