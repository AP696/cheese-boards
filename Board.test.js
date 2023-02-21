const { Board } = require('../Board.js');
const { sequelize } = require('../db.js');

describe('Board model', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  afterEach(async () => {
    await Board.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
  });

  it('should create a board', async () => {
    const board = await Board.create({
      type: 'surf',
      description: 'A fun surfboard',
      rating: 5
    });

    expect(board.type).toBe('surf');
    expect(board.description).toBe('A fun surfboard');
    expect(board.rating).toBe(5);
  });

  it('should update a board', async () => {
    const board = await Board.create({
      type: 'snow',
      description: 'A great snowboard',
      rating: 4
    });

    await board.update({
      rating: 5
    });

    expect(board.type).toBe('snow');
    expect(board.description).toBe('A great snowboard');
    expect(board.rating).toBe(5);
  });

  it('should delete a board', async () => {
    const board = await Board.create({
      type: 'skate',
      description: 'A cool skateboard',
      rating: 3
    });

    await board.destroy();

    const foundBoard = await Board.findByPk(board.id);
    expect(foundBoard).toBeNull();
  });

  it('should retrieve all boards', async () => {
    await Board.create({
      type: 'surf',
      description: 'A fun surfboard',
      rating: 5
    });

    await Board.create({
      type: 'snow',
      description: 'A great snowboard',
      rating: 4
    });

    const boards = await Board.findAll();
    expect(boards.length).toBe(2);
  });
});