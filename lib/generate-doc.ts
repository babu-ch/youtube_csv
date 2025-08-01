import {generate} from "gunshi/generator";
import { promises as fs } from 'fs';
import {command} from "./command";

export async function generateDoc() {
  // Generate the usage information
  const usageText = await generate(null, command, {
    name: command.name,
    version: '1.0.0',
    description: command.description,
  })

  await fs.writeFile('./README.md', `# CLI Usage\n\n\`\`\`sh\n${usageText}\n\`\`\`\n# description\nhttps://qiita.com/babu-ch/items/5ee4e8f3342be123b1ea`, 'utf8')

  console.log('Documentation generated successfully!')
}

await generateDoc()