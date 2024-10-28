import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../../utils/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('orders')
@ApiTags('orders') // Groups under 'orders' in Swagger UI
@ApiBearerAuth() // Indicates JWT token requirement for all endpoints
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      properties: {
        product: {
          type: 'object',
          properties: { id: { type: 'number', example: 1 } },
        },
        quantity: { type: 'number', example: 5 },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Order successfully created' })
  @ApiResponse({
    status: 400,
    description: 'Invalid order data or insufficient stock',
  })
  create(@Body() orderData) {
    return this.orderService.createOrder(orderData);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve order by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number', description: 'The ID of the order' })
  @ApiResponse({
    status: 200,
    description: 'Order details retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  findOne(@Param('id') id: number) {
    return this.orderService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'List of all orders' })
  findAll() {
    return this.orderService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the order to update',
  })
  @ApiBody({
    schema: {
      properties: {
        product: {
          type: 'object',
          properties: { id: { type: 'number', example: 2 } },
        },
        quantity: { type: 'number', example: 3 },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  update(@Param('id') id: number, @Body() updatedData) {
    return this.orderService.updateOrder(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the order to delete',
  })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  delete(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }
}
