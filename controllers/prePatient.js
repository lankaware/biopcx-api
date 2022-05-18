const mongoose = require("mongoose")
require("../models/PrePatient.js")
const tokenok = require("../config/tokenValidate.js")

const ModelName = mongoose.model("PrePatient");
const routeName = "/prepatient";

module.exports = app => {
  app.get(routeName, tokenok, async (req, res) => {
    await ModelName.aggregate([
      {
        $lookup: {
          from: "covenants",
          localField: "covenant_id",
          foreignField: "_id",
          as: "covenant",
        },
      },
      {
        $project: {
          _id: "$_id",
          name: "$name",
          lastname: "$lastname",
          phone: "$phone",
          covenant_name: "$covenant.name",
        },
      },
      {
        $sort: { name: 1 },
      },
    ])
      .sort("name")
      .then((record) => {
        return res.json({
          error: false,
          record,
        });
      })
      .catch((err) => {
        return res.json({
          error: true,
          message: err,
        });
      });
  });

  app.get(routeName + "name/:name", tokenok, async (req, res) => {
    let searchParm = {
      $and: [
        { name: { $gte: req.params.name } },
        { name: { $lte: req.params.name + "~" } },
      ],
    };
    await ModelName.find(searchParm)
      .select("_id name")
      .sort("name")
      .then((record) => {
        return res.json({
          error: false,
          record,
        });
      })
      .catch((err) => {
        return res.json({
          error: true,
          message: err,
        });
      });
  });

  app.get(routeName + "id/:id", tokenok, async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    // await ModelName.findById(req.params.id)
    await ModelName.aggregate([
      // {
      //   $lookup: {
      //     from: "city",
      //     localField: "city_id",
      //     foreignField: "_id",
      //     as: "city",
      //   },
      // },
      // {
      //   $lookup: {
      //     from: "covenant",
      //     localField: "covenant_id",
      //     foreignField: "_id",
      //     as: "covenant",
      //   },
      // },
      // {
      //   $lookup: {
      //     from: "city",
      //     localField: "birthCity_id",
      //     foreignField: "_id",
      //     as: "birthCity",
      //   },
      // },
      // {
      //   $lookup: {
      //     from: "state",
      //     localField: "rgState_id",
      //     foreignField: "_id",
      //     as: "rgState",
      //   },
      // },
      // {
      //   $lookup: {
      //     from: "unit",
      //     localField: "unit_id",
      //     foreignField: "_id",
      //     as: "unit",
      //   },
      // },
      // {
      //   $lookup: {
      //     from: "patient",
      //     localField: "relative_id",
      //     foreignField: "_id",
      //     as: "relative",
      //   },
      // },
      {
        $match: { _id: id },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          lastname: 1,
          phone: 1,
          email: 1,
          covenant_id: 1,
          covenant_name: '', //"$covenant.name",
          covPlan: 1,
        },
      },
    ])
      .then((record) => {
        return res.json({
          error: false,
          record,
        });
      })
      .catch((err) => {
        return res.json({
          error: true,
          message: err,
        });
      });
  });

  app.post(routeName, tokenok, async (req, res) => {
    await ModelName.create(req.body)
      .then((record) => {
        return res.json({
          error: false,
          record,
        });
      })
      .catch((err) => {
        return res.json({
          error: true,
          message: err,
        });
      });
  });

  app.put(routeName + "id/:id", tokenok, async (req, res) => {
    await ModelName.updateOne({ _id: req.params.id }, req.body)
      .then((record) => {
        return res.json({
          error: false,
          record,
        });
      })
      .catch((err) => {
        return res.json({
          error: true,
          message: err,
        });
      });
  });

  app.put(routeName, tokenok, async (req, res) => {
    await ModelName.find(req.body)
      .then((record) => {
        return res.json({
          error: false,
          record,
        });
      })
      .catch((err) => {
        return res.json({
          error: true,
          message: err,
        });
      });
  });

  app.delete(routeName + "id/:id", tokenok, async (req, res) => {
    await ModelName.deleteOne({ _id: req.params.id })
      .then((_) => {
        return res.json({
          error: false,
          message: "Registro removido.",
        });
      })
      .catch((err) => {
        return res.json({
          error: true,
          message: err,
        });
      });
  });
};
