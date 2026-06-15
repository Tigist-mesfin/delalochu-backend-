module.exports = (sequelize, DataTypes) => {
  const StaffRole = sequelize.define("StaffRole", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    rolename: DataTypes.STRING,
  });

  StaffRole.associate = (models) => {
    StaffRole.hasMany(models.StaffProfile, {
      foreignKey: "role_id",
    });

    StaffRole.hasMany(models.StaffPermission, {
      foreignKey: "staff_role_id",
    });
  };

  return StaffRole;
};