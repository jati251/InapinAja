module.exports = {
  apps: [{
    name: "inapinAja-Server",
    script: "./app.js",
    watch: true,
    env: {
      "PORT": 80,
      "NODE_ENV": "production",
      "DATABASE_URL": "postgresql://postgres:JwJEKrzo8XJuITwu@db.jtfdbauazukhvnaojgyq.supabase.co:5432/postgres",
      "ACCESS_SECRET_TOKEN":"aiyaiya",
      "GOOGLE_CLIENT_ID":"564100104538 - rel0qra65qeom6o0k7uqlkgv7scg3q66.apps.googleusercontent.com",
      "GOOGLE_CLIENT_SECRET":"564100104538 - rel0qra65qeom6o0k7uqlkgv7scg3q66.apps.googleusercontent.com"
    }
  }]
}


