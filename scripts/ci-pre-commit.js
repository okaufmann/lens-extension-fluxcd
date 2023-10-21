// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process')

exports.preCommit = (props) => {
  console.log(`Preparing for commit of version ${props.version}`)
  execSync('npm install', { stdio: 'inherit' })
}
