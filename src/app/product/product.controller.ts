import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/model/product.entity';
import { JwtAuthGuard } from '../../utils/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@Controller('products')
@ApiTags('products') // Group under 'products' in Swagger UI
@ApiBearerAuth() // Requires JWT token for all endpoints
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string', example: 'Product A' },
        stock: { type: 'number', example: 100 },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  createProduct(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productService.createProduct(productData);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve product by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Get('search/:name')
  @ApiOperation({ summary: 'Search products by name' })
  @ApiParam({ name: 'name', type: 'string', description: 'Product name' })
  @ApiResponse({ status: 200, description: 'List of matching products' })
  findByName(@Param('name') name: string): Promise<Product[]> {
    return this.productService.findByName(name);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({ status: 200, description: 'List of all products' })
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string', example: 'Updated Product Name' },
        stock: { type: 'number', example: 50 },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  updateProduct(
    @Param('id') id: number,
    @Body() updatedData: Partial<Product>,
  ): Promise<Product> {
    return this.productService.updateProduct(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
