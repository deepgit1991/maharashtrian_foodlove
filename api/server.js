  const express = require("express");
  const cors = require("cors");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const multer = require("multer");
  const db = require("./dbconnect");

  const app = express();
    app.use(express.json());
  app.use("/uploads", express.static("uploads"));
  app.use(cors());


const SECRET_KEY = "a!09#sos^";

// file upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
// REGISTER
app.post("/register", async (req, res) => {
  try {
    console.log(req.body);

    // CHECK BODY
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing",
      });
    }

    const { name, email, password } = req.body;

    // VALIDATION
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // EMAIL VALIDATION
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // PASSWORD VALIDATION
    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters",
      });
    }

    // CHECK USER EXISTS
    const checkSql =
      "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      // HASH PASSWORD
      const hashedPassword = await bcrypt.hash(
        password,
        10
      );

      // INSERT USER
      const sql =
        "INSERT INTO users(name,email,password) VALUES(?,?,?)";

      db.query(
        sql,
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }

          // JWT TOKEN
          const token = jwt.sign(
            {
              id: result.insertId,
              email,
            },
            SECRET_KEY,
            {
              expiresIn: "1d",
            }
          );

          // RESPONSE
          res.status(201).json({
            message:
              "User Registered Successfully",
            token,
            user: {
              id: result.insertId,
              name,
              email,
            },
          });
        }
      );
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

///////////////////// LOGIN /////////////////////////
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: user.id },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful",
      token,
      user : user.name

    });
  });
});

//////////////////// INSERT DISH API ////////////////////
app.post("/dishes", upload.single("image"), (req, res) => {
  const { name, category, tag , price , description } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql =
    "INSERT INTO dishes (name, category, tag, price, description, image) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [name, category, tag, price, description, image], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Dish added successfully", result });
  });
});

app.put("/dishes/:id", upload.single("image"), (req, res) => {
  console.log("vvvvvv");
  
  const { id } = req.params;

  const { name, category, tag, price, description } = req.body;

  const image = req.file ? req.file.filename : null;

  const sql = `
    UPDATE dishes
    SET name=?, category=?, tag=?, price=?, description=?,
    image = COALESCE(?, image)
    WHERE id=?
  `;

  db.query(sql, [name, category, tag, price, description, image, id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({ message: "Updated successfully" });
  });
});
app.get("/dishes", (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const offset = (page - 1) * limit;

  // GET PAGINATED DATA
  const sql =
    "SELECT * FROM dishes LIMIT ? OFFSET ?";

  db.query(
    sql,
    [limit, offset],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      // TOTAL COUNT QUERY
      db.query(
        "SELECT COUNT(*) AS total FROM dishes",
        (countErr, countResult) => {

          if (countErr) {
            return res.status(500).json(countErr);
          }

          res.json({
            dishes: result,
            total: countResult[0].total,
            currentPage: page,
            totalPages: Math.ceil(
              countResult[0].total / limit
            ),
          });

        }
      );
    }
  );

});
// DELETE DISH API
app.delete("/dishes/:id", (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM dishes WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Delete Failed",
      });
    }

    res.json({
      message: "Dish Deleted Successfully",
    });

  });

});
app.get("/menu-dishes", (req, res) => {

    const sql = "SELECT * FROM dishes";

    db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

    });

});
app.get("/dishes/new-arrival", (req, res) => {

    const sql = "SELECT * FROM dishes WHERE tag = 'New Arrival'";

    db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

    });

});
app.post("/categories", (req, res) => {

  const { category_name, status } = req.body;

  const sql =
    "INSERT INTO categories (category_name, status) VALUES (?, ?)";

  db.query(sql, [category_name, status], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Category Added Successfully",
    });
  });
});
app.get("/categories", (req, res) => {

  const sql = "SELECT * FROM categories ORDER BY id asc";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});
