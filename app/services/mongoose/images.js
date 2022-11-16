const Images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

/**
 * 1. kita gunakan cara ini
 * 2. generate url setelah submit atau save baru kita simpan image ny
 */

// 2. generate url setelah submit atau save baru kita simpan image ny
const generateUrlImage = async (req) => {
  const result = await Images.create({
    name: `uploads/${req.file.filename}`,
  });

  return result;
};

//  1. kita gunakan cara ini
const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : "uploads/avatar/default.png",
  });

  return result;
};

const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  console.log(result);

  if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id :  ${id}`);

  return result;
};

module.exports = { createImages, checkingImage };
