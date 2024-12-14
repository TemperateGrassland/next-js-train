import bcrypt from 'bcrypt';
import { createPool, db } from '@vercel/postgres';
import { invoices, customers, revenue, users, important_dates } from '../lib/placeholder-data';
import { error } from 'console';

async function seedUsers(pool: any) {
  console.log('seedUsers function...');
  // const pool = await db.connect();
  console.log('client:', pool);
  await pool.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  console.log('created extension...');
  await pool.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;
  console.log('created user table...');

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return pool.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  console.log('updated user table...');
  return insertedUsers;
}

async function seedInvoices(pool: any) {
  console.log('created extension...');
  await pool.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  console.log('created invoices table...');

  await pool.sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => pool.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  console.log('updated user table...');

  return insertedInvoices;
}

async function seedCustomers(pool: any) {
  console.log('created extension...');
  await pool.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  console.log('created customer table...');

  await pool.sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => pool.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  console.log('updated user table...');
  return insertedCustomers;
}

async function seedRevenue(pool: any) {
  console.log('creating revenue table...');
  await pool.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => pool.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  console.log('updated revenue table...');
  return insertedRevenue;
}

async function seedImportantDates(pool: any) {
  console.log('creating important dates table...');
  // -- Create important_date table with a foreign key to customers
await pool.sql`
    CREATE TABLE IF NOT EXISTS important_date (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
      date DATE NOT NULL,
      description VARCHAR(255) NOT NULL
    );
`;

const insertedImportantDates = await Promise.all(
  important_dates.map(async (important_date) => {
    try {
      await pool.sql`
        INSERT INTO important_date (id, customer_id, date, description)
        VALUES (${important_date.id}, ${important_date.customer_id}, ${important_date.date}, ${important_date.description})
        ON CONFLICT (id) DO NOTHING;
      `;
    } catch (err) {
      console.error(err);
    }
  }),
);

console.log('updated important dates table...');
return insertedImportantDates;
}

export async function GET() {
  const pool = createPool();
  try {
    console.log('creating db connection');
    console.log('starting to seed database...');
    await pool.sql`BEGIN`;
    await pool.sql`DROP TABLE IF EXISTS important_date, invoices, customers, revenue, users;`;
    await seedUsers(pool);
    await seedCustomers(pool);
    await seedInvoices(pool);
    await seedRevenue(pool);
    await seedImportantDates(pool);
    await pool.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await pool.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
