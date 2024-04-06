// not using any unit test framework. just run with node tests/test.js
import * as anchor from "@coral-xyz/anchor"

anchor.setProvider({ ANCHOR_PROVIDER_URL: 'localhost:8900' })

async function test() {
  const program = anchor.workspace.Presale
  const tx = await program.methods.createPresale('75BsdJtwbesUFBuUzVRSsZhKu81BAzMEbU4A7LpvrWhw', 10000, 100)
  // const tx = await program.methods.startPresale(100)
  console.log('sig: ', tx)
}

test()
