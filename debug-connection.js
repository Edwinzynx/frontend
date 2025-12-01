require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const net = require('net');

async function main() {
    console.log('--- Debugging Connection ---');

    // Candidate ports from netstat
    const candidatePorts = [58786, 54161, 27182, 5040, 5432, 51213];

    for (const port of candidatePorts) {
        console.log(`\nTesting TCP connection to localhost:${port}...`);
        try {
            await testPort(port);
            console.log(`>>> FOUND OPEN PORT: ${port} <<<`);

            // Try Prisma on this port
            // Assuming default credentials: postgres:password
            // We might need to try a few credential combinations if this fails
            const dbUrl = `postgresql://postgres:password@localhost:${port}/postgres`;
            process.env.DATABASE_URL = dbUrl;
            console.log(`Trying Prisma with: ${dbUrl}`);

            await testPrisma();

            // If we get here, we found a working DB!
            console.log(`\n!!! SUCCESS !!! Database found on port ${port}`);
            return;
        } catch (e) {
            console.log(`Port ${port} failed: ${e.message}`);
        }
    }
    console.log('\nNo working database found on candidate ports.');
}

function testPort(port) {
    return new Promise((resolve, reject) => {
        const socket = new net.Socket();
        socket.setTimeout(1000);

        socket.on('connect', () => {
            socket.destroy();
            resolve();
        });

        socket.on('timeout', () => {
            socket.destroy();
            reject(new Error('Timeout'));
        });

        socket.on('error', (err) => {
            reject(err);
        });

        socket.connect(port, 'localhost');
    });
}

async function testPrisma() {
    console.log('Testing Prisma Client connection...');
    const prisma = new PrismaClient({
        log: ['info', 'warn', 'error'],
    });

    try {
        await prisma.$connect();
        console.log('Prisma $connect SUCCESS!');
        const count = await prisma.user.count();
        console.log('User count:', count);
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}

main();
