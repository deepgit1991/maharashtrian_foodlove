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
app.get("/stats", (req, res) => {

  const sql = "SELECT COUNT(*) AS totalDishes FROM dishes";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.status(200).json({
      success: true,

      data: {
        dishes: result[0].totalDishes,
        customers: 0,
      },
    });

  });

});
app.get("/statsj", async (req, res) => {
  try {

    // Total Dishes
    const [dishRows] = await db.query(
      "SELECT COUNT(*) AS totalDishes FROM dishes"
    );

    // Total Orders
    const [orderRows] = await db.query(
      "SELECT COUNT(*) AS totalOrders FROM orders"
    );

    // Response
    res.status(200).json({
      success: true,

      data: {
        dishes: dishRows[0].totalDishes,
        orders: orderRows[0].totalOrders,
      },
    });

  } catch (error) {

    console.error("MYSQL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Database error",
      error: error.message,
    });
  }
});
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});