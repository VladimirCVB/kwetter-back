import {
  CanActivate,
  ExecutionContext,
  Injectable,
  
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // canActivate(
  //   context: ExecutionContext,
  // ): boolean | Promise<boolean> | Observable<boolean> {

  //   const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
  //     context.getHandler(),
  //     context.getClass()
  //   ])

  //   if(!requiredRoles){
  //     return;
  //   }

  //   const { user } = context.switchToHttp().getRequest();

  //   return requiredRoles.some((role) => user.role?.includes(role));
  // }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    try {
      const user = request.user;
      return roles.some((role) => user.role?.includes(role));
    } catch (error) {
      return false;
    }
  }
}
