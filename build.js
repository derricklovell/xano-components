import { build } from 'vite';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

async function buildComponents() {
  const srcDir = 'src';
  
  if (!existsSync(srcDir)) {
    console.log('src directory not found');
    return;
  }

  const components = readdirSync(srcDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`Found ${components.length} components:`, components);

  for (const componentName of components) {
    const entryPath = join(srcDir, componentName, 'main.js');
    
    if (!existsSync(entryPath)) {
      console.log(`Skipping ${componentName}: no main.js found`);
      continue;
    }

    console.log(`Building ${componentName}...`);
    
    // Set environment variables for the vite config
    process.env.COMPONENT_NAME = componentName;
    
    try {
      await build({
        configFile: 'vite.config.js',
        build: {
          lib: {
            entry: entryPath,
            name: componentName.replace(/-/g, ''),
            formats: ['iife'],
            fileName: () => `${componentName}-component.js`
          },
          outDir: componentName,
          emptyOutDir: false,
          cssCodeSplit: false,
          rollupOptions: {
            output: {
              assetFileNames: (assetInfo) => {
                if (assetInfo.name?.endsWith('.css')) {
                  return `${componentName}-component.css`;
                }
                return assetInfo.name || 'asset';
              }
            }
          }
        }
      });
      
      console.log(`✅ Built ${componentName}`);
    } catch (error) {
      console.error(`❌ Failed to build ${componentName}:`, error.message);
    }
  }
}

buildComponents().catch(console.error);