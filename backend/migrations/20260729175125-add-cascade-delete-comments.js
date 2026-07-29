"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "comments",
      "comments_articleId_fkey",
    );

    await queryInterface.addConstraint("comments", {
      fields: ["articleId"],
      type: "foreign key",
      name: "comments_articleId_fkey",
      references: {
        table: "articles",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "comments",
      "comments_articleId_fkey",
    );

    await queryInterface.addConstraint("comments", {
      fields: ["articleId"],
      type: "foreign key",
      name: "comments_articleId_fkey",
      references: {
        table: "articles",
        field: "id",
      },
    });
  },
};
