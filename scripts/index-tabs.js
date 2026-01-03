import fs from 'fs-extra';
import matter from 'gray-matter';
import markdownIt from 'markdown-it';
// import slugify from 'slugify';
import path from 'path';

// Initialize markdown-it for ESM
const md = markdownIt({ html: true });
const SRC_DIR = './src/lib/tabs'; 
const OUTPUT_FILE = './src/lib/data/tabs.json';


async function buildTabs() {
  // Use path.resolve to ensure Node finds the folders correctly
  const resolvedSrc = path.resolve(SRC_DIR);  
  const entries = await fs.readdir(resolvedSrc, { recursive: true, withFileTypes: true });
  const tabsData = [];

  for (const entry of entries) {
    if (entry.isDirectory() || !entry.name.endsWith('.md')) continue;

    const filePath = path.join(entry.parentPath || entry.path, entry.name);
    const fileContent = await fs.readFile(filePath, 'utf-8');    
    const { data, content } = matter(fileContent);

     if (!data.id) {
      data.id = crypto.randomUUID().slice(-12);
      const updatedFile = matter.stringify(content, data);
      await fs.writeFile(filePath, updatedFile, 'utf-8');
    }

    tabsData.push({
      ...data,
      content: md.render(content) 
    });
  }

  await fs.outputJson(OUTPUT_FILE, tabsData, { spaces: 2 });
  console.log(`Success: ${tabsData.length} tabs processed into ${OUTPUT_FILE}`);
}

buildTabs();