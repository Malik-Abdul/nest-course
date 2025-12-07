const { Client } = require('pg');
require('dotenv').config();

async function main() {
  console.log('🌱 Starting seed...');

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Create unique users
    const users = [
      {
        email: 'john.doe@example.com',
        name: 'John Doe',
        password: 'hashed_password_123', // In production, use bcrypt to hash passwords
      },
      {
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        password: 'hashed_password_456',
      },
      {
        email: 'bob.johnson@example.com',
        name: 'Bob Johnson',
        password: 'hashed_password_789',
      },
      {
        email: 'alice.williams@example.com',
        name: 'Alice Williams',
        password: 'hashed_password_abc',
      },
      {
        email: 'charlie.brown@example.com',
        name: 'Charlie Brown',
        password: 'hashed_password_def',
      },
    ];

    // Use INSERT ... ON CONFLICT to ensure uniqueness
    for (const user of users) {
      const query = `
        INSERT INTO users (email, name, password, "createdAt", "updatedAt")
        VALUES ($1, $2, $3, NOW(), NOW())
        ON CONFLICT (email) 
        DO UPDATE SET 
          name = EXCLUDED.name,
          password = EXCLUDED.password,
          "updatedAt" = NOW()
        RETURNING id, email, name;
      `;

      const result = await client.query(query, [
        user.email,
        user.name,
        user.password,
      ]);

      console.log(`✅ User created/updated: ${result.rows[0].email}`);
    }

    console.log('✨ Seed completed!');
  } catch (error) {
    console.error('❌ Error during seed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();

