declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }

  declare module "*.svg" {
    const value: any;
    export = value;
  }

  declare module "*.png"
  