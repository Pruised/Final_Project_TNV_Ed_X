import { Sequelize } from "sequelize"; 
import db from "../../config/config.js";
 
const { DataTypes } = Sequelize;

const Rating = db.define('ratings', {
  idRating: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER
  },
  movieId: {
    type: DataTypes.INTEGER
  },
  ratingStars: {
    type: DataTypes.INTEGER
  },
  textComment: {
    type: DataTypes.STRING
  }

}, {
  freezeTableName: true,
  timestamps: true
});
 
export default Rating;