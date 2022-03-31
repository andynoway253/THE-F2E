export interface ActivityModel {
  ActivityID: string;
  ActivityName: string;
  Address: string;
  City: string;
  Class1: string;
  Description: string;
  EndTime: string;
  Location: string;
  Organizer: string;
  Phone: string;
  Picture: {};
  Position: {
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  };
  SrcUpdateTime: string;
  StartTime: string;
  UpdateTime: string;
  WebsiteUrl: string;
}

export interface RestaurantModel {
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

export interface ScenicSpotModel {
  Address: string;
  Class1: string;
  Description: string;
  DescriptionDetail: string;
  Level: string;
  MapUrl: string;
  Name: string;
  OpenTime: string;
  ParkingPosition: {};
  Phone: string;
  Picture: {
    PictureUrl1: string;
    PictureDescription1: string;
  };
  Position: {
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  };
  ScenicSpotID: string;
  ScenicSpotName: string;
  SrcUpdateTime: string;
  UpdateTime: string;
  ZipCode: string;
}
