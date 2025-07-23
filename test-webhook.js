#!/usr/bin/env node

// Simple webhook test script
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 n8n Webhook Test Tool');
console.log('========================\n');

rl.question('Enter your n8n webhook URL: ', async (webhookUrl) => {
  if (!webhookUrl || webhookUrl.trim() === '') {
    console.log('❌ No URL provided');
    rl.close();
    return;
  }

  const testPayload = {
    idea: "A simple test idea for the webhook",
    timestamp: new Date().toISOString()
  };

  console.log('\n🧪 Testing webhook...');
  console.log('📤 URL:', webhookUrl);
  console.log('📦 Payload:', JSON.stringify(testPayload, null, 2));

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    console.log('\n📥 Response:');
    console.log('  Status:', response.status);
    console.log('  Status Text:', response.statusText);
    console.log('  Headers:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const data = await response.json();
      console.log('  Body:', JSON.stringify(data, null, 2));
      
      // Check if required fields are present
      const requiredFields = ['summary', 'market_potential', 'key_risks', 'suggestions', 'final_verdict', 'validation_strategy'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length === 0) {
        console.log('\n✅ Webhook test PASSED! All required fields present.');
      } else {
        console.log('\n⚠️  Webhook test PARTIAL SUCCESS - Missing fields:', missingFields.join(', '));
      }
    } else {
      const errorText = await response.text();
      console.log('  Error Body:', errorText);
      console.log('\n❌ Webhook test FAILED');
    }
  } catch (error) {
    console.log('\n❌ Webhook test FAILED with error:');
    console.log('  Error:', error.message);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.log('\n💡 This might be a network connectivity issue:');
      console.log('  - Check if the URL is accessible');
      console.log('  - Verify CORS settings on your n8n instance');
      console.log('  - Ensure n8n workflow is active');
    }
  }

  rl.close();
});

// Handle missing fetch in older Node.js versions
if (typeof fetch === 'undefined') {
  console.log('❌ This script requires Node.js 18+ or you need to install node-fetch');
  console.log('Install with: npm install node-fetch');
  console.log('Then add this line at the top: const fetch = require("node-fetch");');
  process.exit(1);
}