### Test Task для Ареал

## Запуск

1. git clone https://github.com/mopuk/simple-blog.git
2. cd test-task
3. Зависимости для frontend:
   1. cd frontend
   2. npm install
4. Зависимости для backend:
   1. cd ../backend
   2. npm install
5. Настройка окружения:
   1. Создать файл .env внутри backend/:
      FRONTEND_URL=frontend_url
      DB_HOST=host
      DB_USER=user
      DB_PASSWORD=password
      DB_PORT=5432
      DB_NAME=db_name
      PORT=5000
   2. Создать файл .env внутри frontend/:
      VITE_BACKEND_URL=http://localhost:5000
6. Заполнение БД демо-статьями:
   1. cd backend
   2. npx sequelize-cli db:migrate
   3. npx sequelize-cli db:seed:all
   4. Для отмены миграций:
      npx sequelize-cli db:migrate:undo:all
   5. Для удаления сидов:
      npx sequelize-cli db:seed:undo:all

7. Запуск:
   npm start
8. После запуска
   1. http://localhost:3000/ - frontend
   2. http://localhost:5000/ - backend
