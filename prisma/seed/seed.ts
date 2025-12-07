import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

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

  // Use upsert to ensure uniqueness (create if not exists, update if exists)
  for (const user of users) {
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        password: user.password,
      },
      create: user,
    });
    console.log(`✅ User created/updated: ${createdUser.email}`);
  }

  console.log('✨ Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

