import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from './interfaces/user.interface';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'key',
  secretAccessKey: 'key',
});

@Injectable()
export class UserService {
  constructor(
    // @InjectModel('User') private readonly UserModule: Model<User>,
    @Inject('SALESMICRO') private readonly salesClient: ClientProxy,
    @Inject('CLAIMSMICRO') private readonly claimsClient: ClientProxy,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const created_user = await dynamoDB
        .put({
          TableName: 'users',
          Item: createUserDto,
        })
        .promise();
      console.log(created_user);
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const resp = await this.UserModule.create(createUserDto);
    //   return resp;
    // } catch (error) {
    //   console.log(error);
    // }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    try {
      let params = {
        Key: {
          identification: id,
        },
        TableName: 'users',
      };
      const resp = await dynamoDB.get(params).promise();

      // const resp = await this.UserModule.findOne({ identification: id });
      let resp_client = {
        user: null,
        sales: null,
        claims: null,
      };

      if (resp.Item) {
        try {
          let sales: Observable<any>;
          sales = this.salesClient.send({ cmd: 'get_sales' }, id);

          let claims: Observable<any>;
          claims = this.claimsClient.send({ cmd: 'get_claims' }, id);

          resp_client.sales = await firstValueFrom(sales);
          resp_client.claims = await firstValueFrom(claims);
          resp_client.user = resp.Item;

          return resp_client;
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, data: {}) {
    const filter = { identification: id };

    //upadte dynamo
    const itemKeys = Object.keys(data);
    const params = {
      TableName: 'users',
      Key: {
        identification: id,
      },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: `SET ${itemKeys
        .map((k, index) => `#field${index} = :value${index}`)
        .join(', ')}`,
      ExpressionAttributeNames: itemKeys.reduce(
        (accumulator, k, index) => ({ ...accumulator, [`#field${index}`]: k }),
        {},
      ),
      ExpressionAttributeValues: itemKeys.reduce(
        (accumulator, k, index) => ({
          ...accumulator,
          [`:value${index}`]: data[k],
        }),
        {},
      ),
    };
    return await dynamoDB.update(params).promise();
    // try {
    //   const userUpdate = await this.UserModule.findOneAndUpdate(filter, data);
    //   return userUpdate;
    // } catch (error) {
    //   console.log(error);
    // }
  }

  async updateIncrementPoints(createdSale) {
    try {
      //verificar si existe esa identificacion y sino crearla
      const resp_user = await this.findOne(createdSale.identification);
      if (!resp_user) {
        const new_user = {
          identification: parseInt(createdSale.identification),
          accumulated_points: 0 + this.calculatePoints(createdSale.value),
          createdAt: Date.now(),
        };

        await this.create(new_user);
      } else {
        await this.update(parseInt(createdSale.identification), {
          accumulated_points:
            resp_user.user.accumulated_points +
            this.calculatePoints(createdSale.value),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateDecrementPoints(createdClaim) {
    try {
      //verificar si existe esa identificacion y sino regresar
      const resp_user = await this.findOne(createdClaim.identification);
      if (resp_user) {
        await this.update(parseInt(createdClaim.identification), {
          accumulated_points:
            resp_user.user.accumulated_points - createdClaim.points,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  calculatePoints(value: number) {
    return Math.round(value / 1000);
  }
}
