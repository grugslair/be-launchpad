import { DataTypes, Model, Sequelize } from 'sequelize';

export interface ReportAttributes {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  pdfUrl: string;
}

export class Report extends Model implements ReportAttributes {
  public id!: number;
  public type!: string;
  public title!: string;
  public subtitle!: string;
  public imageUrl!: string;
  public pdfUrl!: string;

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

