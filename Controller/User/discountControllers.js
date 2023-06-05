const discount = require('../../Model/UserModel/discount');


exports.Adddiscount = async (req, res) => {
  try {
    const { code, activeDate, expireDate, percent } = req.body;

    if (!code || !activeDate || !expireDate || !percent) {
      return res.status(400).json({
        message: "code,activeDate,expireDate,percent are required"
      });
    }
    const data = {
      code: req.body.code,
      activeDate: req.body.activeDate,
      expireDate: req.body.expireDate,
      percent: req.body.percent,
    }
    const Data = await discount.create(data);
    res.status(200).json({
      message: Data
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}


exports.UpdateDiscount = async (req, res) => {
  try {
    await discount.findByIdAndUpdate({ _id: req.params.id }, {
      code: req.body.code,
      activeDate: req.body.activeDate,
      expireDate: req.body.expireDate,
      percent: req.body.percent
    });
    res.status(200).json({
      message: "Data is Updated "
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
}


exports.GetAllDiscount = async (req, res) => {
  try {
    const queryObj = {};
    if (req.query.code) {
      queryObj.code = req.query.code;
    }
    const data = await discount.find(queryObj);
    if (data.length === 0) {
      return res.status(204).json({
        message: "coupons not Found"
      });
    }


    res.status(200).json({
      message: data
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}


exports.GetAllById = async (req, res) => {
  try {

    const data = await discount.findById({ _id: req.params.id });
    if (!data) {
      return res.status(204).json({
        message: "coupon not Found"
      });
    }
    console.log(data);
    res.status(200).json({
      message: data
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

exports.DeleteDiscount = async (req, res) => {
  try {
    await discount.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "coupon deleted "
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}