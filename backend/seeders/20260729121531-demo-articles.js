"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("articles", [
      {
        title: "Как выучить Vue за неделю",
        content:
          "Vue 3 с Composition API гораздо ближе к React-хукам, чем классический Options API. Начните с реактивности через ref и reactive, а дальше двигайтесь к компонентам.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Express для новичков",
        content:
          "Express — минималистичный фреймворк без встроенной валидации и DI, в отличие от FastAPI. Всё приходится собирать руками: middleware, роутинг, обработку ошибок.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Sequelize vs SQLAlchemy: основные отличия",
        content:
          "В Sequelize связи между моделями регистрируются через отдельный метод associate, который вызывается после того как все модели уже определены — это помогает избежать циклических импортов.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "PostgreSQL: индексы и производительность",
        content:
          "Правильно расставленные индексы могут ускорить выборки в десятки раз, но каждый дополнительный индекс замедляет запись — баланс важен.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("articles", null, {});
  },
};
