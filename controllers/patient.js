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
    const _id = mongoose.Types.ObjectId(req.params.id);
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
        $match: { _id: _id },
      },
      {
        $project: {
          _id: "$_id",
          photo: "$photo",
          name: "$name",
          lastname: "$lastname",
          internalRegister: 1,
          unit_id: 1,
          unit_name: '', //"$unit.name",
          phone: "$phone",
          email: "$email",
          zip: "$zip",
          address: "$address",
          addressNumber: "$addressNumber",
          addressComplement: "$addressComplement",
          neighborhood: "$neighborhood",
          city_id: "$city_id",
          city_name: '', //"$city.name",
          covenant_id: "$covenant_id",
          covenant_name: '', //"$covenant.name",
          covPlan: "$covPlan",
          covRegistration: "$covRegistration",
          covValid: "$covValid",
          birthDate: "$birthDate",
          birthCity_id: "$birthCity_id",
          birthCity_name: '', //"$birthCity.name",
          cpf: "$cpf",
          rg: "$rg",
          rgDate: "$rgDate",
          rgAgency: "$rgAgency",
          rgState_id: "$rgState_id",
          rgState_name: '', //"$rgState.name",
          mothersName: "$mothersName",
          fathersName: "$fathersName",
          gender: "$gender",
          maritalStatus: "$maritalStatus",
          blodyType: "$blodyType",
          cns: "$cns",
          indicatedBy: "$indicatedBy",
          responsible: "$responsible",
          responsiblePhone: "$responsiblePhone",
          // registerDate: "$registerDate",
          relative_id: "$relative_id",
          relative_name: '', //"$relative.name",
          relativeType: "$relativeType",
          height: "$height",
          weight: "$weight",
          imc: "$imc",
          firstAppoint: "$firstAppoint",
          lastAppoint: "$lastAppoint",
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
          prescription: "$prescription",
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
