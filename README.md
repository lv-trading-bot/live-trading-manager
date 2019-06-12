# live-trading-manager
Quản lý các pair cũng như tình trạng của các pair

## Sửa file `config.js` clone từ file sample-config.js
Example
```
let config = {};

config.mongodb = {
    connectionString: process.env.MONGO_URL || "mongodb://localhost:27017",
    dbName:  "db_live_trading_manager"
}

config.machine_learning_api = {
    base: process.env.ML_SERVER_BASE_API || "http://localhost:3002",
    live: "/live"
}

config.gekko_igniter_api = {
    base: `http://${process.env.DOCKER_HOST}:3006`,
    runGekko: '/run-gekko',
    stopGekko: '/stop-gekko',
    startGekko: '/start-gekko'
}

config.loggerAdapter = 'file';

module.exports = config;
```

## Thêm file /authentication/info.js
Example:
```
module.exports = {
    users: [
        {
            username: "xuantinfx",
            password: "123456"
        }
    ],
    secret_key: "secret_key",
    live_time_of_token: 1000 * 60 * 60 * 24 //1 ngày
}
```

## Các biến môi trường cần set trước khi chạy
- `MONGO_URL`: connection string của mongodb
- `ML_SERVER_BASE_API`: địa chỉ của ML_SERVER
- `DOCKER_HOST`: địa chỉ của dockerhost hoặc địa chỉ ip của host
- `AUTHENTICATION_TOKEN`: token để giao tiếp giữa các node