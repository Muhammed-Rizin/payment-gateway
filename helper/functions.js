import multer from "multer";
import path from "path";
import fs from "fs";
import models from "../model/index.js";
import moment from "moment";
import ErrorHandler from "../utils/errorHandler.js";
import crypto from "crypto";

const storage = (folder) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = `public/uploads/${folder}`;
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExtension = path.extname(file.originalname);
      const originalFileName = path.basename(file.originalname, fileExtension);
      const fileName =
        originalFileName.replace(/\s/g, "-").replace(/--/, "-") +
        "-" +
        uniqueSuffix +
        fileExtension;
      cb(null, fileName);
    },
  });

export const isNull = (field) => {
  return (
    field === undefined ||
    field === "undefined" ||
    field === "" ||
    field === null ||
    field === "null"
  );
};

export const checkObjectIdValid = (id) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
};

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".svg",
    ".gif",
    ".docx",
    ".doc",
    ".pdf",
    ".xlsx",
    ".xls",
  ];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new ErrorHandler(
        `${allowedExtensions.join(",").replace(/[.,]/g, " ").replace(/\s/, "")} files are allowed`,
        400
      )
    );
  }
};

export const multerUpload = (folder = "", filter, limits = null) => {
  if (!filter) filter = fileFilter;

  return multer({ storage: storage(folder), fileFilter: filter, limits });
};

export const userActivity = async (req, action, description) => {
  const data = await models
    .userActivity({
      activity_ip: req.ip,
      activity_action: action,
      activity_user: `${req.user.firstName || ""} ${req.user.lastName || ""}`,
      activity_user_id: req.user._id,
      activity_desc: description,
    })
    .save();

  return data;
};

export const imageFileName = async (req, res) => {
  try {
    const data = req.file;
    if (req.file) {
      data.new_filename = data.destination.replace("public/", "") + "/" + data.filename;
      res.status(200).json({ status: 200, data });
    } else {
      res.status(400).json("something went wrong");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const imageFileFilter = (req, file, cb) => {
  const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp", ".svg"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new ErrorHandler("Only PNG, JPG, JPEG, WEBP, and SVG files are allowed", 400));
  }
};

export const getDate = () => {
  return moment().format("YYYY-MM-DD");
};

export const getTime = () => {
  return moment().format("HH:mm:ss");
};

export const paginationValues = ({ page, limit }) => {
  if (isNull(page) || page < 1) page = 1;
  else page = Number(page);

  if (isNull(limit) || limit < 1) limit = 20;
  else limit = Number(limit);

  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const generatedSignature = ({ razorpayOrderId, razorpayPaymentId }) => {
  const keySecret = process.env.RAZORPAY_SECRET;

  if (!keySecret) throw new Error("Razorpay key secret is not defined in environment variables.");
  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};
