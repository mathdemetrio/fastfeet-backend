module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn('recipients', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
      })
      .then(() =>
        queryInterface.addColumn('recipients', 'updated_at', {
          type: Sequelize.DATE,
          allowNull: false,
        })
      );
  },

  down: queryInterface => {
    return queryInterface
      .removeColumn('recipients', 'created_at')
      .then(() => queryInterface.removeColumn('recipients', 'updated_at'));
  },
};
