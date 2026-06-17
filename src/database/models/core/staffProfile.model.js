module.exports = (sequelize, DataTypes) => {
  const StaffProfile = sequelize.define("StaffProfile", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
  });

  StaffProfile.associate = (models) => {
    StaffProfile.belongsTo(models.User, { foreignKey: "user_id" });

    StaffProfile.belongsTo(models.StaffRole, {
      foreignKey: "role_id",
    });

    StaffProfile.hasMany(models.StaffPermission, {
      foreignKey: "granted_by_staff_id",
    });
  };

  return StaffProfile;
};

