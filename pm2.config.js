module.exports = {
  apps: [
    {
      name: 'clm',
      script: 'app.js',
      instances: 'max', // Or a specific number of instances
      exec_mode: 'cluster', // Enables clustering
      env: {
        NODE_ENV: 'production',
        PORT: 3005,
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3005,
      },
    },
  ],
}; 