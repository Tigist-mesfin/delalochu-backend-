const service = require("./listing.service");

exports.create = async (req, res, next) => {
  try {
    const listing = await service.create(req);

    res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const listings = await service.getAll();

    res.json(listings);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const listing = await service.getOne(req.params.id);

    res.json(listing);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const listing = await service.update(req);

    res.json(listing);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await service.remove(req.params.id);

    res.json({
      message: "Listing deleted"
    });
  } catch (err) {
    next(err);
  }
};