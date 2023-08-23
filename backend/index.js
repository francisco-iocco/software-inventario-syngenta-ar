require("dotenv").config();
const express = require("express");
const connect = require("./database");
const multer = require("multer");
const Gadget = require("./schema");
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
  } else if (!parseInt(body.barcode)) {
    return res
      .status(400)
      .send({ err: "La cantidad de dispositivos propios debe ser un número" });
  }

  if (!file?.buffer || !file?.mimetype) {
    return res
      .status(400)
      .send({
        err: "La imagen del dispositivo el obligatoria, al igual que su tipo MIME",
      });
  }

  // Creating gadget instance
  const gadget = new Gadget({
    name: body.name,
    barcode: body.barcode,
    ownedQuantity: body.ownedQuantity,
    givenQuantity: 0,
    image: {
      data: file.buffer,
      mimeType: file.mimetype,
    },
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
  try {
    const gadgets = await Gadget.find();
    const status = gadgets.length ? 200 : 204;
    return res.status(status).send(gadgets);
  } catch (err) {
    return res.status(500).send({ err: err._message });
  }
});

app.get("/gadgets/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  if (!id)
    return res
      .status(400)
      .send({ err: "Se debe proveer un id" });
  if (id.length != 24)
    return res
      .status(400)
      .send({ err: "El id no está en el formato correcto" });

  try {
    const gadget = await Gadget.findById(id);
    const status = gadget ? 200 : 204;
    return res.status(status).send(gadget);
  } catch (err) {
    return res.status(500).send({ err: err._message });
  }
});

app.listen(port, () => {
  console.log(`API is listening on port ${port}!`);
});
