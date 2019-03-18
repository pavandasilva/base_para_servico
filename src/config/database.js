module.exports = {
  host: "localhost",
  username: "root",
  password: "",
  database: process.env.NODE_ENV === "prod" ? "tdd" : "tdd_dev",
  dialect: process.env.NODE_ENV === "test" ? "sqlite" : "mysql",
  storage: process.env.NODE_ENV === "test" && "./__tests__/test.sqlite",
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }

  
}