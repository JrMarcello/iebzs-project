export default {
    server: {
        HOSTNAME: process.env.HOSTNAME || 'localhost',
        PORT: process.env.PORT || 8000,
    },
    api: {
        API_BASE_PATH: '/api'
    },
    auth: {
        jwtSecret: "#$3cR3t@p1K3y_&",
        jwtSession: {session: false}
    }
}
