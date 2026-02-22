import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

    constructor( @InjectModel(Product.name) private productModel: Model<ProductDocument> ) {}

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec()
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).exec()

        if(!product) {
            throw new NotFoundException(`Product with id: ${id} not found`)
        }
        return product
    }

    async create( createProductDto: CreateProductDto ): Promise<Product> {
        try {
            const createdProduct = new this.productModel(createProductDto)
            return await createdProduct.save()

        } catch (error) {
            if( error.code === 11000) {
                throw new ConflictException('Product already exist')
            }
            throw error;
        }
    }

    async update( id: string, updateProductDto: UpdateProductDto): Promise<Product>{
        const existingProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true, runValidators: true}).exec()

        if (!existingProduct) {
            throw new NotFoundException(`Product with id: ${id} not found`)
        }

        return existingProduct
    }

    async remove( id: string): Promise<void> {
        const result = await this.productModel.deleteOne( { _id: id } ).exec()

        if (result.deletedCount === 0) {
            throw new NotFoundException(`Product with id: ${id} not found`)
        }
    }
}
