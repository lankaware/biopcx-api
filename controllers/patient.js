const mongoose = require("mongoose")
require("../models/Patient.js")
const tokenok = require("../config/tokenValidate.js")

const ModelName = mongoose.model("Patient");
const routeName = "/patient";

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
          name: 1,
          fullname: ["$name", ' ', '$lastname'],
          lastname: "$lastname",
          phone: "$phone",
          covenant_name: "$covenant.name",
          covenant_id: 1,
          covenantplan_id: 1,
          email: 1,
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
    console.log(req.params.id)
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
          photo: 1,
          name: 1,
          lastname: 1,
          internalRegister: 1,
          unit_id: 1,
          // unit_name: '', //"$unit.name",
          phone: 1,
          email: 1,
          zip: 1,
          address: 1,
          addressNumber: 1,
          addressComplement: 1,
          neighborhood: 1,
          city_id: 1,
          // city_name: '', //"$city.name",
          covenant_id: 1,
          // covenant_name: '', //"$covenant.name",
          covenantplan_id: 1,
          covPlan: 1,
          covRegistration: 1,
          covValid: 1,
          birthDate: 1,
          birthCity_id: 1,
          // birthCity_name: '', //"$birthCity.name",
          cpf: 1,
          rg: 1,
          rgDate: 1,
          rgAgency: 1,
          rgState_id: 1,
          // rgState_name: '', //"$rgState.name",
          mothersName: 1,
          fathersName: 1,
          gender: 1,
          maritalStatus: 1,
          blodyType: 1,
          cns: 1,
          indicatedBy: 1,
          responsible: 1,
          responsiblePhone: 1,
          // registerDate: "$registerDate",
          relative_id: 1,
          // relative_name: '', //"$relative.name",
          relativeType: 1,
          height: 1,
          weight: 1,
          imc: 1,
          firstAppoint: 1,
          lastAppoint: 1,
          clinicHist: 1,
          familyHist: 1,
          patientHist: 1,
          catheter: 1,
          surgery: 1,
          freeTextOneTitle: 1,
          freeTextOne: 1,
          freeTextTwoTitle: 1,
          freeTextTwo: 1,
          alert:1,
          prescription: 1,
          request: 1,
          createdAt: 1,
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
