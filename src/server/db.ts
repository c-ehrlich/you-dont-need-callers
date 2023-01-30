class Database {
  public async getProductById(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id,
      name: `Product #${id}`,
      price: id * 100,
    };
  }
}

export const fakePrisma = new Database();
export type FakePrismaClient = typeof fakePrisma;
