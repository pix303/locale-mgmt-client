const PROXY_CONFIG = [
    {
        context: [
            "/api/v1",
            "/login",
            "/logout",
            "/info"
        ],
        target: "http://localhost:5000",
        secure: false
    }
]

module.exports = PROXY_CONFIG;