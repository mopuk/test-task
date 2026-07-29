const { DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */

module.exports = (sequelize) => {
  const Article = sequelize.define(
    "Article",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "articles",
    },
  );

  Article.associate = (models) => {
    Article.hasMany(models.Comment, {
      foreignKey: "articleId",
      onDelete: "CASCADE",
    });
  };

  return Article;
};
