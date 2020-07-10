module.exports = function(sequelize, DataTypes) {
  const Recipe = sequelize.define("Recipe", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false
    },

    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Recipe.associate = models => {
    Recipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Recipe;
};
