module.exports = function(sequelize, DataTypes) {
  const Roster = sequelize.define("Roster", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    qb: {
      type: DataTypes.STRING,
      allowNull: false
    },
    wr_one: {
      type: DataTypes.STRING,
      allowNull: false
    },
    wr_two: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rb_one: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rb_two: {
      type: DataTypes.STRING,
      allowNull: false
    },
    te: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flex: {
      type: DataTypes.STRING,
      allowNull: false
    },
    def: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bench_one: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bench_two: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bench_three: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bench_four: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bench_five: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bench_six: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    classMethods: {
      associate: function(models) {
        Roster.belongsTo(models.User);
      }
    }
  });

  return Roster;
};