app.delete("/categories/:id", (req, res) => {

  const sql = "DELETE FROM categories WHERE id=?";

  db.query(sql, [req.params.id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Category Deleted",
    });
  });
});
app.put("/categories/:id", (req, res) => {

  const { category_name, status } = req.body;

  const sql =
    "UPDATE categories SET category_name=?, status=? WHERE id=?";

  db.query(
    sql,
    [category_name, status, req.params.id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Category Updated",
      });
    }
  );
});
app.get("/statsj", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS totalDishes FROM dishes",
    (err, dishResult) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      db.query(
        "SELECT COUNT(*) AS totalOrders FROM orders WHERE status = 'pending'",
        (err, orderResult) => {
          if (err) {
            return res.status(500).json({
              success: false,
              error: err.message,
            });
          }

          // 👇 Total customers (unique mobile numbers)
          db.query(
            "SELECT COUNT(DISTINCT mobile_number) AS totalCustomers FROM orders",
            (err, customerResult) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  error: err.message,
                });
              }

              res.status(200).json({
                success: true,
                data: {
                  dishes: dishResult[0].totalDishes,
                  orders: orderResult[0].totalOrders,
                  customers: customerResult[0].totalCustomers,
                },
              });
            }
          );
        }
      );
    }
  );
});
app.get("/stats", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS totalDishes FROM dishes",
    (err, dishRows) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      db.query(
        "SELECT COUNT(*) AS totalOrders FROM orders",
        (err, orderRows) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message,
            });
          }

          db.query(
            "SELECT COUNT(*) AS totalPendingOrders FROM orders WHERE status = 'pending'",
            (err, pendingRows) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  message: err.message,
                });
              }

              res.status(200).json({
                success: true,
                data: {
                  dishes: dishRows[0].totalDishes,
                  orders: orderRows[0].totalOrders,
                  pendingOrders: pendingRows[0].totalPendingOrders,
                },
              });
            }
          );
        }
      );
    }
  );
});

// Order created //
// Generate Random Token
const generateToken = () => {
  return "TK" + Math.floor(100000 + Math.random() * 900000);
};
app.post("/orders", (req, res) => {
  const { mobileNumber } = req.body;
  console.log("mobileNumber", mobileNumber);
  
  // Validation
  const mobileRegex = /^[6-9]\d{9}$/;

  if (!mobileRegex.test(mobileNumber)) {
    return res.status(400).json({
      success: false,
      message: "Invalid mobile number",
    });
  }

  const tokenNumber = generateToken();

  const sql =
    "INSERT INTO orders (mobile_number, customer_id) VALUES (?, ?)";

  db.query(sql, [mobileNumber, tokenNumber], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    res.json({
      success: true,
      orderId: result.insertId,
      customerId : tokenNumber,
      mobileNumber : mobileNumber,
      tokenNumber,
      message: "Order created successfully",
    });
  });
});
app.get("/filterdishes", (req, res) => {
  const search = req.query.q || "";   

  const sql = `SELECT * FROM dishes WHERE name LIKE ?`;

  db.query(sql, [`%${search}%`], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      dishes: result
    });
  });
});

app.post("/place-order", (req, res) => {
  const { customerId, items, totalAmount } = req.body;

  const sql = ` UPDATE orders SET dishes = ?, total_amount = ? WHERE customer_id = ? `;

  const values = [
    JSON.stringify(items),
    Number(totalAmount),
    customerId
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json(err);
    }

    console.log("RESULT:", result);

    return res.json({
      message: "Order updated successfully",
      customerId,
      totalAmount
    });
  });
});
app.get("/orders",  (req, res) => {
  try {
    const { mobile, token } = req.query;

    let sql = "SELECT * FROM orders";
    const params = [];

    if (mobile && token) {
      sql += " WHERE mobile_number LIKE ? OR customer_id LIKE ?";
      params.push(`%${mobile}%`, `%${token}%`);
    } else if (mobile) {
      sql += " WHERE mobile_number LIKE ?";
      params.push(`%${mobile}%`);
    } else if (token) {
      sql += " WHERE customer_id LIKE ?";
      params.push(`%${token}%`);
    }

    sql += " ORDER BY id DESC";

    const [rows] =  db.query(sql, params);
console.log(typeof db.query);
    res.status(200).json({
      success: true,
      data: rows,
    });

  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// fetc orderby monthly 
app.get("/monthly-orders", (req, res) => {
  const sql = `
    SELECT 
      DATE_FORMAT(created_at, '%b') AS name,
      COUNT(*) AS orders
    FROM orders
    GROUP BY MONTH(created_at), DATE_FORMAT(created_at, '%b')
    ORDER BY MONTH(created_at)
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      data: result,
    });
  });
});
// Port 
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});