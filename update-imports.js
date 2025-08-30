const fs = require('fs');
const path = require('path');

// Function to recursively find all .jsx files in a directory
function findJsxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively search directories
      results = results.concat(findJsxFiles(filePath));
    } else if (file.endsWith('.jsx')) {
      results.push(filePath);
    }
  });
  
  return results;
}

// Function to update import statements in a file
function updateImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  // Find all import statements that reference local files without extensions
  const importRegex = /import\s+(?:(?:\{[^}]*\})|(?:[^{}\s]+))\s+from\s+['"](\.\/?[^'"]+)['"];?/g;
  let match;
  
  // Collect all matches first to avoid modifying the string while iterating
  const matches = [];
  while ((match = importRegex.exec(content)) !== null) {
    matches.push(match);
  }
  
  // Process matches in reverse order to avoid offsetting positions
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    const importPath = match[1];
    
    // Skip if the import already has an extension or is a node_module
    if (importPath.includes('.jsx') || importPath.includes('.js') || !importPath.startsWith('.')) {
      continue;
    }
    
    // Check if the imported file exists with .jsx extension
    const currentDir = path.dirname(filePath);
    const absoluteImportPath = path.resolve(currentDir, importPath + '.jsx');
    
    if (fs.existsSync(absoluteImportPath)) {
      // Replace the import statement with one that includes .jsx extension
      const originalImport = match[0];
      const newImport = originalImport.replace(importPath, importPath + '.jsx');
      content = content.substring(0, match.index) + newImport + content.substring(match.index + originalImport.length);
      updated = true;
    }
  }
  
  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated imports in: ${filePath}`);
  }
  
  return updated;
}

// Main function
function main() {
  const srcDir = path.join(__dirname, 'src');
  const jsxFiles = findJsxFiles(srcDir);
  
  console.log(`Found ${jsxFiles.length} .jsx files to process`);
  
  let updatedCount = 0;
  jsxFiles.forEach(file => {
    if (updateImports(file)) {
      updatedCount++;
    }
  });
  
  console.log('\nAll import statements have been updated!');
  console.log(`Files with updated imports: ${updatedCount}`);
}

main();