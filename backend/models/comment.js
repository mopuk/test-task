const { DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */

module.exports = (sequalize) => {
  const Comment = sequalize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "comments",
    },
  );
  Comment.associate = (models) => {
    Comment.belongsTo(models.Article, { foreignKey: "articleId" });
  };

  return Comment;
};
