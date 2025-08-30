const fs = require('fs');
const path = require('path');

// Function to recursively find all .js files in a directory
function findJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively search directories
      results = results.concat(findJsFiles(filePath));
    } else if (file.endsWith('.js') && !file.endsWith('.test.js') && !file.endsWith('.config.js')) {
      // Check if it's a React component (contains JSX)
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('import React') || content.includes('from \'react\'') || 
          content.includes('<') && content.includes('/>') || content.includes('</')) {
        results.push(filePath);
      }
    }
  });
  
  return results;
}

// Function to rename a file from .js to .jsx
function renameToJsx(filePath) {
  const dirName = path.dirname(filePath);
  const baseName = path.basename(filePath, '.js');
  const newPath = path.join(dirName, `${baseName}.jsx`);
  
  fs.renameSync(filePath, newPath);
  console.log(`Renamed: ${filePath} -> ${newPath}`);
  return { oldPath: filePath, newPath };
}

// Main function
function main() {
  const srcDir = path.join(__dirname, 'src');
  const jsFiles = findJsFiles(srcDir);
  
  console.log(`Found ${jsFiles.length} React component files to rename`);
  
  const renamedFiles = jsFiles.map(renameToJsx);
  
  console.log('\nAll files have been renamed successfully!');
  console.log(`Total files renamed: ${renamedFiles.length}`);
  
  return renamedFiles;
}

main();