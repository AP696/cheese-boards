const { Cheese } = require('./Cheese.js');
const { sequelize } = require('./db.js');

describe('Cheese model', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  afterEach(async () => {
    await Cheese.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
  });

  it('should create a cheese', async () => {
    const cheese = await Cheese.create({
      title: 'Cheddar',
      description: 'A classic hard cheese'
    });

    expect(cheese.title).toBe('Cheddar');
    expect(cheese.description).toBe('A classic hard cheese');
  });

  it('should update a cheese', async () => {
    const cheese = await Cheese.create({
      title: 'Brie',
      description: 'A soft and creamy cheese'
    });

    await cheese.update({
      description: 'A French soft cheese with a creamy texture'
    });

    expect(cheese.title).toBe('Brie');
    expect(cheese.description).toBe('A French soft cheese with a creamy texture');
  });

  it('should delete a cheese', async () => {
    const cheese = await Cheese.create({
      title: 'Gouda',
      description: 'A yellow Dutch cheese'
    });

    await cheese.destroy();

    const foundCheese = await Cheese.findByPk(cheese.id);
    expect(foundCheese).toBeNull();
  });

  it('should retrieve all cheeses', async () => {
    await Cheese.create({
      title: 'Mozzarella',
      description: 'A soft and stretchy cheese'
    });

    await Cheese.create({
      title: 'Parmesan',
      description: 'A hard Italian cheese'
    });

    const cheeses = await Cheese.findAll();
    expect(cheeses.length).toBe(2);
  });
});
