const { DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */

module.exports = (sequalize) => {
  const Comment = sequalize.define(
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
  Comment.associate = (models) => {
    Comment.belongsTo(models.Article, { foreignKEy: "articleId" });
  };
};
