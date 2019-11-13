const execa = require('execa');

module.exports = async (img) => {
  const { stdout } = await execa('python3', ['parse.py', img], {
    cwd: __dirname
  });

  try {
    return JSON.parse(stdout);
  } catch (e) {
    throw stdout
  }
}
