module.exports = {
  up: queryInterface => {
    return queryInterface
      .renameColumn('recipients', 'street', 'address_street')
      .then(() =>
        queryInterface
          .renameColumn('recipients', 'number', 'address_number')
          .then(() =>
            queryInterface.renameColumn(
              'recipients',
              'complement',
              'address_complement'
            )
          )
      );
  },

  down: queryInterface => {
    return queryInterface
      .renameColumn('recipients', 'address_street', 'street')
      .then(() =>
        queryInterface
          .renameColumn('recipients', 'address_number', 'number')
          .then(() =>
            queryInterface.renameColumn(
              'recipients',
              'address_complement',
              'complement'
            )
          )
      );
  },
};
