module.exports = [
  {
    script: 'packages/api/dist/index.js',
    name: 'api',
    exec_mode: "cluster_mode",
    output: '/app/api-output.log',
    error: '/app/api-error.log'
  },
  {
    script: 'packages/extractor/server.py',
    name: 'extractor',
    interpreter: "python",
    exec_mode: "fork",
    instances: "1",
    wait_ready: true,
    autorestart: false,
    max_restarts: 5,
    output: '/app/extractor-output.log',
    error: '/app/extractor-error.log'
  }
]
