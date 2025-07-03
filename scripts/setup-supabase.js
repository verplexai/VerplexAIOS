const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  
  if (!fs.existsSync(envPath)) {
    return {};
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
  
  return envVars;
}

// Load environment variables
const envVars = loadEnvFile();

// Merge with process.env
Object.assign(process.env, envVars);

console.log('🚀 Verplex Supabase Setup Assistant\n');
console.log('============================================================');
console.log('Checking Environment Variables');
console.log('============================================================');

const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.log('❌ Missing or incomplete environment variables:');
  missingVars.forEach(varName => {
    console.log(`  - ${varName}`);
  });
  console.log('ℹ️  ');
  console.log('To fix this:');
  console.log('1. Go to your Supabase project dashboard');
  console.log('2. Navigate to Settings > API');
  console.log('3. Copy your Project URL and anon public key');
  console.log('4. Update your .env file with the correct values');
  process.exit(1);
} else {
  console.log('✅ All required environment variables are present');
  console.log('\n============================================================');
  console.log('Supabase Configuration');
  console.log('============================================================');
  console.log(`📍 Project URL: ${process.env.VITE_SUPABASE_URL}`);
  console.log(`🔑 Anon Key: ${process.env.VITE_SUPABASE_ANON_KEY.substring(0, 20)}...`);
  console.log('\n✅ Supabase setup complete!');
  console.log('Your application is ready to connect to Supabase.');
}