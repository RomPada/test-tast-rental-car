export interface Car {
  id: string;
  year: number;
  brand?: string;
  make?: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: number | string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[] | string;
  mileage: number;
}

export interface CarFilters {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

export interface CarsPage {
  cars: Car[];
  page: number;
  limit: number;
  totalCars: number;
  totalPages: number;
}

export interface RentalPayload {
  carId: string;
  name: string;
  email: string;
  comment: string;
}
