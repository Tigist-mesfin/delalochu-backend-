module.exports = (sequelize, DataTypes) => {
  const StaffPermission = sequelize.define("StaffPermission", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    staff_role_id: DataTypes.INTEGER,

    module: DataTypes.STRING,

    can_create: DataTypes.BOOLEAN,
    can_read: DataTypes.BOOLEAN,
    can_update: DataTypes.BOOLEAN,
    can_delete: DataTypes.BOOLEAN,

    granted_by_staff_id: DataTypes.INTEGER,

    granted_at: DataTypes.DATE,

    note: DataTypes.TEXT,
  });

  StaffPermission.associate = (models) => {
    StaffPermission.belongsTo(models.StaffRole, {
      foreignKey: "staff_role_id",
    });

    StaffPermission.belongsTo(models.StaffProfile, {
      foreignKey: "granted_by_staff_id",
    });
  };

  return StaffPermission;
};