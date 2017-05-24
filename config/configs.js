export default {
    server: {
        HOSTNAME: process.env.HOSTNAME || 'localhost',
        PORT: process.env.PORT || 8000,
    },
    api: {
        API_BASE_PATH: process.env.API_BASE_PATH || '/api'
    },
    auth: {
        jwtSecret: "#$3cR3t@p1K3y_&",
        jwtSession: {session: false}
    },
    db: {
        DB_HOST: process.env.DB_HOST || 'mongodb://127.0.0.1/',
        DB_NAME: process.env.DB_NAME || 'BD-T01'
    }
}
