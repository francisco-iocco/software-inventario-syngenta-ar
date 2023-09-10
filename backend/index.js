require("dotenv").config();
const express = require("express");
const connect = require("./database");
const multer = require("multer");
const Gadget = require("./schema");
const fs = require("fs");
const sharp = require("sharp");
const port = process.env.PORT;
const app = express();
connect();

// Setting up express configuration (url and json formats as well as CORS)
app.use(express.urlencoded());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

// Setting up multer configuration to read images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/gadgets", upload.single("image"), async (req, res) => {
  let { body, file } = req;

  // Verifying if every field has been sent (and if its format is correct)

  if (!file?.buffer || !file?.mimetype) {
    return res.status(400).send({
      err: "La imagen del dispositivo el obligatoria",
    });
  }

  if (!body.name) {
    return res
      .status(400)
      .send({ err: "El nombre del dispositivo es obligatorio" });
  }

  if (!body.barcode) {
    return res
      .status(400)
      .send({ err: "El código de barras del dispositivo es obligatorio" });
  } else if (!parseInt(body.barcode)) {
    return res
      .status(400)
      .send({ err: "El código de barras debe ser un conjunto de números" });
  }

  if (!body.ownedQuantity > 0) {
    return res
      .status(400)
      .send({ err: "La cantidad de dispositivos debe ser mayor que 0" });
  } else if (!parseInt(body.ownedQuantity)) {
    return res
      .status(400)
      .send({ err: "La cantidad de dispositivos propios debe ser un número" });
  }

  const existGagdet = await Gadget.findOne({
    barcode: body.barcode.slice(0, 6),
  });
  if (existGagdet)
    return res.status(400).send({ err: "El dispositivo ya existe" });

  // Storing image in file system
  await new Promise((res) => {
    sharp(file.buffer)
      .rotate()
      .resize(200, 300)
      .toFile(`./images/${file.originalname}`, function(err) {
        if(err) return res.status(500).send({ err });
        res();
      });
  });

  // Creating gadget instance
  const gadget = await new Gadget({
    name: body.name,
    barcode: body.barcode.slice(0, 6),
    ownedQuantity: parseInt(body.ownedQuantity),
    givenQuantity: 0,
    imageName: file.originalname,
  });

  // Trying to store gadget instance in the database
  try {
    await gadget.save();
  } catch (err) {
    return res.status(500).send({ err: err._message });
  }

  return res.status(201).send({});
});

app.get("/gadgets", async (req, res) => {
  const { query } = req;
  // If there is a 'barcode' parameter, it searches for only one type of gadget
  // Otherwise it does a general search
  try {
    if (query.barcode) {
      if (query.barcode.length < 6)
        return res.status(400).send({
          err: "El código de barras debe contener al menos el tipo de producto y el código del fabricante",
        });
      // Barcode is sliced as it is only necessary the first six digits (type of product and manufacturer code)
      const barcode = query.barcode.slice(0, 6);
      const gadget = await Gadget.findOne({ barcode });
      if (!gadget)
        return res.status(404).send({ err: "El dispositivo no existe" });
      const image = fs.readFileSync(`./images/${gadget.imageName}`);
      return res.status(200).send({ ...gadget._doc, image });
    } else {
      let gadgets = await Gadget.find();
      if (!gadgets.length) return res.status(204).send();
      gadgets = gadgets.map(gadget => {
        const image = fs.readFileSync(`./images/${gadget.imageName}`);
        return { ...gadget._doc, image };
      });
      return res.status(200).send(gadgets);
    }
  } catch (err) {
    return res.status(500).send({ err: err._message });
  }
});

app.get("/gadgets/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  if (!id) return res.status(400).send({ err: "Se debe proveer un id" });
  if (id.length != 24)
    return res
      .status(400)
      .send({ err: "El id no está en el formato correcto" });

  try {
    const gadget = await Gadget.findById(id);
    if (!gadget)
      return res.status(404).send({ err: "El dispositivo no existe" });
    const image = fs.readFileSync(`./images/${gadget.imageName}`);
    return res.status(200).send({ gadget, image });
  } catch (err) {
    return res.status(500).send({ err: err._message });
  }
});

app.put("/gadgets/:id", async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  // Here we calculate if we are either adding gadgets or delivering gadgets.

  let quantityToProcess = body.ownedQuantity || body.givenQuantity;

  if (!quantityToProcess) {
    return res.status(400).send({
      err: "No se enviaron dispositivos para agregar o para entregar",
    });
  }

  if (!quantityToProcess > 0) {
    return res
      .status(400)
      .send({ err: "Se debe enviar al menos 1 dispostivo para procesar" });
  } else if (!parseInt(quantityToProcess)) {
    return res
      .status(400)
      .send({ err: "La cantidad de dispositivos debe ser un número" });
  }

  if (!id) return res.status(400).send({ err: "Se debe proveer un id" });
  if (id.length != 24)
    return res
      .status(400)
      .send({ err: "El id no está en el formato correcto" });

  try {
    const outdatedGadget = await Gadget.findById(id);
    if (!outdatedGadget)
      return res.status(404).send({ err: "El dispositivo no existe" });

    quantityToProcess = parseInt(quantityToProcess);

    // Add gadgets to our amount (if there were)
    if (body.ownedQuantity) {
      await Gadget.findByIdAndUpdate(id, {
        ownedQuantity: outdatedGadget.ownedQuantity + quantityToProcess,
      });
    }

    // Substract gadgets to our amount and add them to our 'given' amount (if there were)
    if (body.givenQuantity) {
      if (outdatedGadget.ownedQuantity < quantityToProcess)
        return res
          .status(400)
          .send({ err: "No hay suficiente stock para entregar" });

      await Gadget.findByIdAndUpdate(id, {
        ownedQuantity: outdatedGadget.ownedQuantity - quantityToProcess,
        givenQuantity: outdatedGadget.givenQuantity + quantityToProcess,
      });
    }
    return res.status(204).send({});
  } catch (err) {
    return res.status(500).send({ err: err._message });
  }
});

app.listen(port, () => {
  console.log(`API is listening on port ${port}!`);
});
