import { DataTypes, Model, Sequelize } from 'sequelize';

export interface ReportAttributes {
  id: Number;
  type: String;
  title: String;
  subtitle: String;
  imageUrl: String;
  pdfUrl: String;
}

export class Report extends Model implements ReportAttributes {
  public id!: Number;
  public type!: String;
  public title!: String;
  public subtitle!: String;
  public imageUrl!: String;
  public pdfUrl!: String;

  static initModel(sequelize: Sequelize): void {
    Report.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id'
      },
      type: { type: DataTypes.STRING },
      title: { type: DataTypes.STRING },
      subtitle: { type: DataTypes.STRING },
      imageUrl: { type: DataTypes.STRING },
      pdfUrl: { type: DataTypes.STRING },
    }, {
      sequelize,
      tableName: 'reports',
      paranoid: true,
      underscored: true,
    });
  }

  static associateModel(): void {
    // set assoc here
  }
}

