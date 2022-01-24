const { STRING, UUID, BIGINT } = require('sequelize')

module.exports = function ({ sequelize }) {
  const Tracker = sequelize.define('trackers',
    {
      id: {
        type: BIGINT,
        primaryKey: true
      },
      uuid: { type: UUID },
      value: {
        allowNull: false,
        type: STRING(32)
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )

  return Tracker
}
