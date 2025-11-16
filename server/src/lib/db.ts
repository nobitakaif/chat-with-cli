
import { PrismaClient } from "../../prisma/generated/client";

const globalForPrisma = global
const client = new PrismaClient()


export default client
