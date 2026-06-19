const { Listing } = require("../../../database/models");

exports.create = (data) => Listing.create(data);

exports.getAll = () =>
  Listing.findAll();

exports.getOne = (id) =>
  Listing.findByPk(id);

exports.update = async (id, data) => {

  const listing = await Listing.findByPk(id);

  if (!listing)
    throw new Error("Listing not found");

  await listing.update(data);

  return listing;
};

exports.remove = async (id) => {

  const listing = await Listing.findByPk(id);

  if (!listing)
    throw new Error("Listing not found");

  await listing.destroy();
};