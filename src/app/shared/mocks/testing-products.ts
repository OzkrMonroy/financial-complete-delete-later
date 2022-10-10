import { faker } from '@faker-js/faker'
import { TestingProduct } from '../models/testing-product';

export const generateOneTestingProduct = (): TestingProduct => {
    return {
        id: faker.datatype.uuid(),
        title: faker.commerce.productName(),
        price: parseInt( faker.commerce.price() ),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl(),
    }
}

export const generateManeTestingProducts = (size: number = 10): TestingProduct[] => {
    const testingProduct: TestingProduct[] = [];
    for (let i = 0; i < size ; i++){
        testingProduct.push( generateOneTestingProduct() );
    }
    return [... testingProduct];
}