module.exports = [
  {
    script: 'packages/api/dist/index.js',
    name: 'api',
    exec_mode: "cluster_mode"
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
  }
]
