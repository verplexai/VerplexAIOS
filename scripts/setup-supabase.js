#!/usr/bin/env node

/**
 * Supabase Setup Script
 * 
 * This script helps automate the Supabase setup process by:
 * 1. Checking environment variables
 * 2. Testing database connection
 * 3. Providing setup instructions
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bright: '\x1b[1m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  console.log('\n' + '='.repeat(60));
  log(message, 'cyan');
  console.log('='.repeat(60));
}

function logStep(step, message) {
  log(`${step}. ${message}`, 'yellow');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

async function checkEnvironmentVariables() {
  logHeader('Checking Environment Variables');
  
  const requiredVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
  const missing = [];
  
  for (const varName of requiredVars) {
    if (!process.env[varName] || process.env[varName].includes('your_')) {
      missing.push(varName);
    }
  }
  
  if (missing.length > 0) {
    logError('Missing or incomplete environment variables:');
    missing.forEach(varName => {
      log(`  - ${varName}`, 'red');
    });
    
    logInfo('\nTo fix this:');
    log('1. Go to your Supabase project dashboard', 'white');
    log('2. Navigate to Settings > API', 'white');
    log('3. Copy your Project URL and anon public key', 'white');
    log('4. Update your .env file with the correct values', 'white');
    
    return false;
  }
  
  logSuccess('All environment variables are set');
  return true;
}

async function testDatabaseConnection() {
  logHeader('Testing Database Connection');
  
  try {
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    );
    
    // Test connection by trying to fetch from a system table
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "table not found" which is ok
      throw error;
    }
    
    logSuccess('Database connection successful');
    return true;
  } catch (error) {
    logError(`Database connection failed: ${error.message}`);
    return false;
  }
}

async function checkDemoUsers() {
  logHeader('Checking Demo Users');
  
  try {
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    );
    
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('email, display_name, role')
      .in('email', [
        'founder@verplex.ai',
        'team@verplex.ai', 
        'contractor@verplex.ai',
        'john@techcorp.com'
      ]);
    
    if (error) {
      logWarning('Could not check demo users (this is normal if tables don\'t exist yet)');
      return false;
    }
    
    const expectedUsers = [
      'founder@verplex.ai',
      'team@verplex.ai',
      'contractor@verplex.ai',
      'john@techcorp.com'
    ];
    
    const existingUsers = profiles?.map(p => p.email) || [];
    const missingUsers = expectedUsers.filter(email => !existingUsers.includes(email));
    
    if (missingUsers.length === 0) {
      logSuccess('All demo users exist');
      profiles?.forEach(user => {
        log(`  - ${user.display_name} (${user.email}) - ${user.role}`, 'green');
      });
      return true;
    } else {
      logWarning('Some demo users are missing:');
      missingUsers.forEach(email => {
        log(`  - ${email}`, 'yellow');
      });
      return false;
    }
  } catch (error) {
    logWarning('Could not check demo users');
    return false;
  }
}

function printSetupInstructions() {
  logHeader('Setup Instructions');
  
  logStep(1, 'Create Demo Users in Supabase Dashboard');
  logInfo('Go to your Supabase Dashboard > Authentication > Users');
  logInfo('Create these users with the EXACT emails and passwords:');
  
  const demoUsers = [
    { email: 'founder@verplex.ai', password: 'password', role: 'Admin/Founder' },
    { email: 'team@verplex.ai', password: 'password', role: 'Team Member' },
    { email: 'contractor@verplex.ai', password: 'password', role: 'Contractor' },
    { email: 'john@techcorp.com', password: 'password', role: 'Client' }
  ];
  
  demoUsers.forEach(user => {
    log(`  📧 ${user.email} | 🔑 ${user.password} | 👤 ${user.role}`, 'cyan');
  });
  
  logStep(2, 'Apply Database Migrations');
  logInfo('Run this command to apply all database migrations:');
  log('  npm run db:reset', 'cyan');
  logInfo('Or if you have Supabase CLI installed:');
  log('  supabase db reset', 'cyan');
  
  logStep(3, 'Start the Development Server');
  logInfo('Once users are created and migrations applied:');
  log('  npm run dev', 'cyan');
  
  logStep(4, 'Test Login');
  logInfo('Try logging in with any of the demo credentials above');
  
  logHeader('Troubleshooting');
  logInfo('If you encounter issues:');
  log('1. Ensure your .env file has the correct Supabase URL and keys', 'white');
  log('2. Make sure all demo users are created in Supabase Auth', 'white');
  log('3. Check that migrations have been applied successfully', 'white');
  log('4. Verify RLS policies are enabled on all tables', 'white');
}

async function main() {
  log('🚀 Verplex Supabase Setup Assistant', 'bright');
  
  const envOk = await checkEnvironmentVariables();
  if (!envOk) {
    process.exit(1);
  }
  
  const connectionOk = await testDatabaseConnection();
  if (!connectionOk) {
    process.exit(1);
  }
  
  const usersExist = await checkDemoUsers();
  
  if (!usersExist) {
    printSetupInstructions();
  } else {
    logSuccess('Setup appears to be complete!');
    logInfo('You can now run: npm run dev');
  }
}

main().catch(console.error);