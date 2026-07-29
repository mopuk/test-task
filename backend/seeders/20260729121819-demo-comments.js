"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const articles = await queryInterface.sequelize.query(
      `SELECT id FROM articles ORDER BY id ASC LIMIT 4;`,
      { type: Sequelize.QueryTypes.SELECT },
    );

    if (articles.length < 4) {
      throw new Error(
        "Недостаточно статей в БД — сначала запусти seed демо-статей",
      );
    }

    const [article1, article2, article3, article4] = articles.map((a) => a.id);

    await queryInterface.bulkInsert("comments", [
      {
        content: "Отличная статья, спасибо!",
        articleId: article1,
        createdAt: new Date("2024-01-10T10:00:00Z"),
        updatedAt: new Date("2024-01-10T10:00:00Z"),
      },
      {
        content: "А что насчёт Pinia вместо Vuex?",
        articleId: article1,
        createdAt: new Date("2024-01-11T12:30:00Z"),
        updatedAt: new Date("2024-01-11T12:30:00Z"),
      },
      {
        content: "Наконец-то понял разницу с FastAPI",
        articleId: article2,
        createdAt: new Date("2024-02-05T09:15:00Z"),
        updatedAt: new Date("2024-02-05T09:15:00Z"),
      },
      {
        content: "Хотелось бы больше примеров с middleware",
        articleId: article2,
        createdAt: new Date("2024-02-06T14:45:00Z"),
        updatedAt: new Date("2024-02-06T14:45:00Z"),
      },
      {
        content: "А как быть с циклическими связями many-to-many?",
        articleId: article3,
        createdAt: new Date("2024-03-01T08:00:00Z"),
        updatedAt: new Date("2024-03-01T08:00:00Z"),
      },
      {
        content: "Хороший разбор associate()",
        articleId: article3,
        createdAt: new Date("2024-03-02T17:20:00Z"),
        updatedAt: new Date("2024-03-02T17:20:00Z"),
      },
      {
        content: "У меня индексы наоборот замедлили выборку, почему?",
        articleId: article4,
        createdAt: new Date("2024-04-15T11:00:00Z"),
        updatedAt: new Date("2024-04-15T11:00:00Z"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
