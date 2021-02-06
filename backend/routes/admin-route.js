const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

//Register的函数比较简单，就是将密码转为hash,然后新建Admin存起来

// let flag = 0;
router.post('/register', (req, res, next) => {
  console.log(req.body.Email);
  console.log(req.body.Password);

  bcrypt.hash(req.body.Password, 10)
    .then(hash => {
      const admin = new Admin({
        Email: req.body.Email,
        Password: hash
      });

      console.log('The password hashed done!');

      admin.save()
        .then(docs => {
          console.log(docs);
          res.status(201).json({
            message: 'Register done successfully!'
          });
        })
        .catch(err => res.status(500).json({
          message: 'Adding new admin data into the array failed!',
          error: err
        }));

    });

});


//Login的函数功能分几层：
// 1. 通过用户账号(Email),由Amin.findOne找到在Mongoose数据库中的单项
// 2. 通过bcrypt.compare来比较reg中的Password和找到的Mongoose数据库中单项所含Password是否相符
// 3. 成功了使用jwt.sign来构造token,含admin object, secret code, expire period
// 4. 以json格式返回token和expire time


router.post('/login', (req, res) => {
  Admin.findOne({
      Email: req.body.Email
    })
    .then(admin => {
      if (!admin) {
        throw new Error("Auth failed, INCORRECT EMAIL!");
      } else {
        console.log(admin);
        bcrypt.compare(req.body.Password, admin.Password)
          .then(result => {
            if (!result) {
              throw new Error("Auth failed, INCORRECT PASSWORD!");
            };
            const token = jwt.sign(
              {
                email: admin.Email,
                adminId: admin._id
              },
              "secret_this_should_be_longer",
              {
                expiresIn: "1h"
              }
            );
            res.status(200).send({
              token: token,
              expiresIn: 600
            });
          })
          .catch(err => res.status(500).send({
            error: err
          }));
      }
    });
});

module.exports = router;

