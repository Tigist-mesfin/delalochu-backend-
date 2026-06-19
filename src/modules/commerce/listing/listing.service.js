const repository = require("./listing.repository");

exports.create = async (req) => {

  const images = req.files.map(file => file.filename);

  const data = {
    ...req.body,

    images,

    features: JSON.parse(req.body.features || "{}"),

    assigned_brokers: JSON.parse(
      req.body.assigned_brokers || "[]"
    ),
  };

  return repository.create(data);
};

exports.getAll = () => repository.getAll();

exports.getOne = (id) => repository.getOne(id);

exports.update = async (req) => {

  const images = req.files?.length
    ? req.files.map(file => file.filename)
    : undefined;

  const data = {
    ...req.body,
  };

  if (images)
    data.images = images;

  if (req.body.features)
    data.features = JSON.parse(req.body.features);

  if (req.body.assigned_brokers)
    data.assigned_brokers = JSON.parse(
      req.body.assigned_brokers
    );

  return repository.update(req.params.id, data);
};

exports.remove = (id) => repository.remove(id);