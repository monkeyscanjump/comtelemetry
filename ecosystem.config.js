const apps = [
  {
    name: 'backend',
    script: 'npm',
    args: 'run start:backend',
    env_development: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    }
  },
  {
    name: 'frontend',
    script: 'npm',
    args: 'run start:frontend',
    env_development: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }
];
module.exports = apps;