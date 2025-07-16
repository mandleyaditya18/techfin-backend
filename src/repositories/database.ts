interface IModel {
  id: string;
}

export class InMemoryDatabase<T extends IModel> {
  private data: T[] = [];

  public create(item: T): T {
    this.data.push(item);
    return item;
  }

  public findAll(): T[] {
    return this.data;
  }

  public findById(id: string): T | undefined {
    return this.data.find(item => item.id === id);
  }

  public update(id: string, updatedItem: Partial<T>): T | null {
    const item = this.findById(id);
    if (!item) return null;

    Object.assign(item, updatedItem);
    return item;
  }

  public delete(id: string): boolean {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return false;

    this.data.splice(index, 1);
    return true;
  }
}
