export interface Restaurants {
  Address: string;
  City: string;
  Class: string;
  Description: string;
  OpenTime: string;
  Phone: string;
  Picture: {
    PictureDescription1: string;
    PictureUrl1: string;
  };
  Position: {
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  };
  RestaurantID: string;
  RestaurantName: string;
  SrcUpdateTime: string;
  UpdateTime: string;
  ZipCode: string;
}
