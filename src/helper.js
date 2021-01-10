const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

module.exports.valueToken = (token) => {
  return token ? jwt.verify(token, process.env.TOKEN_SECRECT) : {};
};

module.exports.createToken = (
  o = {
    role: "guest",
    remember: false,
  }
) => {
  let payload = {
    username: o.username,
    role: o.role,
  };
  let token;
  if (o.remember) {
    token = jwt.sign(payload, process.env.TOKEN_SECRECT, {
      expiresIn: `${1000 * 60 * 60 * 24 * 30}`,
    });
  } else {
    token = jwt.sign(payload, process.env.TOKEN_SECRECT);
  }

  return token;
};

module.exports.hashPassword = (usr, pwd) => {
  try {
    return crypto
      .createHash("sha256")
      .update(pwd + "@@coffee##" + usr)
      .digest("hex");
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.deleteFile = (link) => {
  if (link) fs.unlinkSync(path.join(__dirname, `.././public${link}`));
  // try {
  //   fs.unlinkSync(path.join(__dirname, `.././public${link}`));
  // } catch (err) {
  //   throw new Error(err);
  // }
};

module.exports.stt200 = (data, msg = "SUCCESSFULLY") => {
  //console.log("helper", data);
  return {
    status: 200,
    msg: msg,
    data: data,
  };
};

module.exports.stt400 = (msg = "BAD REQUEST") => {
  return {
    status: 400,
    error: true,
    msg: msg,
  };
};

module.exports.stt403 = (msg = "ACCESS DENIED") => {
  return {
    status: 403,
    error: true,
    msg: msg,
  };
};

module.exports.stt401 = (msg = "NEED TO LOGIN") => {
  return {
    status: 401,
    error: true,
    msg: msg,
  };
};

module.exports.stt500 = (msg = "SERVER ERROR") => {
  return {
    status: 500,
    error: true,
    msg: msg,
  };
};

module.exports.pag = (p, n) => {
  //console.log(p, size, n);
  if (n > 7) {
    let s = [];
    s.push(`<ul class="pagination">`);
    let slot = 7;
    let mid = Math.ceil(slot / 2);
    let left = 1;
    let right = slot;

    if (p > mid) {
      right = p + mid - 1;
      if (right > n) {
        right = n;
      }

      left = right - slot + 1;
    }

    for (let i = left; i <= right; i++) {
      if (i == p) {
        s.push(`<li class="active page-item">`);
      } else {
        s.push('<li class="page-item">');
      }
      s.push(`<a class="page-link" href="/${i}">${i}</a>`);
      s.push("</li>");
    }
    s.push(`</ul>`);
    return s.join("");
  } else {
    let s = [];
    s.push(`<ul class="pagination">`);
    for (let i = 1; i <= n; i++) {
      if (i == p) {
        s.push('<li class="active page-item">');
      } else {
        s.push('<li class="page-item">');
      }
      s.push(`<a class="page-link" href="/shop/${i}">${i}</a>`);
      s.push("</li>");
    }
    s.push(`</ul>`);
    return s.join("");
  }
};
