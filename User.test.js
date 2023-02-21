const { User } = require('./User.js');
const { sequelize } = require('../db.js');

describe('User model', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  afterEach(async () => {
    await User.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
  });

  it('should create a user', async () => {
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com'
    });

    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
  });

  it('should update a user', async () => {
    const user = await User.create({
      name: 'Jane Doe',
      email: 'jane@example.com'
    });

    await user.update({
      email: 'jane.smith@example.com'
    });

    expect(user.name).toBe('Jane Doe');
    expect(user.email).toBe('jane.smith@example.com');
  });

  it('should delete a user', async () => {
    const user = await User.create({
      name: 'Alice Smith',
      email: 'alice@example.com'
    });

    await user.destroy();

    const foundUser = await User.findByPk(user.id);
    expect(foundUser).toBeNull();
  });

  it('should retrieve all users', async () => {
    await User.create({
      name: 'Bob Smith',
      email: 'bob@example.com'
    });

    await User.create({
      name: 'Charlie Brown',
      email: 'charlie@example.com'
    });

    const users = await User.findAll();
    expect(users.length).toBe(2);
  });
});
